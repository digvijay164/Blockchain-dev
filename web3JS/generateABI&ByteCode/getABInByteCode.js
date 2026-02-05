import {Web3} from "web3";
import fs from "fs";
import solc from "solc";

let web3 = new Web3("http://127.0.0.1:8545");
let fileContent = fs.readFileSync("../web3Contract/web3Contract.sol").toString();
console.log(fileContent);

let input = {
    language: "Solidity",
    sources: {
        "web3Contract.sol": {
            content: fileContent
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
}

let output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
let abi = output.contracts["web3Contract.sol"]["web3Contract"].abi;
let byteCode = output.contracts["web3Contract.sol"]["web3Contract"].evm.bytecode.object;
console.log("ABI: ", abi);
console.log("ByteCode: ", byteCode);