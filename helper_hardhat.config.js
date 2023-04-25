const { ethers } = require("hardhat");

const networkConfig = {
  5: {
    name: "goerli",
  },
  31337: {
    name: "hardhat",
  }
};
developmentChains = ["hardhat", "localhost"];

const MAX_SUPPLY = 10000000000000000000000000;

module.exports = {
  networkConfig,
  developmentChains,
  MAX_SUPPLY
};
