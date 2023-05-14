// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../core/interfaces/IPlpManager.sol";

import "./interfaces/IRewardTracker.sol";
import "./interfaces/IRewardTracker.sol";

// provide a way to transfer staked PLP tokens by unstaking from the sender
// and staking for the receiver
// tests in RewardRouterV2.js
contract StakedPlp {
    using SafeMath for uint256;

    string public constant name = "StakedPlp";
    string public constant symbol = "sPLP";
    uint8 public constant decimals = 18;

    address public plp;
    IPlpManager public plpManager;
    address public stakedPlpTracker;
    address public feePlpTracker;

    mapping (address => mapping (address => uint256)) public allowances;

    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(
        address _plp,
        IPlpManager _plpManager,
        address _stakedPlpTracker,
        address _feePlpTracker
    ) {
        plp = _plp;
        plpManager = _plpManager;
        stakedPlpTracker = _stakedPlpTracker;
        feePlpTracker = _feePlpTracker;
    }

    function allowance(address _owner, address _spender) external view returns (uint256) {
        return allowances[_owner][_spender];
    }

    function approve(address _spender, uint256 _amount) external returns (bool) {
        _approve(msg.sender, _spender, _amount);
        return true;
    }

    function transfer(address _recipient, uint256 _amount) external returns (bool) {
        _transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) external returns (bool) {
        uint256 nextAllowance = allowances[_sender][msg.sender].sub(_amount, "StakedPlp: transfer amount exceeds allowance");
        _approve(_sender, msg.sender, nextAllowance);
        _transfer(_sender, _recipient, _amount);
        return true;
    }

    function balanceOf(address _account) external view returns (uint256) {
        return IRewardTracker(feePlpTracker).depositBalances(_account, plp);
    }

    function totalSupply() external view returns (uint256) {
        return IERC20(stakedPlpTracker).totalSupply();
    }

    function _approve(address _owner, address _spender, uint256 _amount) private {
        require(_owner != address(0), "StakedPlp: approve from the zero address");
        require(_spender != address(0), "StakedPlp: approve to the zero address");

        allowances[_owner][_spender] = _amount;

        emit Approval(_owner, _spender, _amount);
    }

    function _transfer(address _sender, address _recipient, uint256 _amount) private {
        require(_sender != address(0), "StakedPlp: transfer from the zero address");
        require(_recipient != address(0), "StakedPlp: transfer to the zero address");

        require(
            plpManager.lastAddedAt(_sender).add(plpManager.cooldownDuration()) <= block.timestamp,
            "StakedPlp: cooldown duration not yet passed"
        );

        IRewardTracker(stakedPlpTracker).unstakeForAccount(_sender, feePlpTracker, _amount, _sender);
        IRewardTracker(feePlpTracker).unstakeForAccount(_sender, plp, _amount, _sender);

        IRewardTracker(feePlpTracker).stakeForAccount(_sender, _recipient, plp, _amount);
        IRewardTracker(stakedPlpTracker).stakeForAccount(_recipient, _recipient, feePlpTracker, _amount);
    }
}
