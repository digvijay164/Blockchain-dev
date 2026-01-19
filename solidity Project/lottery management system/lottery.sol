// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
test accounts
Manager

contract address: 
0x8C7433ef32c068cF6908e058d743B06C4bA6f11C

0xe9fFEEd02397A2D693675402ba6c856e2D6E2280

P1
0x1629573E70B1EbC3E99f084b6538CD143e7979b9

P2
0xc0d720979112d4Ada21fa6558a4338a7b7014c15

p3
0x7D6bdE8e318CA157BdBa6E77d547fC70e2095970
*/ 

contract lottery {
    address public manager;
    address payable[] public participants;
    
    constructor() {
        manager = msg.sender;
    }

    receive() external payable {
        require(msg.value == 1 ether);
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint) {
        require(msg.sender == manager);
        return address(this).balance;
    }

    // generate random participants
    function random() public view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        // block.difficulty,
                        block.prevrandao,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function selectWinner() public  {
        require(msg.sender == manager);
        require(participants.length >= 3);
        uint callRandomFunction = random();
        address payable winner;
        uint index = callRandomFunction % participants.length;
        winner = participants[index]; 
        winner.transfer(getBalance());
        participants = new  address payable [](0);
    }
}
