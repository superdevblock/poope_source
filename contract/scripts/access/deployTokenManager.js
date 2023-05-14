const { deployContract, contractAt, writeTmpAddresses, sendTxn } = require("../shared/helpers")

async function main() {
  const tokenManager = await deployContract("TokenManager", [4], "TokenManager")

  const signers = [
    "0x5d2E4189d0b273d7E7C289311978a0183B96C404",
    "0x2BbC2Bf8D640Ca258f20DF5A422cBbAEC372419f",
    "0x59790E88301b2376d5c3C421D6B4b6D640D18E8d",
    "0x5d2E4189d0b273d7E7C289311978a0183B96C404"
  ]

  await sendTxn(tokenManager.initialize(signers), "tokenManager.initialize")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
