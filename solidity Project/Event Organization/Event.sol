// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EventContract {
    struct Event {
        address organizer;
        string name;
        uint date;
        uint price;
        uint ticketCount;
        uint ticketRemain;
    }
    mapping(uint => Event) public events;
    mapping(address => mapping(uint => uint)) public tickets;
    uint public nextID;

    function createEvent(
        string memory _name,
        uint _date,
        uint _price,
        uint _ticketCount
    ) external {
        require(
            _date > block.timestamp,
            "You can organize Events for future dates"
        );
        require(
            _ticketCount > 0,
            "you can organise event on the if you create tickets more than 0"
        );
        events[nextID] = Event(
            msg.sender,
            _name,
            _date,
            _price,
            _ticketCount,
            _ticketCount
        );
        nextID++;
    }

    function buyTicket(uint _id, uint quantity) external payable {
        require(events[_id].date != 0, "Event does not Exist");
        require(
            events[_id].date > block.timestamp,
            "Event has allready occured"
        );
        Event storage _events = events[_id];
        require(msg.value >= (_events.price * quantity), "Ether is not enoigh");
        require(_events.ticketRemain >= quantity, "Not enough tickets");
        _events.ticketRemain -= quantity;
        tickets[msg.sender][_id] += quantity;
    }

    function transferTickets(uint _id, uint quantity, address to) external {
        require(events[_id].date != 0, "Event does not Exist");
        require(events[_id].date > block.timestamp,"Event has allready occured");
        require(tickets[msg.sender][_id] >= quantity, "You do not have enough tickets to transfer");
        tickets[msg.sender][_id] -= quantity;
        tickets[to][_id] += quantity;
    }
}
