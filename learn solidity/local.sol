// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract local {
    string name = "Name from Direct Contract";
   
    function showConstructorString() pure public returns (string memory) {
        string memory nameFormFunction = "Name from Function";
        return nameFormFunction ;
    }
    function store() public pure returns (uint) {
        uint age = 1000000;
        return age;
    }
}
