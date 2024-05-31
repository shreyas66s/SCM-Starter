# Stock Market Exchange DApp
- Welcome to the Stock Market Exchange Decentralized Application (DApp). This project is a simple implementation of a stock market simulation where users can buy shares of different companies using Ethereum. The project consists of a Solidity smart contract and a React front-end that interacts with the contract via MetaMask.

## Overview
This DApp allows users to:

- View their Ethereum account balance: Connected via MetaMask.
- Buy shares of three different companies: Amazon, Tesla, and Nvidia.
- Check their shares in each of the companies.
- Add funds to their account balance within the DApp.
The smart contract manages the logic for buying shares and tracking the number of shares owned by each user. The front-end application interacts with this contract and provides a user-friendly interface for the users.

## Features
Smart Contract: Written in Solidity, deployed on an Ethereum-compatible blockchain.
React Front-End: Uses ethers.js to interact with the smart contract.
MetaMask Integration: Allows users to connect their Ethereum wallets.
Dynamic Updates: Updates user's balance and shares in real-time after transactions.

## Getting Started
Prerequisites
Node.js and npm
MetaMask extension installed in your browser
Ethereum test network (e.g., Ganache, Ropsten)
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
## Authors

Shreyas S  
[shreyas1665@gmail.com]


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
