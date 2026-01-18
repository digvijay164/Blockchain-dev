// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract loops {
    uint[5] public arr;
    uint public count;
    function loopArr() public {
        for (uint i = count; i < arr.length; i++) {
            arr[count] = count;
            count++;
        }
    }
}
