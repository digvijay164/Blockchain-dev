// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract globalVariables{
    function getGlobalVar() public view returns(uint blockNumber, uint timestamp, address msgSender){
        return (
            block.number,
            block.timestamp,
            msg.sender
        );
    }
    
}