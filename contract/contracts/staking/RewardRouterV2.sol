// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./interfaces/IRewardTracker.sol";
import "./interfaces/IVester.sol";
import "../tokens/interfaces/IMintable.sol";
import "../tokens/interfaces/IWETH.sol";
import "../core/interfaces/IPlpManager.sol";
import "../access/Governable.sol";

contract RewardRouterV2 is ReentrancyGuard, Governable {
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

    address public poopeVester;
    address public plpVester;

    mapping (address => address) public pendingReceivers;

    event StakePoope(address account, address token, uint256 amount);
    event UnstakePoope(address account, address token, uint256 amount);

    event StakePlp(address account, uint256 amount);
    event UnstakePlp(address account, uint256 amount);

    receive() external payable {
        require(msg.sender == weth, "Router: invalid sender");
    }

    struct initParams{
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
        address _poopeVester;
        address _plpVester;
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

        poopeVester = params._poopeVester;
        plpVester = params._plpVester;
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
        _unstakePoope(msg.sender, poope, _amount, true);
    }

    function unstakeEsPoope(uint256 _amount) external nonReentrant {
        _unstakePoope(msg.sender, esPoope, _amount, true);
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

    function handleRewards(
        bool _shouldClaimPoope,
        bool _shouldStakePoope,
        bool _shouldClaimEsPoope,
        bool _shouldStakeEsPoope,
        bool _shouldStakeMultiplierPoints,
        bool _shouldClaimWeth,
        bool _shouldConvertWethToEth
    ) external nonReentrant {
        address account = msg.sender;

        uint256 poopeAmount = 0;
        if (_shouldClaimPoope) {
            uint256 poopeAmount0 = IVester(poopeVester).claimForAccount(account, account);
            uint256 poopeAmount1 = IVester(plpVester).claimForAccount(account, account);
            poopeAmount = poopeAmount0.add(poopeAmount1);
        }

        if (_shouldStakePoope && poopeAmount > 0) {
            _stakePoope(account, account, poope, poopeAmount);
        }

        uint256 esPoopeAmount = 0;
        if (_shouldClaimEsPoope) {
            uint256 esPoopeAmount0 = IRewardTracker(stakedPoopeTracker).claimForAccount(account, account);
            uint256 esPoopeAmount1 = IRewardTracker(stakedPlpTracker).claimForAccount(account, account);
            esPoopeAmount = esPoopeAmount0.add(esPoopeAmount1);
        }

        if (_shouldStakeEsPoope && esPoopeAmount > 0) {
            _stakePoope(account, account, esPoope, esPoopeAmount);
        }

        if (_shouldStakeMultiplierPoints) {
            uint256 bnPoopeAmount = IRewardTracker(bonusPoopeTracker).claimForAccount(account, account);
            if (bnPoopeAmount > 0) {
                IRewardTracker(feePoopeTracker).stakeForAccount(account, account, bnPoope, bnPoopeAmount);
            }
        }

        if (_shouldClaimWeth) {
            if (_shouldConvertWethToEth) {
                uint256 weth0 = IRewardTracker(feePoopeTracker).claimForAccount(account, address(this));
                uint256 weth1 = IRewardTracker(feePlpTracker).claimForAccount(account, address(this));

                uint256 wethAmount = weth0.add(weth1);
                IWETH(weth).withdraw(wethAmount);

                payable(account).sendValue(wethAmount);
            } else {
                IRewardTracker(feePoopeTracker).claimForAccount(account, account);
                IRewardTracker(feePlpTracker).claimForAccount(account, account);
            }
        }
    }

    function batchCompoundForAccounts(address[] memory _accounts) external nonReentrant onlyGov {
        for (uint256 i = 0; i < _accounts.length; i++) {
            _compound(_accounts[i]);
        }
    }

    function signalTransfer(address _receiver) external nonReentrant {
        require(IERC20(poopeVester).balanceOf(msg.sender) == 0, "RewardRouter: sender has vested tokens");
        require(IERC20(plpVester).balanceOf(msg.sender) == 0, "RewardRouter: sender has vested tokens");

        _validateReceiver(_receiver);
        pendingReceivers[msg.sender] = _receiver;
    }

    function acceptTransfer(address _sender) external nonReentrant {
        require(IERC20(poopeVester).balanceOf(_sender) == 0, "RewardRouter: sender has vested tokens");
        require(IERC20(plpVester).balanceOf(_sender) == 0, "RewardRouter: sender has vested tokens");

        address receiver = msg.sender;
        require(pendingReceivers[_sender] == receiver, "RewardRouter: transfer not signalled");
        delete pendingReceivers[_sender];

        _validateReceiver(receiver);
        _compound(_sender);

        uint256 stakedPoope = IRewardTracker(stakedPoopeTracker).depositBalances(_sender, poope);
        if (stakedPoope > 0) {
            _unstakePoope(_sender, poope, stakedPoope, false);
            _stakePoope(_sender, receiver, poope, stakedPoope);
        }

        uint256 stakedEsPoope = IRewardTracker(stakedPoopeTracker).depositBalances(_sender, esPoope);
        if (stakedEsPoope > 0) {
            _unstakePoope(_sender, esPoope, stakedEsPoope, false);
            _stakePoope(_sender, receiver, esPoope, stakedEsPoope);
        }

        uint256 stakedBnPoope = IRewardTracker(feePoopeTracker).depositBalances(_sender, bnPoope);
        if (stakedBnPoope > 0) {
            IRewardTracker(feePoopeTracker).unstakeForAccount(_sender, bnPoope, stakedBnPoope, _sender);
            IRewardTracker(feePoopeTracker).stakeForAccount(_sender, receiver, bnPoope, stakedBnPoope);
        }

        uint256 esPoopeBalance = IERC20(esPoope).balanceOf(_sender);
        if (esPoopeBalance > 0) {
            IERC20(esPoope).transferFrom(_sender, receiver, esPoopeBalance);
        }

        uint256 plpAmount = IRewardTracker(feePlpTracker).depositBalances(_sender, plp);
        if (plpAmount > 0) {
            IRewardTracker(stakedPlpTracker).unstakeForAccount(_sender, feePlpTracker, plpAmount, _sender);
            IRewardTracker(feePlpTracker).unstakeForAccount(_sender, plp, plpAmount, _sender);

            IRewardTracker(feePlpTracker).stakeForAccount(_sender, receiver, plp, plpAmount);
            IRewardTracker(stakedPlpTracker).stakeForAccount(receiver, receiver, feePlpTracker, plpAmount);
        }

        IVester(poopeVester).transferStakeValues(_sender, receiver);
        IVester(plpVester).transferStakeValues(_sender, receiver);
    }

    function _validateReceiver(address _receiver) private view {
        require(IRewardTracker(stakedPoopeTracker).averageStakedAmounts(_receiver) == 0, "RewardRouter: stakedPoopeTracker.averageStakedAmounts > 0");
        require(IRewardTracker(stakedPoopeTracker).cumulativeRewards(_receiver) == 0, "RewardRouter: stakedPoopeTracker.cumulativeRewards > 0");

        require(IRewardTracker(bonusPoopeTracker).averageStakedAmounts(_receiver) == 0, "RewardRouter: bonusPoopeTracker.averageStakedAmounts > 0");
        require(IRewardTracker(bonusPoopeTracker).cumulativeRewards(_receiver) == 0, "RewardRouter: bonusPoopeTracker.cumulativeRewards > 0");

        require(IRewardTracker(feePoopeTracker).averageStakedAmounts(_receiver) == 0, "RewardRouter: feePoopeTracker.averageStakedAmounts > 0");
        require(IRewardTracker(feePoopeTracker).cumulativeRewards(_receiver) == 0, "RewardRouter: feePoopeTracker.cumulativeRewards > 0");

        require(IVester(poopeVester).transferredAverageStakedAmounts(_receiver) == 0, "RewardRouter: poopeVester.transferredAverageStakedAmounts > 0");
        require(IVester(poopeVester).transferredCumulativeRewards(_receiver) == 0, "RewardRouter: poopeVester.transferredCumulativeRewards > 0");

        require(IRewardTracker(stakedPlpTracker).averageStakedAmounts(_receiver) == 0, "RewardRouter: stakedPlpTracker.averageStakedAmounts > 0");
        require(IRewardTracker(stakedPlpTracker).cumulativeRewards(_receiver) == 0, "RewardRouter: stakedPlpTracker.cumulativeRewards > 0");

        require(IRewardTracker(feePlpTracker).averageStakedAmounts(_receiver) == 0, "RewardRouter: feePlpTracker.averageStakedAmounts > 0");
        require(IRewardTracker(feePlpTracker).cumulativeRewards(_receiver) == 0, "RewardRouter: feePlpTracker.cumulativeRewards > 0");

        require(IVester(plpVester).transferredAverageStakedAmounts(_receiver) == 0, "RewardRouter: poopeVester.transferredAverageStakedAmounts > 0");
        require(IVester(plpVester).transferredCumulativeRewards(_receiver) == 0, "RewardRouter: poopeVester.transferredCumulativeRewards > 0");

        require(IERC20(poopeVester).balanceOf(_receiver) == 0, "RewardRouter: poopeVester.balance > 0");
        require(IERC20(plpVester).balanceOf(_receiver) == 0, "RewardRouter: plpVester.balance > 0");
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

        emit StakePoope(_account, _token, _amount);
    }

    function _unstakePoope(address _account, address _token, uint256 _amount, bool _shouldReduceBnPoope) private {
        require(_amount > 0, "RewardRouter: invalid _amount");

        uint256 balance = IRewardTracker(stakedPoopeTracker).stakedAmounts(_account);

        IRewardTracker(feePoopeTracker).unstakeForAccount(_account, bonusPoopeTracker, _amount, _account);
        IRewardTracker(bonusPoopeTracker).unstakeForAccount(_account, stakedPoopeTracker, _amount, _account);
        IRewardTracker(stakedPoopeTracker).unstakeForAccount(_account, _token, _amount, _account);

        if (_shouldReduceBnPoope) {
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
        }

        emit UnstakePoope(_account, _token, _amount);
    }
}
