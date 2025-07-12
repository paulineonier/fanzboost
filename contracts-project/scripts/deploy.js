async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
    const simpleNFT = await SimpleNFT.deploy();
  
    await simpleNFT.deployed();
  
    console.log("SimpleNFT deployed to:", simpleNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  