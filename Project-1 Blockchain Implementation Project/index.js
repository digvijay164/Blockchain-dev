const bodyParser = require('body-parser')
const express = require('express')
const Blockchain = require("./blockChain")
const PubSub = require('./publishSubscribe')
const request = require('request')
const app = express()
const blockchain = new Blockchain()
const pubsub = new PubSub(blockchain)

const DEFAULT_PORT = 3000
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

setTimeout(() => {
    pubsub.brodcastChain()
}, 1000);

app.use(bodyParser.json())
app.get('/api/block', (req, res)=>{
    res.json(blockchain.chain)
})

app.post('/api/mine', (req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    pubsub.brodcastChain()
    res.redirect('/api/block')
})

const syncChain = ()=>{
    request({url: `${ROOT_NODE_ADDRESS}/api/block`}, (error, response, body)=>{
        if(!error && response.statusCode ===200){
            const rootChain = JSON.parse(body)
            console.log(`replace chain on sync with : ${rootChain}`);
            blockchain.replaceChain(rootChain)
        }
    })
}

let PEER_PORT ;
if(process.env.GENERATE_PEER_PORT === "true"){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, ()=>{
    console.log(`Listening to PORT : ${PORT}`)
    syncChain()
})