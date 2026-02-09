const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Deployment", () => {
    let Token;
    let hardHatToken;
    let owner;
    let arrd1;
    let arrd2;
    let addr3;
    beforeEach(async () => {
        Token = await ethers.getContractFactory("Token");
        [owner, arrd1, arrd2, ...addrs] = await ethers.getSigners();
        hardHatToken = await Token.deploy();
    }); 
    it("Should set the right owner", async () => {
        expect(await hardHatToken.owner()).to.equal(owner.address);
    });
    it("should assign the total supply of tokens to the owner", async () => {
        const ownerBalance = await hardHatToken.balanceOf(owner.address);
        expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
    });
    it("should transfer token between accounts", async () => {
        await hardHatToken.transfer(arrd1.address, 10);
        expect(await hardHatToken.balanceOf(arrd1.address)).to.equal(10);
        await hardHatToken.connect(arrd1).transfer(arrd2.address, 5);
        expect(await hardHatToken.balanceOf(arrd2.address)).to.equal(5);
    })

    // // OLD Code No Dynamic Practices
    // it("Deployemment should assign the total supply of tokens to the owner", async()=>{
    //     const [owner] = await ethers.getSigners();
    //     // console.log("Signers Object : ", owner);
    //     const Token = await ethers.getContractFactory("Token");
    //     const hardHatToken = await Token.deploy();
    //     const ownerBalance = await hardHatToken.balanceOf(owner.address);
    //     1// console.log("owner address : ", owner.address);
    //     expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
    //  });
    //  it("Should transfer token bettwine account", async()=>{
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const Token = await ethers.getContractFactory("Token");
    //     const hardHatToken = await Token.deploy();
    //     await hardHatToken.transfer(addr1.address, 10);
    //     expect(await hardHatToken.balanceOf(addr1.address)).to.equal(10);
    //     await hardHatToken.connect(addr1).transfer(addr2.address, 5);
    //     expect(await hardHatToken.balanceOf(addr2.address)).to.equal(5);
    //  });
});