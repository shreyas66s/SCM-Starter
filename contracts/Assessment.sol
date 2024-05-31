// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    uint256 public balance;
    mapping(uint => uint) public shares;
    mapping(uint => uint) public price;
    mapping(uint => string) public stock;

    constructor(uint initBalance) payable {
        balance = initBalance;
        price[0] = 160;
        price[1] = 300;
        price[2] = 890;
        stock[0] = "Amazon";
        stock[1] = "Tesla";
        stock[2] = "Nvidia";
    }

    function getShares(uint stockId) public view returns (uint256) {
        return shares[stockId];
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function buyShares(uint stockId, uint256 value) public {
        require(stockId >= 0 && stockId <= 2, "Invalid stock ID");
        uint256 stockPrice = price[stockId];
        uint256 numShares = value / stockPrice;
        uint256 cost = numShares * stockPrice;

        require(balance >= cost, "Insufficient balance");

        shares[stockId] += numShares;
        balance -= cost;
    }

    function setBalance(uint value) public {
        balance += value;
    }
}
