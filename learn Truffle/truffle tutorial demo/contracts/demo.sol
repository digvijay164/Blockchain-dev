// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract demo{
    uint number;
    function set(uint _num) public{
        number = _num + 1;
    }
    function get() public view returns(uint){
        return number;
    }
}