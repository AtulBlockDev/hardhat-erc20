const { assert } = require("chai");
const { network, ethers, getNamedAccounts } = require("hardhat");

const { developmentChains, MAX_SUPPLY} = require("../helper_hardhat.config");


  !developmentChains.includes(network.name) ? describe.skip
  :describe("erc20Test", async () => {
      let trident;
      let deployer;
    

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
         
         await deployments.fixture(["all"]);
        trident = await ethers.getContract("TridentToken", deployer);
       
      });
      
         it("checks whether deplyer is owner or not", async () => {
           const owner = await trident.returnOwner();
           assert.equal(owner.toString(), deployer);
         });

         describe("constructor", async function(){
            it("checks total supply is equal to owner defined value", async function(){
                const maxSupply = await trident.totalSupply().toString
                assert.equal(maxSupply.toString(), MAX_SUPPLY.toString())
            })
                
               
            
         })

      })
     
    
