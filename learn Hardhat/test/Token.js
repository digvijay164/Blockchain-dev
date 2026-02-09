const {expect} = require("chai");
const { ethers } = require("hardhat");
describe("Token Contract", ()=>{
    it("Deployemment should assign the total supply of tokens to the owner", async()=>{
        const [owner] = await ethers.getSigners();
        // console.log("Signers Object : ", owner);
        const Token = await ethers.getContractFactory("Token");
        const hardHatToken = await Token.deploy();
        const ownerBalance = await hardHatToken.balanceOf(owner.address);
        // console.log("owner address : ", owner.address);
        expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
     });
     it("Should transfer token bettwine account", async()=>{
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardHatToken = await Token.deploy();
        await hardHatToken.transfer(addr1.address, 10);
        expect(await hardHatToken.balanceOf(addr1.address)).to.equal(10);
        await hardHatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardHatToken.balanceOf(addr2.address)).to.equal(5);
     });
});