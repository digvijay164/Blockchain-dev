// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract balanceUpdate{
    address payable reciver = payable(0x1629573E70B1EbC3E99f084b6538CD143e7979b9);
    function payEther() public payable {
        // string memory message = "Ether Payed";
        // return message;
    }
    function checkBalance()public view  returns(uint){
        return  address(this).balance;
    } 
    function sendEther() public{
        reciver.transfer(1 ether);
    }
}