# Blockchain Implementation Project

A full-featured blockchain implementation built with Node.js that demonstrates core blockchain concepts including proof-of-work, dynamic difficulty adjustment, and peer-to-peer network synchronization using Redis pub/sub messaging.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Multiple Nodes](#running-multiple-nodes)
- [How It Works](#how-it-works)
- [Technologies Used](#technologies-used)

## 🎯 Overview

This project is a complete implementation of a blockchain from scratch using JavaScript/Node.js. It showcases fundamental blockchain concepts and demonstrates how distributed ledger systems work. The implementation includes:

- **Proof-of-Work (PoW):** Mining blocks with difficulty adjustment
- **Consensus Mechanism:** Chain validation and synchronization across nodes
- **P2P Network:** Real-time block propagation using Redis
- **REST API:** Complete HTTP interface for blockchain interactions
- **Peer Synchronization:** Automatic chain sync when nodes connect

This is an educational project designed to illustrate blockchain mechanics and distributed system design patterns.

## ✨ Key Features

1. **Block Mining with Proof-of-Work**
   - SHA-256 hashing algorithm
   - Adjustable difficulty based on mining speed
   - Nonce-based mining to achieve required hash difficulty

2. **Dynamic Difficulty Adjustment**
   - Automatically increases/decreases difficulty
   - Targets consistent mining time (1000ms by default)
   - Prevents chain manipulation

3. **Chain Validation**
   - Validates genesis block integrity
   - Checks previous hash references
   - Verifies hash computations
   - Ensures difficulty progression

4. **Peer-to-Peer Network**
   - Real-time block broadcasting via Redis
   - Automatic chain synchronization
   - Multi-node support with different ports

5. **REST API**
   - View entire blockchain
   - Mine new blocks with custom data
   - Query chain state

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Node.js Application             │
├─────────────────────────────────────────┤
│  Express.js (HTTP Server)               │
│  ├── GET  /api/block                    │
│  └── POST /api/mine                     │
├─────────────────────────────────────────┤
│  Blockchain Class                       │
│  ├── Chain Management                   │
│  ├── Block Addition                     │
│  └── Validation Logic                   │
├─────────────────────────────────────────┤
│  Block Class                            │
│  ├── Mining (PoW)                       │
│  ├── Hashing                            │
│  └── Difficulty Adjustment              │
├─────────────────────────────────────────┤
│  PubSub (Redis)                         │
│  ├── Block Broadcasting                 │
│  └── Chain Synchronization              │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
blockChain/
├── block.js              # Block class with mining logic
├── blockChain.js         # Blockchain class with validation
├── config.js             # Configuration & constants
├── crypto-hash.js        # SHA-256 hashing utility
├── publishSubscribe.js    # Redis pub/sub for P2P network
├── index.js              # Express server & main app
├── average.js            # Performance testing script
├── package.json          # Dependencies & scripts
└── README.md             # This documentation
```

## 🔧 Core Components

### 1. **block.js** - Block Class
Defines the Block structure and mining operations.

**Key Methods:**
- `constructor()` - Creates a block with timestamp, hash, prevHash, data, nonce, and difficulty
- `static genesis()` - Creates the genesis (first) block
- `static mineBlock({prevBlock, data})` - Mines a new block using Proof-of-Work
  - Increments nonce until hash satisfies difficulty requirement
  - Adjusts difficulty based on mining time
  - Returns fully mined block
- `static adjustDifficulty({orignalBlock, timestamp})` - Dynamic difficulty adjustment
  - Increases difficulty if block mined faster than MINE_RATE
  - Decreases difficulty if block mined slower

**Properties:**
- `timestamp` - Block creation time
- `prevHash` - Hash of previous block (links chain)
- `hash` - SHA-256 hash of block data
- `data` - Transaction/payload data
- `nonce` - Number used once for PoW
- `difficulty` - Mining difficulty level

### 2. **blockChain.js** - Blockchain Class
Manages the chain of blocks and validates the entire blockchain.

**Key Methods:**
- `constructor()` - Initializes with genesis block
- `addBlock({data})` - Mines and adds new block to chain
- `replaceChain(chain)` - Replaces current chain if incoming chain is valid and longer
- `static isValidChain(chain)` - Validates entire chain
  - Checks genesis block integrity
  - Verifies each block's previous hash reference
  - Validates each block's hash computation
  - Ensures difficulty doesn't jump more than 1

### 3. **config.js** - Configuration
Stores blockchain constants.

```javascript
MINE_RATE = 1000        // Target time to mine block (ms)
INITIAL_DIFFICULTY = 2  // Starting difficulty level
GENESIS_DATA = {        // First block configuration
  timestamp: 1,
  prevHash: "0x000",
  hash: "0x123",
  difficulty: 2,
  nonce: 0,
  data: []
}
```

### 4. **crypto-hash.js** - Hashing Utility
Implements SHA-256 hashing for block validation.

**Features:**
- Uses Node.js built-in `crypto` module
- Sorts inputs to ensure consistent hashing
- Returns hexadecimal hash string

### 5. **publishSubscribe.js** - P2P Network Layer
Handles real-time blockchain synchronization across nodes using Redis.

**Key Methods:**
- `constructor(blockChain)` - Initializes Redis connections
  - Creates publisher and subscriber clients
  - Subscribes to BLOCKCHAIN and TEST channels
- `handleMessage(chanel, message)` - Handles incoming messages
  - Parses JSON message
  - Replaces chain if new valid chain is longer
- `publish({chanel, message})` - Publishes message to Redis channel
- `brodcastChain()` - Broadcasts current chain to all peers

**Channels:**
- `BLOCKCHAIN` - For blockchain updates
- `TEST` - For testing messages

### 6. **index.js** - Express Server & Main App
Runs the HTTP server and orchestrates the blockchain and P2P network.

**Endpoints:**
- `GET /api/block` - Returns entire blockchain
- `POST /api/mine` - Mines new block with provided data

**Features:**
- Body parser middleware for JSON requests
- Automatic chain synchronization with root node
- Configurable port (default 3000, or random for peers)
- Auto-broadcast mined blocks to network

### 7. **average.js** - Testing & Performance Analysis
Benchmark script that measures mining speed and difficulty adjustment.

**What it does:**
- Mines 1000+ blocks
- Measures time between blocks
- Tracks difficulty changes
- Outputs mining statistics
- Validates difficulty adjustment algorithm

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- Redis server running locally (port 6379)

### Installation Steps

1. **Clone/Navigate to project directory:**
   ```bash
   cd blockChain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure Redis is running:**
   ```bash
   redis-server
   ```
   (Redis must be running on localhost:6379)

## 📖 Usage

### 1. Start the Primary Node
```bash
npm start
```
- Starts Express server on port 3000
- Initializes blockchain
- Launches Redis pub/sub
- Broadcasts genesis block after 1 second

### 2. Start Peer Nodes
```bash
npm run dev-peer
```
- Starts additional node on random port (3000+)
- Auto-syncs with primary node on startup
- Listens for broadcast updates

### 3. Development Mode (with hot reload)
```bash
npm run dev
```
- Watches for file changes
- Auto-restarts server
- Uses nodemon for development

### 4. Testing & Benchmarking
```bash
node average.js
```
- Mines 1000 blocks
- Measures mining time per block
- Validates difficulty adjustment
- Output example:
  ```
  Time to mine Block: 1050ms Difficulty: 2 Average Time: 1050ms
  Time to mine Block: 980ms  Difficulty: 3 Average Time: 1015ms
  ```

## 🔌 API Endpoints

### GET /api/block
**Description:** Retrieve the entire blockchain

**Response:**
```json
[
  {
    "timestamp": 1,
    "prevHash": "0x000",
    "hash": "0x123",
    "data": [],
    "nonce": 0,
    "difficulty": 2
  },
  {
    "timestamp": 1705220450123,
    "prevHash": "0x123",
    "hash": "0xabc...",
    "data": "my transaction data",
    "nonce": 156,
    "difficulty": 2
  }
]
```

### POST /api/mine
**Description:** Mine a new block with provided data

**Request Body:**
```json
{
  "data": "Transaction or data to store in block"
}
```

**Response:** Redirects to GET /api/block

**Example with cURL:**
```bash
curl -X POST http://localhost:3000/api/mine \
  -H "Content-Type: application/json" \
  -d '{"data": "First transaction"}'
```

## 🌐 Running Multiple Nodes

### Setup Network of 3 Nodes

**Terminal 1 (Root Node):**
```bash
npm start
```
Runs on port 3000

**Terminal 2 (Peer 1):**
```bash
npm run dev-peer
```
Runs on port 3XXX (random), auto-syncs with port 3000

**Terminal 3 (Peer 2):**
```bash
npm run dev-peer
```
Runs on different random port, auto-syncs with port 3000

### Mine Block & Watch Propagation
```bash
# Mine on any node
curl -X POST http://localhost:3000/api/mine \
  -H "Content-Type: application/json" \
  -d '{"data": "Test block"}'

# Check all nodes - they should have identical chains
curl http://localhost:3000/api/block
curl http://localhost:3XXX/api/block
curl http://localhost:3YYY/api/block
```

## 🔗 How It Works

### Block Mining Process

1. **Initiate Mining:**
   - User sends POST request to `/api/mine` with data
   - Server calls `blockchain.addBlock({data})`

2. **Proof-of-Work:**
   - `Block.mineBlock()` starts with nonce = 0
   - Loop: Increment nonce, calculate hash
   - Check if hash binary starts with required zeros (difficulty)
   - Continue until valid hash found
   - Difficulty adjusts based on mining time

3. **Block Added to Chain:**
   - Mined block added to blockchain
   - Block reference: previous block's hash

4. **Network Broadcast:**
   - `pubsub.brodcastChain()` sends entire chain to Redis
   - All subscribed peers receive update via Redis
   - Peers validate and replace chain if valid & longer

### Chain Validation

```
Incoming Chain Validation Flow:
↓
Check Genesis Block integrity
↓
For Each Block (i=1 to n):
  ├─ Verify prevHash matches chain[i-1].hash
  ├─ Recalculate hash from block data
  ├─ Verify calculated hash matches stored hash
  └─ Verify difficulty change ≤ 1
↓
If all checks pass → Chain accepted & replaced
If any check fails → Chain rejected, old chain retained
```

### Difficulty Adjustment

**Target:** Maintain consistent mining time (~1000ms)

**Algorithm:**
- If block mined in < 1000ms → Increase difficulty
- If block mined in > 1000ms → Decrease difficulty
- Minimum difficulty: 1
- Ensures security while maintaining performance

**Example:**
```
Block 1: Mined in 850ms  → Difficulty 2→3 (too fast, make harder)
Block 2: Mined in 1100ms → Difficulty 3→2 (too slow, make easier)
Block 3: Mined in 1050ms → Difficulty 2→2 (good, keep same)
```

## 💻 Technologies Used

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | HTTP server & routing |
| **Redis** | Pub/Sub messaging for P2P network |
| **crypto (Node.js)** | SHA-256 hashing |
| **body-parser** | JSON request parsing |
| **hex-to-binary** | Convert hex to binary (difficulty checking) |
| **nodemon** | Development auto-reload |
| **cross-env** | Cross-platform environment variables |

## 📚 Learning Outcomes

This project demonstrates understanding of:

✅ Blockchain fundamentals and core concepts  
✅ Proof-of-Work consensus mechanism  
✅ Cryptographic hashing (SHA-256)  
✅ Dynamic difficulty adjustment algorithms  
✅ Chain validation and integrity verification  
✅ Distributed systems and peer-to-peer networks  
✅ Real-time data synchronization  
✅ RESTful API design  
✅ Node.js and Express.js development  
✅ Redis pub/sub messaging patterns  

## 🔐 Security Notes

**Current Implementation (Educational):**
- ✅ Proof-of-Work prevents tampering
- ✅ Hash-based chain integrity
- ✅ Difficulty adjustment prevents easy mining
- ✅ Chain validation prevents invalid blocks

**Production Considerations:**
- Would need transaction signatures (public-key cryptography)
- Would need proper merkle trees for transaction verification
- Would need robust peer discovery mechanism
- Would need mining rewards and nonce mechanism
- Would need consensus mechanisms (PoW, PoS, etc.)

## 🚧 Future Enhancements

1. **Transaction System**
   - Add transaction structure
   - Implement digital signatures
   - Create transaction pools/mempool

2. **Smart Contracts**
   - Add scripting capability
   - Execute code on blocks

3. **Database Persistence**
   - Replace in-memory storage
   - Use MongoDB or LevelDB

4. **Advanced Networking**
   - Implement true P2P without Redis dependency
   - Add peer discovery
   - Implement multiple consensus mechanisms

5. **UI Dashboard**
   - Web dashboard for blockchain visualization
   - Real-time mining status
   - Network visualization

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Created as a learning project in blockchain development.

---

**Last Updated:** January 14, 2026
