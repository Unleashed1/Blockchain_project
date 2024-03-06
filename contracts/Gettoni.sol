// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BerryTk {
    string public name = "BERRY";
    string public symbol = "BTK";
    uint256 public totalSupply;
    address payable public owner;

    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to);

    constructor() {
        totalSupply = 0;
        owner = payable(msg.sender);
    }

    function mint(uint256 numGett) external payable {
        require(msg.value >= numGett * 1 ether, "Insufficient ETH sent");
        owner.transfer(msg.value);
        balances[msg.sender] += numGett;
        totalSupply += numGett;
    }

    function useToken() external returns (bool){
        require(balances[msg.sender] > 0, "Insufficient tokens");
        
        // Brucia il token
        balances[msg.sender] -= 1;
        totalSupply -= 1;

        emit Transfer(msg.sender, address(0));
        return true;
    }

    function balanceOf(address tokenOwner) external view returns (uint256) {
        return balances[tokenOwner];
    }
}

/*
contract GameToken {
    string public name = "BERRY";
    string public symbol = "BTK";
    uint256 public totalSupply;
    address payable public owner;

    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to);

    constructor() {
        totalSupply = 0;
        owner = payable(msg.sender);

    }

    function mint(uint256 numGett, address payable _receiver) external payable {
        require(msg.value >= numGett*1 ether, "Insufficient ETH sent");
        _receiver.transfer(msg.value);
        balances[msg.sender]+=numGett;
        totalSupply+=numGett;
    }

    function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }

    function setToken() external{
        balances[msg.sender]-=1;
    }
}*/