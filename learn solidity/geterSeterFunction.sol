// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract geterSeterFunction {
    uint countNum = 1;
    uint sum;

    function getNum() public view returns (uint) {
        return countNum;
    }
    function setAddNum() public {
        countNum++;
    }
    function setSubNum() public {
        countNum--;
    }

    // passing arguments
    function AddNum(uint num1, uint num2) public {
        sum = num1 + num2;
    }
    function getSum() public view returns (uint) {
        return sum;
    }

    // Using "public" Direct by initialising variable, so that there is no need to create a Geter function to return the variable value
    string public log = "Using public from variable";
}
