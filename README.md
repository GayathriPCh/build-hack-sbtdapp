# 🖼️ NFT Minting Platform on the Kalp Blockchain

Welcome to the NFT Minting Platform project! This platform allows users to mint and manage Non-Fungible Tokens (NFTs) on the Kalp blockchain. The project includes a smart contract written in Go and a frontend application built with React and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [What You Will Learn](#what-you-will-learn)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Smart Contract Setup](#smart-contract-setup)
  - [Frontend Setup](#frontend-setup)
- [Smart Contract Development](#smart-contract-development)
- [Deploying the Smart Contract](#deploying-the-smart-contract)
- [Interacting with the Smart Contract](#interacting-with-the-smart-contract)
- [Frontend Development](#frontend-development)
  - [Implementing the Kalp API Hook](#implementing-the-kalp-api-hook)
  - [Creating Components](#creating-components)
  - [Updating the Main Page](#updating-the-main-page)
  - [Configuring the Frontend](#configuring-the-frontend)
  - [Running the Frontend Application](#running-the-frontend-application)
- [Additional Resources](#additional-resources)
- [License](#license)

## Introduction

This project demonstrates how to build an NFT minting platform using the Kalp blockchain. You will:

- Develop a smart contract in Go that allows users to mint unique NFTs.
- Create a frontend application with React and TypeScript to interact with the smart contract via Kalp Studio API endpoints.

## What You Will Learn

By working on this project, you will:

- Gain hands-on experience with the Go programming language
- Understand how to implement NFTs similar to ERC-721 standards
- Learn to develop and deploy smart contracts on the Kalp blockchain
- Enhance skills in blockchain development and decentralized applications (dApps)
- Build interactive frontend applications with React and TypeScript
- Learn to interact with blockchain smart contracts from a frontend application
- Explore concepts like token minting, ownership management, metadata handling, API integration, and state management in React

## Prerequisites

Before you begin, ensure you have the following installed:

- Go (version >=1.19 but <1.20): [Download Go](https://golang.org/dl/)
- Node.js (version >=14.x) and npm (version >=6.x): [Download Node.js and npm](https://nodejs.org/)

## Project Setup

### Smart Contract Setup

1. Create a new directory for your project:
```bash
mkdir kalp-nft-platform
cd kalp-nft-platform
```

2. Initialize a Go module:
```bash
go mod init github.com/yourusername/kalp-nft-platform
```

3. Create the smart contract file:
```bash
touch nft.go
```

Your folder structure should look like:
```
kalp-nft-platform
├── nft.go        # Your NFT smart contract file
└── go.mod
```

### Frontend Setup

1. Create a new React application:
```bash
npx create-next-app@latest frontend --typescript
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

Your folder structure should now look like:
```
kalp-nft-platform
├── nft.go
├── go.mod
└── frontend
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── public
    └── src
        ├── pages
        ├── components
        └── hooks
```

## Smart Contract Development

Here's the basic structure of your NFT smart contract:

```go
package main

import (
    "encoding/json"
    "fmt"
    kalpsdk "github.com/KalpStudio/kalp-sdk-go/sdk"
)

type SmartContract struct {
}

type NFT struct {
    TokenID  string `json:"tokenId"`
    Owner    string `json:"owner"`
    Metadata string `json:"metadata"`
}

// Contract functions will be implemented here
```

For the complete smart contract implementation, including all functions (Initialize, Mint, Transfer, ReadNFT, GetNFTsByOwner), refer to the `nft.go` file in the repository.

## Deploying the Smart Contract

1. Sign Up and Log In to Kalp Studio Platform
   - Visit Kalp Studio and create an account

2. Package Your Smart Contract
```bash
mkdir smart-contract
mv nft.go smart-contract/
cd smart-contract
go mod init nft
go mod tidy
cd ..
zip -r smart-contract.zip smart-contract
```

3. Deploy Your Smart Contract
   - Access the Kalp Studio Dashboard
   - Go to Kalp Instant Deployer
   - Click on "Create New" Smart Contract
   - Enter the details:
     - Name: e.g., "NFTContract"
     - Category: Choose an appropriate category
     - Description: Optional
   - Upload your smart-contract.zip file

4. Generate API Endpoints
   - After deploying, Kalp Studio will provide API endpoints for each function
   - Example: `https://gateway-api.kalp.studio/v1/contract/kalp/invoke/YourContractID/Mint`

5. Generate Your API Key
   - In Kalp Studio, navigate to the API key generation section
   - Generate a new API key to authenticate your API requests

## Interacting with the Smart Contract

Example API endpoints and request bodies:

### 1. Mint an NFT
```http
POST https://gateway-api.kalp.studio/v1/contract/kalp/invoke/YourContractID/Mint
Content-Type: application/json

{
  "network": "TESTNET",
  "blockchain": "KALP",
  "walletAddress": "your-wallet-address",
  "args": {
    "tokenId": "token1",
    "metadata": "https://example.com/metadata/token1.json"
  }
}
```

### 2. Transfer an NFT
```http
POST https://gateway-api.kalp.studio/v1/contract/kalp/invoke/YourContractID/Transfer
Content-Type: application/json

{
  "network": "TESTNET",
  "blockchain": "KALP",
  "walletAddress": "your-wallet-address",
  "args": {
    "tokenId": "token1",
    "newOwner": "recipient-wallet-address"
  }
}
```

### 3. Read an NFT
```http
GET https://gateway-api.kalp.studio/v1/contract/kalp/query/YourContractID/ReadNFT?tokenId=token1
```

### 4. Get NFTs by Owner
```http
GET https://gateway-api.kalp.studio/v1/contract/kalp/query/YourContractID/GetNFTsByOwner?owner=your-wallet-address
```

## Frontend Development

### Implementing the Kalp API Hook

Create the hook in `src/hooks/useKalpApi.ts`. The hook provides functions to interact with the smart contract:
- `mint`: Mint new NFTs
- `transfer`: Transfer NFTs between addresses
- `readNFT`: Read NFT data
- `getNFTsByOwner`: Get all NFTs owned by an address

### Creating Components

Create the following components in the `src/components` directory:
- `MintNFT.tsx`: Component for minting new NFTs
- `TransferNFT.tsx`: Component for transferring NFTs
- `ViewNFT.tsx`: Component for viewing NFT details
- `NFTsByOwner.tsx`: Component for listing NFTs by owner

### Configuring the Frontend

1. Create a `.env.local` file in your frontend project root:
```bash
NEXT_PUBLIC_API_KEY=your-kalp-api-key
```

2. Update API endpoints in `useKalpApi.ts` with your actual endpoints
3. Update the wallet address in the `callApi` function

### Running the Frontend Application

1. Start the development server:
```bash
npm run dev
```

2. Open the application in your browser:
   - Navigate to `http://localhost:3000`

## Additional Resources

- [Kalp SDK Documentation](https://docs.kalp.studio)
- [Go Programming Language](https://golang.org)
- [React Documentation](https://reactjs.org)
- [TypeScript Documentation](https://typescriptlang.org)

## License

This project is open-source and available under the MIT License.

---

Feel free to explore further functionalities and enhance your smart contract and frontend application. Consider adding features like user authentication, displaying NFT images from metadata, or integrating with wallets for a more comprehensive dApp experience. Good luck, and happy coding!

