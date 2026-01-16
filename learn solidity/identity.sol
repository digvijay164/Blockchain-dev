// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract identity{
    string name;
    uint age;
    constructor() {
        name = "Radha Krishna";
        age = 25;
    }

    function getName() view public returns(string memory){
        return name;
    }
    function getAge() view  public  returns (uint){
        return  age;
    }
    function setAge() public {
        age ++;
    }
}