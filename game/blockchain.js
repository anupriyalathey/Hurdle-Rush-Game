let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address:", await signer.getAddress());

  const balance = await signer.getBalance();
  const convertToEth = 1e18;
  console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
  const runTokenContractAddress = "0x305eA05cDE386C7edb61ee97cef00D8880D1f7e2";
  const runTokenContractAbi = [
    "function mintTokens(address account, uint256 amount) public",
  ];
  const runTokenContract = new ethers.Contract(
    runTokenContractAddress,
    runTokenContractAbi,
    provider
  );
  let convertToWei = 1000000000;
  let amountToClaim = window.totalGweiScore * convertToWei;
  await runTokenContract
    .connect(signer)
    .mintTokens(signer.getAddress(), amountToClaim.toString());
}

async function claimNft() {
  // const nftContractAddress = "0x093298F529abdfCdA505e5C80A896478Dc32841a";
  const nftContractAddress = "0xD722487eFa7c065a363Eec19cc368a60D564416a";

  const mintContractAbi = ["function mint(uint256 amount) public"];
  const nftContract = new ethers.Contract(
    nftContractAddress,
    mintContractAbi,
    provider
  );
  await nftContract.connect(signer).mint(window.totalNFTScore.toString());
}
