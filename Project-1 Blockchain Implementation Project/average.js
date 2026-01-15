const BlockChain = require('./blockChain')
const blockchain = new BlockChain()
blockchain.addBlock({data: "new data"})
let prevTimestamp, nextTimestamp, nextBlock, timeDifference, averageTime;
let times = []
for(let i = 0; i<=1000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp
    blockchain.addBlock({data: `block ${i}`})
    nextBlock = blockchain.chain[blockchain.chain.length -1]
    nextTimestamp = nextBlock.timestamp
    timeDifference = nextTimestamp - prevTimestamp
    times.push(timeDifference)
    averageTime = times.reduce((total, num)=> (total + num)) / times.length
    console.log(`Time to mine Block : ${timeDifference}ms Difficulty : ${nextBlock.difficulty} Average Time : ${averageTime}ms`);
}