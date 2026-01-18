// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract enumLearn{
    enum user{
        allowed,
        notAllowed,
        hold
    }
 
    user public u1 = user.allowed; 
    uint public lottrey = 1000;
    function checkUserEnum() public{
        if(u1 == user.allowed){
            lottrey = 0;
        }
    }
}