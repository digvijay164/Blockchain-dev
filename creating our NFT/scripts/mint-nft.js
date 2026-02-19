require ("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
console.log(contract.abi);

const contractAddress = "0x259F0E73D36E91DF733231283cA1caCf078E9C6f";
const nftCOntract = new web3.eth.Contract(contract.abi, contractAddress);