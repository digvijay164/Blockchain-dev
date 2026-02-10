const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
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

    describe("Deployment", ()=>{
        it("Should set the right owner", async () => {
            await expect( hardHatToken.owner()).to.equal(owner.address);
        });

        it("should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardHatToken.balanceOf(owner.address);
            await expect( hardHatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    // describe()
    // it("should transfer token between accounts", async () => {
    //     await hardHatToken.transfer(arrd1.address, 10);
    //     await expect( hardHatToken.balanceOf(arrd1.address)).to.equal(10);
    //     await hardHatToken.connect(arrd1).transfer(arrd2.address, 5);
    //     await expect( hardHatToken.balanceOf(arrd2.address)).to.equal(5);
    // })

    describe("Transections", ()=>{
        it("Shoulod transfer tokens between accounts", async()=>{
            await hardHatToken.transfer(arrd1.address,10);
            let arrd1Balance = await hardHatToken.balanceOf(arrd1.address);
            await expect( arrd1Balance).to.equal(10);

            await hardHatToken.connect(arrd1).transfer(arrd2.address, 5);
            let arrd2Balance = await hardHatToken.balanceOf(arrd2.address);
            await expect( arrd2Balance).to.equal(5);
        });

        it("Should fail if sender doesnot have enough tokens", async()=>{
            const initialBalanceOfOwner = await hardHatToken.balanceOf(owner.address);
            // await expect( initialBalanceOfOwner).to.equal(totalSupply());
            await expect(hardHatToken.connect(arrd1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
            await expect(hardHatToken.balanceOf(owner.address)).to.equal(initialBalanceOfOwner);
        });
    });

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