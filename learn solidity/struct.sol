// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct student{
    uint rollNo;
    string name;
}
contract structStudentList{
    student public s1;
    constructor(uint _roll, string memory _name){
        s1.rollNo = _roll;
        s1.name = _name;
    }

    function changeValue(uint _Roll, string memory _Name) public{
        student memory new_student = student({
            rollNo: _Roll,
            name: _Name
        });
        s1 = new_student;
    }
}