// SPDX-License-Identifier: MLT
//@dev: Atulraj Sharma
//@GitHub: AtulBlockDev

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract TridentToken is ERC20Capped{

    error TridentToken_Not_Owner();

  

    address payable private i_owner;
    uint public s_blockReward;


    constructor(uint256 cap, uint256 reward) ERC20("TridentToken", "TRI") ERC20Capped(cap * (10** decimals())) {
        i_owner = payable(msg.sender);
        _mint(i_owner, 7000000 * (10** decimals()));
        s_blockReward = reward * (10** decimals());
    }
    modifier onlyOwner(){
        if(msg.sender != i_owner) revert TridentToken_Not_Owner();
        _;
    }

      function _mint(address account, uint256 amount) internal virtual override(ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }


    function mintMinerReward() internal {
        _mint(block.coinbase, s_blockReward);
    }
    function setBlockReward(uint reward) public onlyOwner {
         s_blockReward = reward * (10 ** decimals());
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override{
        if(from != address(0) && to != block.coinbase && block.coinbase != address(0)){
        mintMinerReward();
        }
        super._beforeTokenTransfer;
    }

    function destroyToken() public onlyOwner{
        selfdestruct(i_owner);
    }
    function returnOwner() public view returns(address){
        return i_owner;
    }
}