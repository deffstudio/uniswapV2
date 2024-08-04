const ethers = require("ethers");

const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiList");

// Standard Provider
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-mainnet.infura.io/v3/a00aaec7f9e14937b47b04db63def3f1"
);

// Connect to Factory
const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);

// Connect to Router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

// Call the Blockchain
const getPrices = async (amountInHuman) => {
  // Convert the amount in human readable format
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();

  // Get Amounts out
  const amountsOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  // Convert amount out to decimal
  const contractToken2 = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals2 = await contractToken2.decimals();

  console.log(decimals2);

  // Convert amounts out to human readable format
  const amountOutHuman = ethers.utils.formatUnits(
    amountsOut[1].toString(),
    decimals2
  );

  console.log(amountIn);
  console.log("Amount Out Human: ", amountOutHuman);
  console.log("Amounts Out: ", amountsOut);
};

const amountInHuman = "500";
getPrices(amountInHuman);

//console.log(contractRouter);
