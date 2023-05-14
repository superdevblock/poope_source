// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./interfaces/IRewardTracker.sol";
import "../tokens/interfaces/IMintable.sol";
import "../tokens/interfaces/IWETH.sol";
import "../core/interfaces/IPlpManager.sol";
import "../access/Governable.sol";

contract RewardRouter is ReentrancyGuard, Governable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address payable;

    bool public isInitialized;

    address public weth;

    address public poope;
    address public esPoope;
    address public bnPoope;

    address public plp; // POOPE Liquidity Provider token

    address public stakedPoopeTracker;
    address public bonusPoopeTracker;
    address public feePoopeTracker;

    address public stakedPlpTracker;
    address public feePlpTracker;

    address public plpManager;

    event StakePoope(address account, uint256 amount);
    event UnstakePoope(address account, uint256 amount);

    event StakePlp(address account, uint256 amount);
    event UnstakePlp(address account, uint256 amount);

    receive() external payable {
        require(msg.sender == weth, "Router: invalid sender");
    }

    struct initParams {
        address _weth;
        address _poope;
        address _esPoope;
        address _bnPoope;
        address _plp;
        address _stakedPoopeTracker;
        address _bonusPoopeTracker;
        address _feePoopeTracker;
        address _feePlpTracker;
        address _stakedPlpTracker;
        address _plpManager;
    }

    function initialize(initParams memory params) external onlyGov {
        require(!isInitialized, "RewardRouter: already initialized");
        isInitialized = true;

        weth = params._weth;

        poope = params._poope;
        esPoope = params._esPoope;
        bnPoope = params._bnPoope;

        plp = params._plp;

        stakedPoopeTracker = params._stakedPoopeTracker;
        bonusPoopeTracker = params._bonusPoopeTracker;
        feePoopeTracker = params._feePoopeTracker;

        feePlpTracker = params._feePlpTracker;
        stakedPlpTracker = params._stakedPlpTracker;

        plpManager = params._plpManager;
    }

    // to help users who accidentally send their tokens to this contract
    function withdrawToken(address _token, address _account, uint256 _amount) external onlyGov {
        IERC20(_token).safeTransfer(_account, _amount);
    }

    function batchStakePoopeForAccount(address[] memory _accounts, uint256[] memory _amounts) external nonReentrant onlyGov {
        address _poope = poope;
        for (uint256 i = 0; i < _accounts.length; i++) {
            _stakePoope(msg.sender, _accounts[i], _poope, _amounts[i]);
        }
    }

    function stakePoopeForAccount(address _account, uint256 _amount) external nonReentrant onlyGov {
        _stakePoope(msg.sender, _account, poope, _amount);
    }

    function stakePoope(uint256 _amount) external nonReentrant {
        _stakePoope(msg.sender, msg.sender, poope, _amount);
    }

    function stakeEsPoope(uint256 _amount) external nonReentrant {
        _stakePoope(msg.sender, msg.sender, esPoope, _amount);
    }

    function unstakePoope(uint256 _amount) external nonReentrant {
        _unstakePoope(msg.sender, poope, _amount);
    }

    function unstakeEsPoope(uint256 _amount) external nonReentrant {
        _unstakePoope(msg.sender, esPoope, _amount);
    }

    function mintAndStakePlp(address _token, uint256 _amount, uint256 _minUsdg, uint256 _minPlp) external nonReentrant returns (uint256) {
        require(_amount > 0, "RewardRouter: invalid _amount");

        address account = msg.sender;
        uint256 plpAmount = IPlpManager(plpManager).addLiquidityForAccount(account, account, _token, _amount, _minUsdg, _minPlp);
        IRewardTracker(feePlpTracker).stakeForAccount(account, account, plp, plpAmount);
        IRewardTracker(stakedPlpTracker).stakeForAccount(account, account, feePlpTracker, plpAmount);

        emit StakePlp(account, plpAmount);

        return plpAmount;
    }

    function mintAndStakePlpETH(uint256 _minUsdg, uint256 _minPlp) external payable nonReentrant returns (uint256) {
        require(msg.value > 0, "RewardRouter: invalid msg.value");

        IWETH(weth).deposit{value: msg.value}();
        IERC20(weth).approve(plpManager, msg.value);

        address account = msg.sender;
        uint256 plpAmount = IPlpManager(plpManager).addLiquidityForAccount(address(this), account, weth, msg.value, _minUsdg, _minPlp);

        IRewardTracker(feePlpTracker).stakeForAccount(account, account, plp, plpAmount);
        IRewardTracker(stakedPlpTracker).stakeForAccount(account, account, feePlpTracker, plpAmount);

        emit StakePlp(account, plpAmount);

        return plpAmount;
    }

    function unstakeAndRedeemPlp(address _tokenOut, uint256 _plpAmount, uint256 _minOut, address _receiver) external nonReentrant returns (uint256) {
        require(_plpAmount > 0, "RewardRouter: invalid _plpAmount");

        address account = msg.sender;
        IRewardTracker(stakedPlpTracker).unstakeForAccount(account, feePlpTracker, _plpAmount, account);
        IRewardTracker(feePlpTracker).unstakeForAccount(account, plp, _plpAmount, account);
        uint256 amountOut = IPlpManager(plpManager).removeLiquidityForAccount(account, _tokenOut, _plpAmount, _minOut, _receiver);

        emit UnstakePlp(account, _plpAmount);

        return amountOut;
    }

    function unstakeAndRedeemPlpETH(uint256 _plpAmount, uint256 _minOut, address payable _receiver) external nonReentrant returns (uint256) {
        require(_plpAmount > 0, "RewardRouter: invalid _plpAmount");

        address account = msg.sender;
        IRewardTracker(stakedPlpTracker).unstakeForAccount(account, feePlpTracker, _plpAmount, account);
        IRewardTracker(feePlpTracker).unstakeForAccount(account, plp, _plpAmount, account);
        uint256 amountOut = IPlpManager(plpManager).removeLiquidityForAccount(account, weth, _plpAmount, _minOut, address(this));

        IWETH(weth).withdraw(amountOut);

        _receiver.sendValue(amountOut);

        emit UnstakePlp(account, _plpAmount);

        return amountOut;
    }

    function claim() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(feePoopeTracker).claimForAccount(account, account);
        IRewardTracker(feePlpTracker).claimForAccount(account, account);

        IRewardTracker(stakedPoopeTracker).claimForAccount(account, account);
        IRewardTracker(stakedPlpTracker).claimForAccount(account, account);
    }

    function claimEsPoope() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(stakedPoopeTracker).claimForAccount(account, account);
        IRewardTracker(stakedPlpTracker).claimForAccount(account, account);
    }

    function claimFees() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(feePoopeTracker).claimForAccount(account, account);
        IRewardTracker(feePlpTracker).claimForAccount(account, account);
    }

    function compound() external nonReentrant {
        _compound(msg.sender);
    }

    function compoundForAccount(address _account) external nonReentrant onlyGov {
        _compound(_account);
    }

    function batchCompoundForAccounts(address[] memory _accounts) external nonReentrant onlyGov {
        for (uint256 i = 0; i < _accounts.length; i++) {
            _compound(_accounts[i]);
        }
    }

    function _compound(address _account) private {
        _compoundPoope(_account);
        _compoundPlp(_account);
    }

    function _compoundPoope(address _account) private {
        uint256 esPoopeAmount = IRewardTracker(stakedPoopeTracker).claimForAccount(_account, _account);
        if (esPoopeAmount > 0) {
            _stakePoope(_account, _account, esPoope, esPoopeAmount);
        }

        uint256 bnPoopeAmount = IRewardTracker(bonusPoopeTracker).claimForAccount(_account, _account);
        if (bnPoopeAmount > 0) {
            IRewardTracker(feePoopeTracker).stakeForAccount(_account, _account, bnPoope, bnPoopeAmount);
        }
    }

    function _compoundPlp(address _account) private {
        uint256 esPoopeAmount = IRewardTracker(stakedPlpTracker).claimForAccount(_account, _account);
        if (esPoopeAmount > 0) {
            _stakePoope(_account, _account, esPoope, esPoopeAmount);
        }
    }

    function _stakePoope(address _fundingAccount, address _account, address _token, uint256 _amount) private {
        require(_amount > 0, "RewardRouter: invalid _amount");

        IRewardTracker(stakedPoopeTracker).stakeForAccount(_fundingAccount, _account, _token, _amount);
        IRewardTracker(bonusPoopeTracker).stakeForAccount(_account, _account, stakedPoopeTracker, _amount);
        IRewardTracker(feePoopeTracker).stakeForAccount(_account, _account, bonusPoopeTracker, _amount);

        emit StakePoope(_account, _amount);
    }

    function _unstakePoope(address _account, address _token, uint256 _amount) private {
        require(_amount > 0, "RewardRouter: invalid _amount");

        uint256 balance = IRewardTracker(stakedPoopeTracker).stakedAmounts(_account);

        IRewardTracker(feePoopeTracker).unstakeForAccount(_account, bonusPoopeTracker, _amount, _account);
        IRewardTracker(bonusPoopeTracker).unstakeForAccount(_account, stakedPoopeTracker, _amount, _account);
        IRewardTracker(stakedPoopeTracker).unstakeForAccount(_account, _token, _amount, _account);

        uint256 bnPoopeAmount = IRewardTracker(bonusPoopeTracker).claimForAccount(_account, _account);
        if (bnPoopeAmount > 0) {
            IRewardTracker(feePoopeTracker).stakeForAccount(_account, _account, bnPoope, bnPoopeAmount);
        }

        uint256 stakedBnPoope = IRewardTracker(feePoopeTracker).depositBalances(_account, bnPoope);
        if (stakedBnPoope > 0) {
            uint256 reductionAmount = stakedBnPoope.mul(_amount).div(balance);
            IRewardTracker(feePoopeTracker).unstakeForAccount(_account, bnPoope, reductionAmount, _account);
            IMintable(bnPoope).burn(_account, reductionAmount);
        }

        emit UnstakePoope(_account, _amount);
    }
}
