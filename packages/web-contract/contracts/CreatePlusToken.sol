// contracts/CreatePlusToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CreatePlusToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Create+ Token", "CPTN") {
        _mint(msg.sender, initialSupply);
    }
}