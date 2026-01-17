// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract array{
    uint [] public  arr = [10,20,30,40,50];
    
    function addArr(uint index1, uint value) public{
        arr[index1] = value;
    }

    function pushArr(uint item) public {
        arr.push(item);
    }

    function popArr() public {
        arr.pop();
    }

    function arrLength() public view returns (uint){
        return arr.length;
    }
}   