const { deployContract, contractAt, writeTmpAddresses } = require("../shared/helpers")

async function main() {
  await deployContract("EsPOOPE", [])
  // await deployContract("PLP", [])
  // await deployContract("MintableBaseToken", ["esPOOPE IOU", "esPOOPE:IOU", 0])
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
