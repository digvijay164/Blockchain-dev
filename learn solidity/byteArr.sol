// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract byteArr{
    bytes public b1 = "abcd";
    function pushByteArr() public {
        b1.push("f");
    }
    function byteArrLength() public view returns (bytes1 ) {
        return  b1[0];
    }
}