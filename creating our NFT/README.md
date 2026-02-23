# 🚀 Creating Our NFT

Welcome to my **"Creating Our NFT"** project! This repository documents a significant milestone in my blockchain development learning journey: creating, deploying, and minting a custom ERC-721 Non-Fungible Token (NFT) on the Ethereum Sepolia Testnet.

## 🌟 Project Overview

In this project, I learned how to piece together multiple Web3 tools to launch an NFT from scratch. This involves writing the smart contract, uploading assets to IPFS, deploying the contract, and finally minting the token to a wallet.

### 🛠 Tech Stack & Tools Used
- **Solidity (^0.8.19):** Writing the smart contract.
- **[Hardhat](https://hardhat.org/):** Development environment, testing, and deployment framework.
- **[OpenZeppelin](https://openzeppelin.com/):** Utilizing secure, community-vetted smart contract standards (`ERC721URIStorage`, `Counters`, `Ownable`).
- **[Alchemy](https://www.alchemy.com/):** Node provider/RPC to connect to the Sepolia testnet.
- **Alchemy Web3 (`@alch/alchemy-web3`):** Enhanced Web3 library for minting transactions.
- **Ethers.js:** Interacting with the blockchain during deployment.
- **[Pinata](https://www.pinata.cloud/) (IPFS):** Decentralized storage for the NFT art and its metadata (`nft-metadata.json`).

## 📚 Learning Journey / Steps Taken

### 1. The Smart Contract (`contracts/MyNFT.sol`)
I created an ERC-721 smart contract named `MyNFT` (Symbol: `CER` for "Code Eater"). 
- Imported OpenZeppelin standards for secure token minting and ownership tracking.
- Implemented a counter to assign a unique ID to each newly minted NFT.
- Added a `mintNFT` function restricted to the contract owner (`onlyOwner`) that takes a recipient address and a `tokenURI` (the IPFS link to the metadata).

### 2. Uploading Data to IPFS (Pinata)
- Stored the raw image asset on IPFS via Pinata.
- Created `nft-metadata.json` referencing the uploaded image link (`https://aquamarine-added-dog-332.mypinata.cloud/ipfs/...`) along with custom attributes (e.g., `"color": "Blue"`).
- Uploaded the metadata JSON to IPFS to get the final `tokenURI`.

### 3. Deploying to Sepolia (`scripts/deploy.js`)
- Configured `hardhat.config.js` to connect to the Sepolia testnet using Alchemy's API URL and my wallet's private key (securely handled via `.env`).
- Wrote a deployment script using Ethers.js to grab the `MyNFT` contract factory and deploy it.
- **Deployed Contract Address:** `0xDFd57c3733bE32C703cA34066d98C9A5aC787980`

### 4. Minting the NFT (`scripts/mint-nft.js`)
- Rather than minting directly through a block explorer, I wrote a Node.js script using `@alch/alchemy-web3`.
- The script grabs the contract ABI and address.
- It constructs a raw transaction (`data: nftCOntract.methods.mintNFT(...)`), signs it with my private key, and sends it to the network.
- Successfully passed the IPFS metadata URI to tie the unique artwork and attributes to the minted token!

## 🚀 How to Run (For Reference)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Environment Variables:**
   Create a `.env` file with:
   ```env
   API_URL="your-alchemy-https-url"
   PRIVATE_KEY="your-wallet-private-key"
   PUBLIC_KEY="your-wallet-public-address"
   ```

3. **Deploy the Contract:**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Mint the NFT:**
   Update the `contractAddress` and `tokenURI` in `scripts/mint-nft.js`, then run:
   ```bash
   node scripts/mint-nft.js
   ```

---
*This project is part of my continuous journey to master Blockchain Development and Web3 technologies.*
