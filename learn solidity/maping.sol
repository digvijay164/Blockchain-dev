           // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract map{
    // mapping(uint => string) public roll_no;
    // function mapStudent(uint key, string memory value) public{
    //     roll_no[key] = value;
    // } 
    // using struct
    struct Student{
        uint class;
        string name;
    }
    mapping (uint => Student) public  data;
    function setStd(uint _roll, uint _class, string memory _name) public{
        data[_roll] = Student(_class, _name);
    }
}