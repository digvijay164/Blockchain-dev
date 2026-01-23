# Crowdfunding Smart Contract

A decentralized crowdfunding platform built on the Ethereum blockchain using Solidity. This smart contract enables transparent fund collection, voting-based fund management, and democratic decision-making for project funding.

## Overview

This crowdfunding smart contract implements a decentralized fundraising mechanism where:
- Contributors can send ETH to support a project
- Fund managers create spending requests
- Contributors vote on fund utilization
- Funds are released only with community consensus
- Automatic refunds if the goal isn't met by the deadline

## Features

✨ **Key Features:**
- **Contribution Management**: Track contributor amounts and participation
- **Target & Deadline**: Configurable fundraising goals and time limits
- **Voting System**: Democratic decision-making by contributors
- **Request Management**: Manager creates spending requests with descriptions and recipients
- **Majority Consensus**: Payments require more than 50% contributor votes
- **Refund Mechanism**: Contributors can claim refunds if deadline passes without reaching target
- **Transparency**: Immutable record of all transactions on the blockchain

## Contract Structure

### State Variables
- `contributors`: Mapping to track contribution amounts per address
- `manager`: The project manager who deploys the contract
- `minimumContribution`: Minimum ETH required per contribution (100 wei)
- `deadline`: Unix timestamp when fundraising period ends
- `target`: Target amount to raise (in wei)
- `raisedAmount`: Total amount raised so far
- `noOfContributors`: Total number of contributors
- `requests`: Mapping of spending requests
- `numRequest`: Total number of requests created

### Request Structure
Each spending request contains:
- `description`: Purpose of the spending request
- `recipient`: Address to receive funds
- `value`: Amount to transfer
- `completed`: Whether the request has been executed
- `noOfVoters`: Number of votes received
- `voters`: Mapping to track who voted

## Functions

### Contribution Functions

#### `sendETH()`
- **Description**: Send ETH to contribute to the project
- **Requirements**: 
  - Must meet minimum contribution (100 wei)
  - Must be before deadline
- **Behavior**: Updates contributor balance and increments contributor count if new

```solidity
function sendETH() public payable
```

#### `getContracrBalance()`
- **Description**: Get current contract balance
- **Returns**: Current ETH balance of the contract

```solidity
function getContracrBalance() public view returns (uint)
```

#### `refund()`
- **Description**: Claim refund if campaign failed
- **Requirements**:
  - Deadline must have passed
  - Target must not have been reached
  - Caller must be a contributor
- **Behavior**: Transfers contributed amount back to contributor

```solidity
function refund() public
```

### Request Functions

#### `createRequest(string memory _description, address payable _recipient, uint _value)`
- **Description**: Create a new spending request
- **Requirements**: Only manager can call
- **Parameters**:
  - `_description`: Description of the spending request
  - `_recipient`: Recipient address for funds
  - `_value`: Amount to transfer

```solidity
function createRequest(
    string memory _description,
    address payable _recipient,
    uint _value
) public onlyManager
```

#### `voteRequest(uint _requestNo)`
- **Description**: Vote on a spending request
- **Requirements**: 
  - Caller must be a contributor
  - Cannot vote twice on same request
- **Parameters**: `_requestNo`: Index of the request to vote on

```solidity
function voteRequest(uint _requestNo) public
```

#### `makePayment(uint _requestNo)`
- **Description**: Execute payment for an approved request
- **Requirements**:
  - Only manager can call
  - Target must be reached
  - Request not already completed
  - Must have majority vote (> 50% of contributors)
- **Parameters**: `_requestNo`: Index of the request to execute

```solidity
function makePayment(uint _requestNo) public payable onlyManager
```

## Usage Example

### 1. Deploy Contract
```javascript
// Deploy with 10 ETH target and 30 days deadline (in seconds)
const target = ethers.utils.parseEther("10");
const deadline = 30 * 24 * 60 * 60; // 30 days
const contract = await crowdFunding.deploy(target, deadline);
```

### 2. Contribute
```javascript
// Send 1 ETH to support the project
const tx = await contract.sendETH({ 
    value: ethers.utils.parseEther("1") 
});
```

### 3. Create Spending Request
```javascript
// Manager creates a request
const tx = await contract.createRequest(
    "Buy server infrastructure",
    "0x742d35Cc6634C0532925a3b844Bc9e7595f42e9e",
    ethers.utils.parseEther("2")
);
```

### 4. Vote on Request
```javascript
// Contributors vote on the request
const tx = await contract.voteRequest(0);
```

### 5. Execute Payment
```javascript
// Manager executes approved request
const tx = await contract.makePayment(0);
```

### 6. Request Refund (if campaign fails)
```javascript
// Claim refund after deadline if target not met
const tx = await contract.refund();
```

## Requirements

- **Solidity**: ^0.8.20
- **Ethereum Network**: Any EVM-compatible network
- **Tool**: Hardhat, Truffle, or Remix IDE

## Deployment

### Using Hardhat
```bash
# Install dependencies
npm install

# Compile contract
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia
```

### Using Remix IDE
1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create new file: `croudFunding.sol`
3. Copy contract code
4. Select compiler version: ^0.8.20
5. Compile and deploy

## Security Considerations

⚠️ **Important Notes**:
- This contract is for educational purposes
- Not audited - do not use for production with real funds
- Use OpenZeppelin's ReentrancyGuard for production
- Consider implementing additional safety checks
- Use USDC/USDT instead of raw ETH for stability

## Potential Improvements

🔄 **Future Enhancements**:
- Time-weighted voting mechanism
- Proposal deadline voting system
- Support for ERC-20 tokens
- ReentrancyGuard protection
- Event emissions for tracking
- Upgradeable contract pattern
- Multi-signature manager approval

## Gas Optimization Tips

- Batch operations when possible
- Use events instead of storage for historical data
- Implement pagination for large datasets
- Consider state compression

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
