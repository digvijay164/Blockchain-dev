// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ifElse{
    function checkValue(int num) public pure returns(string memory){
        string memory value; 
        if(num > 0){
            value = "value is grater then 0";
        }else if(num == 0){
            value = "Value is equal to 0";
        }else {
            value = "Value is less then 0";
        }
        return value;
    } 

    // usng Bool
    function usingBoolCheckNum(int num) public  pure returns(bool){
        bool value;
            if(num > 0){
            value = true;
        }else {
            value = false;
        }
        return value;
    }
}