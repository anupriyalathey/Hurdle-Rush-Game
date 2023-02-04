const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("RunnerCollection");
  const greeter = await Greeter.deploy(
    "Runner",
    "RUN",
    "https://ipfs.io/ipfs/QmNTs5td3DD7T7gFAAQqV5SG9ViUmk2aicM9PYNHJStp2T"
  );

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  await greeter.mint(10);
  console.log("10 nfts minted");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
