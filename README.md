# Discord Dapp

A simple, educational Web3 chat application inspired by Discord. It demonstrates how to:
- Write a Solidity smart contract that creates text channels and tracks membership via an on-chain mapping (hasJoined)
- Mint an ERC-721 NFT upon joining a channel
- Interact with the contract from a React frontend using ethers.js
- Broadcast and receive messages over a local Socket.IO server

This repository is for learning purposes only and is not production-ready. Use it to study patterns and experiment locally.

## Tech Stack
- Smart contracts: Solidity (OpenZeppelin ERC721)
- Development environment: Hardhat
- Frontend: React (Create React App)
- Messaging: Socket.IO
- Web3 library: ethers.js

## Prerequisites
- Node.js (recommended v18 LTS)
- npm
- MetaMask (to connect a wallet and switch accounts)

## Getting Started (Local)

1) Install dependencies
```
npm install
```

2) Start a local Hardhat node (Terminal A)
```
npx hardhat node
```
This will run a local blockchain at http://127.0.0.1:8545 and print several test accounts.

3) Deploy contracts to localhost (Terminal B)
```
npx hardhat run scripts/deploy.js --network localhost
```
Note the contract address printed after deployment. Ensure it matches the address in `src/config.json` for chainId `31337`. If not, update it accordingly.

4) Start the Socket.IO server (Terminal C)
```
node server.js
```
This serves a simple in-memory message list and emits messages over WebSockets on port 3030.

5) Start the React app (Terminal D)
```
npm start
```
Open http://localhost:3000 in your browser.

6) Connect MetaMask
- Add/Use the Localhost network (127.0.0.1:8545) in MetaMask
- Import one of the private keys from the Hardhat node output if you want to send transactions
- Switch accounts to test membership behavior (messages only display for channels the current account has joined)

## Optional: Run Tests
```
npx hardhat test
```

## Project Behavior
- Channels are created by the contract owner
- Joining a channel calls `mint(id)` with the required Ether cost and sets `hasJoined[id][account] = true`
- The UI will show messages only if the connected account has joined the currently selected channel

## Notes
- This is not production code. It is intentionally simple and meant for education and experimentation.
- You may need to use a compatible Node.js version (e.g., v18) to avoid environment issues with some tooling.

## Learning Resources
- YouTube course that inspired this project:
  - https://www.youtube.com/watch?v=jcgfQEbptdo
- Solidity learning resource:
  - https://cryptozombies.io/en