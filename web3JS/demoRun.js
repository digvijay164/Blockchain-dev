console.log("working dear");
let {Web3} = require("web3");
const ganache_CLI = "http://127.0.0.1:8545";
let web3 = new Web3(ganache_CLI);
// console.log(web3);
let accountHolder = "0x20D518085626E028915efc188503308e72435f12";
let receiver = "0xe9fFEEd02397A2D693675402ba6c856e2D6E2280";
sendAmountETH = 9;
(async()=>{
    console.log("----------------------------------------");
    await web3.eth.getBalance(accountHolder).then((balance)=> console.log("Current balance is: " ,web3.utils.fromWei(balance, "ether"),"ETH"));
    let transection = await web3.eth.sendTransaction({
        from: accountHolder,
        to: receiver,
        value: web3.utils.toWei(sendAmountETH.toString(), "ether"),
        gas: 21000,
    });

    console.log("----------------------------------------");

    console.log("Transition from  : ", transection.from);
    console.log("Transition to    : ", transection.to);
    console.log("Transition value : ", transection.value);
    console.log("Transaction Hash: ", transection.transactionHash);

    console.log("----------------------------------------");
    await web3.eth.getBalance(accountHolder).then((balance)=> console.log("remaining balance is: " ,web3.utils.fromWei(balance, "ether"),"ETH"));
})();