const{network, ethers} = require("hardhat")
const { verify } = require("../utils/verify");


module.exports = async({getNamedAccounts, deployments})=>{
    const{deploy, log} = await deployments;
    const{deployer} = await getNamedAccounts();
    chainId = network.config.chainId


const ERC20 = await deploy("TridentToken", {
    contract: "TridentToken", 
    from: deployer,
    args:[10000000, 50],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
})
if(chainId != 31337 && process.env.ETHERSCAN_API){
    await verify(ERC20.address, [1000000, 50])
}
else{
    console.log("You are on a local network! No Verification required!")
}
}


module.exports.tags = ["all", "Raffle"]

