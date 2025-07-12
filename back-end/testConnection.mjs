import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log("Dernier block Sepolia :", blockNumber);
  } catch (error) {
    console.error("Erreur de connexion au réseau Sepolia :", error);
  }
}

testConnection();
