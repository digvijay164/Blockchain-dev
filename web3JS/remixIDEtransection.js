// const {Web3} = require("web3");
import { Web3 } from "web3";

(async () => {
    const ganache_CLI = "http://127.0.0.1:8545";
    let web3 = new Web3(ganache_CLI);
    let account = "0x771E3E129b5b211A901ABE30B135Bec766b01B02";
    let reciver = "0x5e0f464475cC5Ebf2B2ce5434EE6b2dd30A227AA";
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "x",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const CONTRACT_ADDRESS = "0x993Fa7e95781D2aC49f37d9b003596D1da55B684"
    let contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    let countXvalue = 1;
    // for (let i = 0; i < 10; i++) {
    await contract.methods.set(7770009453).send({
        from: account,
        gas: 3000000
    })
    await contract.methods.x().call().then(console.log);
    // }
})();