const { ethers } = require("ethers")

const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/e4ad9a2429c440e58a648b890f6bad7b`)

const queryBlockChain = async () => {
    let count_block = 0
    for (let i = 1; i <= 10; i++) {
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const balance = await provider.getBalance(block.miner)
        const etherBalance = ethers.formatEther(balance)
        count_block++
        console.log("-----------------------------------------------------");
        console.log("Block Number:", blockNumber);
        console.log(count_block," Block Details :", block);
        console.log("Account Balance in BN", balance);
        console.log("Account Balance in RTH", etherBalance);
        console.log("-----------------------------------------------------");
        
    }


}
queryBlockChain()