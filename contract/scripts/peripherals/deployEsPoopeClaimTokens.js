const { deployContract, contractAt, writeTmpAddresses } = require("../shared/helpers")

async function main() {
  await deployContract("MintableBaseToken", ["VestingOption", "ARB:POOPE", 0])
  await deployContract("MintableBaseToken", ["VestingOption", "ARB:PLP", 0])
  await deployContract("MintableBaseToken", ["VestingOption", "AVAX:POOPE", 0])
  await deployContract("MintableBaseToken", ["VestingOption", "AVAX:PLP", 0])
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
