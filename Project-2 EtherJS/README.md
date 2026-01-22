# Ethereum Wallet Smart Contract - Full Stack DApp

A comprehensive full-stack decentralized application (DApp) demonstrating blockchain development skills using Solidity, Ethers.js, and React. This project showcases smart contract development, blockchain interaction, and Web3 integration with a modern frontend interface.

## 🚀 Project Overview

This project implements a complete Ethereum wallet smart contract system with both backend and frontend components. The smart contract allows users to send and receive Ether, check balances, and manage contract state. The project includes:

- **Smart Contract**: A Solidity wallet contract deployed on Sepolia testnet
- **Backend Scripts**: Node.js scripts for blockchain interaction and data reading
- **Frontend Application**: React-based web interface with MetaMask integration

## ✨ Features

### Smart Contract Features
- ✅ Send Ether to the contract
- ✅ Send Ether to any user address
- ✅ Check contract balance
- ✅ Check any account balance
- ✅ Store and retrieve numeric values
- ✅ Contract name retrieval

### Backend Features
- ✅ Connect to Ethereum networks (Mainnet & Sepolia testnet)
- ✅ Read blockchain data (blocks, balances, transactions)
- ✅ Interact with deployed smart contracts
- ✅ Query contract state and functions
- ✅ Format Ether values for display

### Frontend Features
- ✅ MetaMask wallet integration
- ✅ Web3 provider connection
- ✅ Smart contract interaction from browser
- ✅ Modern React + Vite setup
- ✅ Responsive UI design

## 🛠️ Tech Stack

### Blockchain & Smart Contracts
- **Solidity** `^0.8.20` - Smart contract development
- **Ethers.js** `^6.16.0` - Ethereum JavaScript library

### Backend
- **Node.js** - Runtime environment
- **Ethers.js** - Blockchain interaction library

### Frontend
- **React** `^19.2.0` - UI framework
- **Vite** `^7.2.4` - Build tool and dev server
- **Ethers.js** - Web3 integration

## 📁 Project Structure

```
Project-2 EtherJS/
├── wallet.sol                 # Smart contract source code
├── interactionSC.js           # Backend script for contract interaction
├── readBlockChain.js         # Backend script for blockchain data reading
├── package.json              # Backend dependencies
├── artifacts/                # Compiled contract artifacts
│   ├── wallet.json
│   └── wallet_metadata.json
└── client/                   # Frontend React application
    ├── src/
    │   ├── App.jsx          # Main React component with Web3 integration
    │   ├── App.css          # Component styles
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── package.json         # Frontend dependencies
    └── vite.config.js       # Vite configuration
```

## 🔧 Smart Contract Details

### Contract Address
- **Sepolia Testnet**: `0x86f1d071ca2ddc956235c8fdc38e062fed95c882`

### Contract Functions

| Function | Type | Description |
|----------|------|-------------|
| `name()` | View | Returns the contract name |
| `setValue(uint _num)` | Payable | Sets a numeric value in the contract |
| `getValue()` | View | Retrieves the stored numeric value |
| `sendContract()` | Payable | Sends Ether to the contract |
| `contractBalance()` | View | Returns the contract's Ether balance |
| `sendEtherUser(address _user)` | Payable | Sends Ether to a specified user address |
| `accountBalance(address _address)` | View | Returns the balance of any Ethereum address |

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension (for frontend)
- Access to Infura or Alchemy API (for RPC endpoints)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Project-2-EtherJS
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

### Configuration

Update the RPC provider URLs in the scripts if needed:
- `interactionSC.js` - Uses Sepolia testnet
- `readBlockChain.js` - Uses Ethereum mainnet

### Running the Project

#### Backend Scripts

**Read Blockchain Data (Mainnet)**
```bash
node readBlockChain.js
```
This script:
- Connects to Ethereum mainnet
- Fetches the latest block number
- Retrieves block details
- Gets miner balance and converts to Ether

**Interact with Smart Contract (Sepolia)**
```bash
node interactionSC.js
```
This script:
- Connects to Sepolia testnet
- Verifies contract deployment
- Reads contract state (name, value, balances)
- Displays formatted Ether balances

#### Frontend Application

1. **Start the development server**
   ```bash
   cd client
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - Ensure MetaMask is installed and connected
   - The app will automatically request account access

3. **Build for production**
   ```bash
   npm run build
   ```

## 💻 Code Examples

### Smart Contract Interaction (Backend)

```javascript
const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const walletContract = new ethers.Contract(walletAddress, walletABI, provider);

// Read contract data
const contractName = await walletContract.name();
const balance = await walletContract.contractBalance();
const etherBalance = ethers.formatEther(balance);
```

### Web3 Integration (Frontend)

```javascript
// Connect to MetaMask
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();

// Interact with contract
const contract = new ethers.Contract(walletAddress, walletABI, signer);
await contract.sendEtherUser(userAddress, {value: ethers.parseEther("0.1")});
```

## 🎯 Skills Demonstrated

### Blockchain Development
- ✅ Smart contract development in Solidity
- ✅ Understanding of payable functions and state management
- ✅ Contract deployment and verification
- ✅ Gas optimization awareness

### Web3 Integration
- ✅ Ethers.js v6 implementation
- ✅ Provider and signer management
- ✅ Contract ABI interaction
- ✅ Ether value formatting and parsing

### Full-Stack Development
- ✅ Backend Node.js scripts for blockchain interaction
- ✅ Frontend React application with Web3
- ✅ MetaMask wallet integration
- ✅ Modern build tools (Vite)

### Blockchain Concepts
- ✅ Understanding of Ethereum networks (Mainnet, Testnet)
- ✅ Block and transaction data reading
- ✅ Address balance queries
- ✅ Contract state management

## 🔐 Security Considerations

- The contract uses `require()` statements for transaction validation
- Safe Ether transfer using `call()` with proper error handling
- Contract address verification before interaction
- Network validation in backend scripts

## 📝 Notes

- This project uses **Ethers.js v6** (latest version)
- The contract is deployed on **Sepolia testnet** for testing
- Mainnet queries are read-only operations
- Frontend requires MetaMask for transaction signing

## 🤝 Contributing

This is a personal project showcasing blockchain development skills. Feel free to fork and modify for your own learning purposes.

## 📄 License

This project is open source and available for educational purposes.

## 🔗 Useful Links

- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Sepolia Testnet Faucet](https://sepoliafaucet.com/)

## 👨‍💻 Author

**Digvijay Desai**

A blockchain developer passionate about decentralized applications and Web3 technology.

---

⭐ If you find this project helpful, please give it a star!
