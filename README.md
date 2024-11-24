# 🎓 Build Your Own Certification System using Soulbound Tokens on Kalp Blockchain

## On-Chain Certification Challenge

---

## What is this challenge about?

This challenge involves developing a **certification system** using **Soulbound Tokens (SBTs)** on the **Kalp blockchain**. You will:

- Create a **smart contract** in **Go** that manages non-transferable certificates as Soulbound Tokens
- Issue unique certifications that cannot be transferred between addresses
- Query and verify certificates directly on the blockchain

This simulates real-world scenarios where organizations need to issue verifiable credentials that should remain permanently associated with the recipient, such as academic degrees, professional certifications, or achievement badges.

## What will you learn?

**By participating in this challenge, you will:**

- Understand the implementation of **Soulbound Tokens** (Non-transferable NFTs)
- Learn how to develop and deploy smart contracts on the **Kalp blockchain**
- Gain hands-on experience with the **Go** programming language
- Master state management in blockchain applications
- Learn about composite keys and efficient data storage patterns
- Understand authorization and access control in smart contracts
- Enhance your skills in blockchain development and decentralized applications (**dApps**)

---

## Checkpoint 0: 📦 Installation

#### Prerequisites:

- **Go** version `>=1.19` but `<1.20`
- **Kalp SDK** for smart contract development

### Setting up the Project

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   ```

2. **Navigate to the project directory:**
   ```sh
   cd sbt-certification
   ```

3. **Install dependencies:**
   ```sh
   go mod tidy
   ```

---

## Checkpoint 1: 🏗 Smart Contract Overview

The Soulbound Token certification contract includes several key components:

### 1. Certificate Metadata Structure
```go
type SBTMetadata struct {
    Description string `json:"description"`
}
```

### 2. Soulbound Token Structure
```go
type SoulboundToken struct {
    Owner    string `json:"owner"`
    TokenID  string `json:"tokenID"`
    Metadata string `json:"metadata"`
}
```

### Core Functions:

#### Initialize Contract
- Sets up the contract with initial metadata
- Ensures single initialization
- Stores metadata on-chain

#### Mint Certificate (SBT)
- Issues a new certificate to a recipient
- Generates unique TokenID using UUID
- Ensures one certificate per address
- Stores certificate data with composite keys

#### Query Functions
- Retrieve certificate by owner and tokenID
- Get certificate by owner address
- Verify certificate authenticity

#### Transfer Prevention
- Explicitly blocks transfer attempts
- Ensures certificates remain soulbound

---

## Checkpoint 2: 📀 Key Features

### 1. Soulbound Nature
- Certificates are non-transferable by design
- Permanent association with the recipient's address

### 2. Unique Identification
- Each certificate has a unique UUID
- Prevents duplicate issuance to the same address

### 3. Efficient Storage
- Uses composite keys for optimized queries
- Maintains owner-to-certificate mappings

### 4. Metadata Management
- Stores certificate metadata on-chain
- Supports descriptive information about certifications

---

## Checkpoint 3: 🔧 Function Details

### 1. Initialize
```go
func (s *SmartContract) Initialize(sdk kalpsdk.TransactionContextInterface, metadata SBTMetadata) error
```
- Sets up the contract with certification metadata
- Can only be called once

### 2. Mint Certificate
```go
func (s *SmartContract) MintSBT(sdk kalpsdk.TransactionContextInterface) error
```
- Issues a new certificate to the caller
- Generates unique TokenID
- Prevents duplicate issuance

### 3. Query Certificate
```go
func (s *SmartContract) QuerySBT(sdk kalpsdk.TransactionContextInterface, owner string, tokenID string) (*SoulboundToken, error)
```
- Retrieves certificate details
- Returns owner and metadata information

### 4. Get Certificate by Owner
```go
func (s *SmartContract) GetSBTByOwner(sdk kalpsdk.TransactionContextInterface, owner string) (*SoulboundToken, error)
```
- Finds certificate associated with an address
- Returns full certificate details

---

## Checkpoint 4: 🚀 Deployment Steps

1. **Prepare the Contract:**
   - Compile the Go code
   - Package required files

2. **Deploy using Kalp Studio:**
   - Upload contract package
   - Set initial metadata
   - Generate API endpoints

3. **Initialize Contract:**
   - Set certification parameters
   - Verify deployment

---

## Best Practices

1. **Security Considerations:**
   - Implement proper access control
   - Validate all inputs
   - Handle errors gracefully

2. **Storage Optimization:**
   - Use composite keys effectively
   - Minimize on-chain data
   - Follow proper state management patterns

3. **Testing:**
   - Unit test all functions
   - Verify soulbound properties
   - Test edge cases

---

## Common Use Cases

1. **Academic Credentials**
   - University degrees
   - Course completions
   - Training certificates

2. **Professional Certifications**
   - Industry qualifications
   - Skills attestations
   - License verifications

3. **Achievement Recognition**
   - Awards
   - Badges
   - Accomplishments

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

[Your chosen license]

---

## Support

For questions and support:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Get started building your certification system today!** 🚀

