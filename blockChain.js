const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock)
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('the incoming change is not longer');
            return
        }
        if (!Blockchain.isVaildChain(chain)) {
            console.error('the incoming chain is not valid');
            return
        }
        this.chain = chain
    }

    static isVaildChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            console.log("Genisis Block is corrupted")
            return false
        }
        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i]
            const lastDifficulty = chain[i - 1].difficulty
            const realHash = chain[i - 1].hash
            if (prevHash !== realHash) {
                console.log(" previous hash value is not correspond to real harsh value")
                return false
            }
            const validhash = cryptoHash(timestamp, prevHash, nonce, difficulty, data)
            if (hash !== validhash) {
                console.log(" hash value does not validate")
                return false
            }
            if(Math.abs(lastDifficulty - difficulty) > 1) return false
        }
        return true
    }

}

// const blockchain = new Blockchain()
// blockchain.addBlock({ data: "block1" })
// blockchain.addBlock({ data: "block2" })
// console.log(blockchain);
// const result = Blockchain.isVaildChain(blockchain.chain)
// console.log(result);
// console.log(blockchain.chain);

module.exports = Blockchain