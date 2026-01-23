# Event Organization Smart Contract

A decentralized event ticketing and management platform built on the Ethereum blockchain using Solidity. This smart contract enables transparent event creation, ticket sales, and peer-to-peer ticket transfers on the blockchain.

## Overview

This event organization smart contract provides a complete ticketing ecosystem where:
- Event organizers can create events with specified dates, prices, and ticket quantities
- Users can purchase tickets for future events
- Ticket holders can transfer tickets to other users
- All transactions are recorded immutably on the blockchain
- No intermediaries required - direct organizer-to-attendee transactions

## Features

✨ **Key Features:**
- **Event Creation**: Organizers can create events with custom details
- **Ticket Sales**: Buy tickets directly from organizers with ETH
- **Ticket Transfer**: Peer-to-peer ticket transfers between users
- **Future Events Only**: Prevents organizing or buying tickets for past dates
- **Inventory Management**: Automatic tracking of available and sold tickets
- **Direct Payments**: Organizers receive ETH payments directly
- **Transparency**: All event and ticket information publicly accessible
- **Decentralized**: No central authority controlling events

## Contract Structure

### State Variables
- `events`: Mapping to store all created events with their details
- `tickets`: Nested mapping to track ticket ownership (user → event ID → quantity)
- `nextID`: Counter for generating unique event IDs

### Event Structure
Each event contains:
- `organizer`: Address of the event creator
- `name`: Event name/title
- `date`: Unix timestamp of the event date
- `price`: Ticket price in wei
- `ticketCount`: Total tickets available
- `ticketRemain`: Remaining tickets available for purchase

## Functions

### Event Management

#### `createEvent(string memory _name, uint _date, uint _price, uint _ticketCount)`
- **Description**: Create a new event
- **Requirements**:
  - Event date must be in the future
  - Ticket count must be greater than 0
- **Parameters**:
  - `_name`: Name/title of the event
  - `_date`: Unix timestamp of event date
  - `_price`: Price per ticket in wei
  - `_ticketCount`: Total number of tickets to sell

```solidity
function createEvent(
    string memory _name,
    uint _date,
    uint _price,
    uint _ticketCount
) external
```

**Returns**: Event ID (automatically incremented)

### Ticket Operations

#### `buyTicket(uint _id, uint quantity)`
- **Description**: Purchase tickets for an event
- **Requirements**:
  - Event must exist (ID must be valid)
  - Event date must be in the future (not occurred yet)
  - Sufficient ETH must be sent (price × quantity)
  - Enough tickets must be available
- **Parameters**:
  - `_id`: Event ID to buy tickets for
  - `quantity`: Number of tickets to purchase
- **Payable**: Yes - accepts ETH payment

```solidity
function buyTicket(uint _id, uint quantity) external payable
```

**Behavior**: 
- Deducts tickets from available pool
- Credits purchased tickets to buyer's account
- ETH is sent to contract (organizer collects via withdraw)

#### `transferTickets(uint _id, uint quantity, address to)`
- **Description**: Transfer owned tickets to another user
- **Requirements**:
  - Event must exist
  - Event must not have occurred yet
  - Sender must own at least the quantity of tickets to transfer
- **Parameters**:
  - `_id`: Event ID of tickets to transfer
  - `quantity`: Number of tickets to transfer
  - `to`: Recipient address

```solidity
function transferTickets(
    uint _id,
    uint quantity,
    address to
) external
```

**Behavior**: 
- Removes tickets from sender's balance
- Adds tickets to recipient's balance
- No ETH exchanged (can be modified for secondary market)

## Usage Example

### 1. Deploy Contract
```javascript
const eventContract = await EventContract.deploy();
await eventContract.deployed();
```

### 2. Create an Event
```javascript
// Organizer creates a concert event
const eventDate = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days from now
const ticketPrice = ethers.utils.parseEther("0.5"); // 0.5 ETH per ticket
const ticketCount = 1000; // 1000 total tickets

const tx = await eventContract.createEvent(
    "Tech Conference 2024",
    eventDate,
    ticketPrice,
    ticketCount
);

// Get event ID from transaction
const receipt = await tx.wait();
// eventID = 0 (first event)
```

### 3. Buy Tickets
```javascript
// User buys 2 tickets for event 0
const ticketPrice = ethers.utils.parseEther("0.5");
const tx = await eventContract.buyTicket(
    0, // event ID
    2, // quantity
    { value: ticketPrice.mul(2) } // send 1 ETH (0.5 * 2)
);
```

### 4. Check Ticket Ownership
```javascript
// Check how many tickets address owns for event 0
const ticketCount = await eventContract.tickets(userAddress, 0);
console.log("Tickets owned:", ticketCount.toString());
```

### 5. Transfer Tickets
```javascript
// Transfer 1 ticket to a friend
const tx = await eventContract.transferTickets(
    0, // event ID
    1, // quantity to transfer
    "0x742d35Cc6634C0532925a3b844Bc9e7595f42e9e" // recipient
);
```

### 6. View Event Details
```javascript
// Get event information
const event = await eventContract.events(0);
console.log("Event:", {
    organizer: event.organizer,
    name: event.name,
    date: new Date(event.date * 1000),
    price: ethers.utils.formatEther(event.price),
    totalTickets: event.ticketCount.toString(),
    availableTickets: event.ticketRemain.toString()
});
```

## Requirements

- **Solidity**: ^0.8.20
- **Ethereum Network**: Any EVM-compatible network
- **Tool**: Hardhat, Truffle, or Remix IDE

## Deployment

### Using Hardhat
```bash
# Install dependencies
npm install --save-dev hardhat

# Compile contract
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia
```

### Using Remix IDE
1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create new file: `Event.sol`
3. Copy contract code
4. Select compiler version: ^0.8.20
5. Compile and deploy

### Example Deployment Script
```javascript
// scripts/deploy.js
async function main() {
    const EventContract = await ethers.getContractFactory("EventContract");
    const eventContract = await EventContract.deploy();
    await eventContract.deployed();
    console.log("EventContract deployed to:", eventContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

## Use Cases

🎭 **Real-world Applications:**
- Concerts and music festivals
- Conference and seminar tickets
- Sports event bookings
- Theater and performance tickets
- Webinar and workshop registration
- Community event management
- NFT-based event access

## Security Considerations

⚠️ **Important Notes:**
- This contract is for educational purposes
- Not audited - do not use for production with real funds
- Consider implementing:
  - Withdrawal mechanism for organizers
  - Refund functionality
  - Event cancellation handling
  - Access control (OpenZeppelin Ownable)
  - ReentrancyGuard protection

## Potential Improvements

🔄 **Future Enhancements:**
- **Withdrawal Function**: Allow organizers to withdraw ticket sales
- **Refund Mechanism**: Enable ticket refunds before event date
- **Event Cancellation**: Allow organizers to cancel events
- **Secondary Market**: Enable ticket resale at custom prices
- **Event Metadata**: Store venue, description, and images
- **Batch Operations**: Buy/transfer multiple tickets in one transaction
- **ERC-721 Integration**: Mint NFTs as proof of ticket ownership
- **Access Control**: Implement role-based permissions
- **Event Categories**: Organize events by category/type
- **Rating System**: Allow attendees to rate events

## Gas Optimization Tips

- Store frequently accessed data efficiently
- Use events for historical data instead of storage
- Batch ticket operations
- Implement pagination for large datasets
- Consider proxy patterns for upgrades

## Contract Interactions

### External Functions Flow
```
1. Organizer calls createEvent()
   ↓
2. Users call buyTicket() with ETH
   ↓
3. Tickets stored in mapping
   ↓
4. Users can transferTickets()
   ↓
5. All data publicly queryable
```

## Event State Queries

```javascript
// Get all events (requires frontend indexing)
// Option 1: Monitor events from block 0
// Option 2: Store event IDs in separate mapping
// Option 3: Use The Graph subgraph

// Check if event exists
const event = await eventContract.events(eventId);
if (event.organizer === ethers.constants.AddressZero) {
    console.log("Event does not exist");
}

// Check available tickets
const availableTickets = event.ticketRemain;

// Calculate event revenue
const soldTickets = event.ticketCount - event.ticketRemain;
const revenue = event.price * soldTickets;
```

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## Disclaimer

This contract is provided for educational and demonstration purposes only. It has not been audited for security vulnerabilities. Use at your own risk. Always conduct a professional security audit before deploying to mainnet with real funds.

---

**Author**: Blockchain Developer  
**Created**: 2024  
**Network**: Ethereum & EVM-Compatible Chains

For questions or support, please open an issue on this repository.
