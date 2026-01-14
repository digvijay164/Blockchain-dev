const { GENESIS_DATA, MINE_RATE } = require('./config')
const cryptoHash = require('./crypto-hash')
const hexToBinary = require('hex-to-binary')
class Block {
    constructor(
        {
            timestamp,
            prevHash,
            hash,
            data,
            nonce,
            difficulty
        }
    ) {
        this.timestamp = timestamp
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty
    }

    static genesis() {
        return new this(GENESIS_DATA)
    }

    static mineBlock({ prevBlock, data }) {
        // const timestamp = Date.now()
        let hash, timestamp;
        const prevHash = prevBlock.hash
        let { difficulty } = prevBlock
        let nonce = 0

        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty({
                orignalBlock: prevBlock,
                timestamp
            })
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty)
        } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty))

        return new Block({
            timestamp,
            prevHash,
            nonce,
            difficulty,
            data,
            hash
        })
    }

    static adjustDifficulty({ orignalBlock, timestamp }) {
        const { difficulty } = orignalBlock
        if (difficulty < 1) return 1
        const difference = timestamp - orignalBlock.timestamp
        if (difference > MINE_RATE) return difficulty - 1
        return difficulty + 1
    }

}

// let block1 = new Block(
//     {
//         timestamp: '13/01/2001',
//         prevHash: 'prevoxac1',
//         hash: 'crt0xac2',
//         data: 'Hello'
//     }
// )

// const result = Block.mineBlock({
//     prevBlock: block1,
//     data: "block2"
// })
// console.log(result);



// console.log(block1);

// const genesisBlock = Block.genesis()
// console.log(genesisBlock);

module.exports = Block