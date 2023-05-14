// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../tokens/MintableBaseToken.sol";

contract Poopeespade is MintableBaseToken {
    constructor() MintableBaseToken("Poopeespade", "POOPE", 0) {
    }

    function id() external pure returns (string memory _name) {
        return "POOPE";
    }
}
