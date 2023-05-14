const { deployContract, contractAt , sendTxn, writeTmpAddresses } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

async function main() {
  const { nativeToken } = tokens

  const orderBook = await deployContract("OrderBook", []);
  // const orderBook = await contractAt("OrderBook", "0xb3E8745f0A0FCa7dCBF74fd05F8bf0363008D686");

  // Arbitrum mainnet addresses
  await sendTxn(orderBook.initialize(
    "0x1e5e40bD56AE9f411f628200606f60dfD486323d", // router
    "0x26e5FbFbfd38a27D5777C9C9CC5543e687E637D8", // vault
    nativeToken.address, // weth
    "0x630D0DCd6db1Bd8BF7b261304A7f508b34f43675", // usdg
    "10000000000000000", // 0.01 AVAX
    expandDecimals(10, 30) // min purchase token amount usd
  ), "orderBook.initialize");

  writeTmpAddresses({
    orderBook: orderBook.address
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
