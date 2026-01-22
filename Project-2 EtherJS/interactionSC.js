// 0xf70f367f38c0ed1fd2c31a65ac751e04749ae8cd

const { ethers } = require("ethers");
// In Ethers v6, use JsonRpcProvider for a raw RPC URL.
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/e4ad9a2429c440e58a648b890f6bad7b"
);

const walletAddress = "0x86f1d071ca2ddc956235c8fdc38e062fed95c882";
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

const contractIntraction = async ()=>{
    const network = await provider.getNetwork();
    console.log("Connected                 :", { chainId: network.chainId.toString(), name: network.name });

    const code = await provider.getCode(walletAddress);
    if (code === "0x") {
        throw new Error(`No contract deployed at ${walletAddress} on chainId=${network.chainId}`);
    }

    const walletContract = new ethers.Contract(walletAddress, walletABI, provider);
    // console.log(walletContract);
    const contractName = await walletContract.name();
    const num = await walletContract.getValue();
    const contractBALANCE = await walletContract.contractBalance();
    const ETHcontractBalance = ethers.formatEther(contractBALANCE);
    const userBalance = await walletContract.accountBalance("0xe9fFEEd02397A2D693675402ba6c856e2D6E2280");
    const ETHuserBalance = ethers.formatEther(userBalance);
    
    console.log("Contract Name             : " ,contractName);
    console.log("Number Value              : " ,num);
    console.log("contract Balance in ETHER : " ,ETHcontractBalance);
    console.log("user balance in ETHER     : ",ETHuserBalance);
    
}

contractIntraction().catch((err) => {
    console.error("Failed:", err);
    process.exitCode = 1;
});