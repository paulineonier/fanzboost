const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL); // ex: Infura, Alchemy, ou autre
const wallet = new ethers.Wallet(process.env.BACKEND_PRIVATE_KEY, provider);

// Adresse de ton smart contract NFT
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

// ABI minimal avec la fonction mint (à adapter à ton contrat)
const contractABI = [
  "function mint(address to) public returns (uint256)"
];

// Instance du contrat
const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Mint un NFT à une adresse utilisateur
 * @param {string} toAddress - Adresse Ethereum du bénéficiaire
 * @returns {Promise<string>} - ID du token minté (ex: tokenId)
 */
async function mintNFT(toAddress) {
  try {
    const tx = await nftContract.mint(toAddress);
    console.log('Transaction envoyée:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction minée:', receipt.transactionHash);

    const mintedEvent = receipt.events.find(event => event.event === 'Minted');
    const tokenId = mintedEvent ? mintedEvent.args[0].toString() : null;

    return tokenId;
  } catch (error) {
    console.error('Erreur mintNFT:', error);
    throw error;
  }
}

module.exports = { mintNFT };
