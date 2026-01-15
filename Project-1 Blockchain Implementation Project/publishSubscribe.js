const redis = require('redis')

const CHANEL = {
    TEST: 'TEST',
    BLOCKCHAIN: "BLOCKCHAIN"
}

class PubSub{
    constructor(blockChain){
        this.blockChain = blockChain
        this.publisher = redis.createClient()
        this.subscriber = redis.createClient()
        this.subscriber.subscribe(CHANEL.TEST)
        this.subscriber.subscribe(CHANEL.BLOCKCHAIN)
        this.subscriber.on('message', (chanel, message)=> this.handleMessage(chanel, message))
    }
    handleMessage(chanel, message){
        console.log(`Message resived on Chanel : ${chanel}, Message : ${message}`)
        const parseMessage = JSON.parse(message)
        if(chanel === CHANEL.BLOCKCHAIN){
            this.blockChain.replaceChain(parseMessage)
        }
    }
    publish({chanel, message}){
        this.publisher.publish(chanel, message)
    }
    brodcastChain(){
        this.publish({
            chanel: CHANEL.BLOCKCHAIN,
            message: JSON.stringify(this.blockChain.chain)
        })
    }
} 

// const checkPubSub = new PubSub()
// setTimeout(()=>{
//     checkPubSub.publisher.publish(CHANEL.TEST, "Hellooooo")
// }, 1000)

module.exports = PubSub