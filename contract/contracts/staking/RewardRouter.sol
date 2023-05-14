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
import "../core/interfaces/IBlpManager.sol";
import "../access/Governable.sol";

contract RewardRouter is ReentrancyGuard, Governable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address payable;

    bool public isInitialized;

    address public weth;

    address public blu;
    address public esBlu;
    address public bnBlu;

    address public blp; // BLU Liquidity Provider token

    address public stakedBluTracker;
    address public bonusBluTracker;
    address public feeBluTracker;

    address public stakedBlpTracker;
    address public feeBlpTracker;

    address public blpManager;

    event StakeBlu(address account, uint256 amount);
    event UnstakeBlu(address account, uint256 amount);

    event StakeBlp(address account, uint256 amount);
    event UnstakeBlp(address account, uint256 amount);

    receive() external payable {
        require(msg.sender == weth, "Router: invalid sender");
    }

    struct initParams {
        address _weth;
        address _blu;
        address _esBlu;
        address _bnBlu;
        address _blp;
        address _stakedBluTracker;
        address _bonusBluTracker;
        address _feeBluTracker;
        address _feeBlpTracker;
        address _stakedBlpTracker;
        address _blpManager;
    }

    function initialize(initParams memory params) external onlyGov {
        require(!isInitialized, "RewardRouter: already initialized");
        isInitialized = true;

        weth = params._weth;

        blu = params._blu;
        esBlu = params._esBlu;
        bnBlu = params._bnBlu;

        blp = params._blp;

        stakedBluTracker = params._stakedBluTracker;
        bonusBluTracker = params._bonusBluTracker;
        feeBluTracker = params._feeBluTracker;

        feeBlpTracker = params._feeBlpTracker;
        stakedBlpTracker = params._stakedBlpTracker;

        blpManager = params._blpManager;
    }

    // to help users who accidentally send their tokens to this contract
    function withdrawToken(address _token, address _account, uint256 _amount) external onlyGov {
        IERC20(_token).safeTransfer(_account, _amount);
    }

    function batchStakeBluForAccount(address[] memory _accounts, uint256[] memory _amounts) external nonReentrant onlyGov {
        address _blu = blu;
        for (uint256 i = 0; i < _accounts.length; i++) {
            _stakeBlu(msg.sender, _accounts[i], _blu, _amounts[i]);
        }
    }

    function stakeBluForAccount(address _account, uint256 _amount) external nonReentrant onlyGov {
        _stakeBlu(msg.sender, _account, blu, _amount);
    }

    function stakeBlu(uint256 _amount) external nonReentrant {
        _stakeBlu(msg.sender, msg.sender, blu, _amount);
    }

    function stakeEsBlu(uint256 _amount) external nonReentrant {
        _stakeBlu(msg.sender, msg.sender, esBlu, _amount);
    }

    function unstakeBlu(uint256 _amount) external nonReentrant {
        _unstakeBlu(msg.sender, blu, _amount);
    }

    function unstakeEsBlu(uint256 _amount) external nonReentrant {
        _unstakeBlu(msg.sender, esBlu, _amount);
    }

    function mintAndStakeBlp(address _token, uint256 _amount, uint256 _minUsdg, uint256 _minBlp) external nonReentrant returns (uint256) {
        require(_amount > 0, "RewardRouter: invalid _amount");

        address account = msg.sender;
        uint256 blpAmount = IBlpManager(blpManager).addLiquidityForAccount(account, account, _token, _amount, _minUsdg, _minBlp);
        IRewardTracker(feeBlpTracker).stakeForAccount(account, account, blp, blpAmount);
        IRewardTracker(stakedBlpTracker).stakeForAccount(account, account, feeBlpTracker, blpAmount);

        emit StakeBlp(account, blpAmount);

        return blpAmount;
    }

    function mintAndStakeBlpETH(uint256 _minUsdg, uint256 _minBlp) external payable nonReentrant returns (uint256) {
        require(msg.value > 0, "RewardRouter: invalid msg.value");

        IWETH(weth).deposit{value: msg.value}();
        IERC20(weth).approve(blpManager, msg.value);

        address account = msg.sender;
        uint256 blpAmount = IBlpManager(blpManager).addLiquidityForAccount(address(this), account, weth, msg.value, _minUsdg, _minBlp);

        IRewardTracker(feeBlpTracker).stakeForAccount(account, account, blp, blpAmount);
        IRewardTracker(stakedBlpTracker).stakeForAccount(account, account, feeBlpTracker, blpAmount);

        emit StakeBlp(account, blpAmount);

        return blpAmount;
    }

    function unstakeAndRedeemBlp(address _tokenOut, uint256 _blpAmount, uint256 _minOut, address _receiver) external nonReentrant returns (uint256) {
        require(_blpAmount > 0, "RewardRouter: invalid _blpAmount");

        address account = msg.sender;
        IRewardTracker(stakedBlpTracker).unstakeForAccount(account, feeBlpTracker, _blpAmount, account);
        IRewardTracker(feeBlpTracker).unstakeForAccount(account, blp, _blpAmount, account);
        uint256 amountOut = IBlpManager(blpManager).removeLiquidityForAccount(account, _tokenOut, _blpAmount, _minOut, _receiver);

        emit UnstakeBlp(account, _blpAmount);

        return amountOut;
    }

    function unstakeAndRedeemBlpETH(uint256 _blpAmount, uint256 _minOut, address payable _receiver) external nonReentrant returns (uint256) {
        require(_blpAmount > 0, "RewardRouter: invalid _blpAmount");

        address account = msg.sender;
        IRewardTracker(stakedBlpTracker).unstakeForAccount(account, feeBlpTracker, _blpAmount, account);
        IRewardTracker(feeBlpTracker).unstakeForAccount(account, blp, _blpAmount, account);
        uint256 amountOut = IBlpManager(blpManager).removeLiquidityForAccount(account, weth, _blpAmount, _minOut, address(this));

        IWETH(weth).withdraw(amountOut);

        _receiver.sendValue(amountOut);

        emit UnstakeBlp(account, _blpAmount);

        return amountOut;
    }

    function claim() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(feeBluTracker).claimForAccount(account, account);
        IRewardTracker(feeBlpTracker).claimForAccount(account, account);

        IRewardTracker(stakedBluTracker).claimForAccount(account, account);
        IRewardTracker(stakedBlpTracker).claimForAccount(account, account);
    }

    function claimEsBlu() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(stakedBluTracker).claimForAccount(account, account);
        IRewardTracker(stakedBlpTracker).claimForAccount(account, account);
    }

    function claimFees() external nonReentrant {
        address account = msg.sender;

        IRewardTracker(feeBluTracker).claimForAccount(account, account);
        IRewardTracker(feeBlpTracker).claimForAccount(account, account);
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
        _compoundBlu(_account);
        _compoundBlp(_account);
    }

    function _compoundBlu(address _account) private {
        uint256 esBluAmount = IRewardTracker(stakedBluTracker).claimForAccount(_account, _account);
        if (esBluAmount > 0) {
            _stakeBlu(_account, _account, esBlu, esBluAmount);
        }

        uint256 bnBluAmount = IRewardTracker(bonusBluTracker).claimForAccount(_account, _account);
        if (bnBluAmount > 0) {
            IRewardTracker(feeBluTracker).stakeForAccount(_account, _account, bnBlu, bnBluAmount);
        }
    }

    function _compoundBlp(address _account) private {
        uint256 esBluAmount = IRewardTracker(stakedBlpTracker).claimForAccount(_account, _account);
        if (esBluAmount > 0) {
            _stakeBlu(_account, _account, esBlu, esBluAmount);
        }
    }

    function _stakeBlu(address _fundingAccount, address _account, address _token, uint256 _amount) private {
        require(_amount > 0, "RewardRouter: invalid _amount");

        IRewardTracker(stakedBluTracker).stakeForAccount(_fundingAccount, _account, _token, _amount);
        IRewardTracker(bonusBluTracker).stakeForAccount(_account, _account, stakedBluTracker, _amount);
        IRewardTracker(feeBluTracker).stakeForAccount(_account, _account, bonusBluTracker, _amount);

        emit StakeBlu(_account, _amount);
    }

    function _unstakeBlu(address _account, address _token, uint256 _amount) private {
        require(_amount > 0, "RewardRouter: invalid _amount");

        uint256 balance = IRewardTracker(stakedBluTracker).stakedAmounts(_account);

        IRewardTracker(feeBluTracker).unstakeForAccount(_account, bonusBluTracker, _amount, _account);
        IRewardTracker(bonusBluTracker).unstakeForAccount(_account, stakedBluTracker, _amount, _account);
        IRewardTracker(stakedBluTracker).unstakeForAccount(_account, _token, _amount, _account);

        uint256 bnBluAmount = IRewardTracker(bonusBluTracker).claimForAccount(_account, _account);
        if (bnBluAmount > 0) {
            IRewardTracker(feeBluTracker).stakeForAccount(_account, _account, bnBlu, bnBluAmount);
        }

        uint256 stakedBnBlu = IRewardTracker(feeBluTracker).depositBalances(_account, bnBlu);
        if (stakedBnBlu > 0) {
            uint256 reductionAmount = stakedBnBlu.mul(_amount).div(balance);
            IRewardTracker(feeBluTracker).unstakeForAccount(_account, bnBlu, reductionAmount, _account);
            IMintable(bnBlu).burn(_account, reductionAmount);
        }

        emit UnstakeBlu(_account, _amount);
    }
}
