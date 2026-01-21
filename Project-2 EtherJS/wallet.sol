// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract wallet{
    string public name = "Digvijay's wallet";
    uint num;
    function setValue(uint _num) public{
        num = _num;
    }

    function getValue() public view returns(uint) {
        return num;
    }

    function sendContract() public payable {}

    function contractBalance() public view returns(uint){
        return address(this).balance;
    }

    function sendEtherUser(address _user) public payable{
        payable(_user).transfer(msg.value);
    }

    function accountBalance(address _address) public view returns(uint){
        return address(_address).balance;
    } 
}

// 0xf70f367f38c0ed1fd2c31a65ac751e04749ae8cd