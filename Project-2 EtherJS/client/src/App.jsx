import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers';
import { Contract } from 'ethers';
// check Version
console.log("Ethereum version : ",ethers.version);
function App() {
  const walletAddress = "0x1cb6dbfa1a9afb08f67db0beddb46ac6af79afae";
  const sendUser = "0x1629573E70B1EbC3E99f084b6538CD143e7979b9";
  
  useEffect(() => {
    const walletABI = [
      {
        "inputs": [],
        "name": "sendContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "sendEtherUser",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_num",
            "type": "uint256"
          }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "accountBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getValue",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const writeContract = async () => {
      // v5
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // v6
      if(!window.ethereum){
        console.log("MetaMask is not Define");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletABI,signer);
      // await contract.setValue(2);
      await contract.sendEtherUser(sendUser, {value: ethers.parseEther("0.1")});
    };
    writeContract();
  }, [])
  return (
    <>
      <div className="">HELLO THERE </div>
    </>
  )
}

export default App
