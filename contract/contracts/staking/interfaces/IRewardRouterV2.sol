// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IRewardRouterV2 {
    function feePlpTracker() external view returns (address);
    function stakedPlpTracker() external view returns (address);
}