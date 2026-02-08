// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Token {
    string public name = "Hardhat token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;
    address public owner;
    mapping(address => uint) balances;
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    // Transfer Token function
    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    // Check balance
    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}
