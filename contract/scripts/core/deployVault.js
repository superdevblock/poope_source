const { deployContract, contractAt , sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units")
const { errors } = require("../../test/core/Vault/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

async function main() {
  const { nativeToken } = tokens

  // const vault = await deployContract("Vault", [])
  const vault = await contractAt("Vault", "0x26e5FbFbfd38a27D5777C9C9CC5543e687E637D8")
  // const usdg = await deployContract("USDG", [vault.address])
  const usdg = await contractAt("USDG", "0x630D0DCd6db1Bd8BF7b261304A7f508b34f43675")
  // const router = await deployContract("Router", [vault.address, usdg.address, nativeToken.address])
  const router = await contractAt("Router", "0x1e5e40bD56AE9f411f628200606f60dfD486323d")
  // const secondaryPriceFeed = await deployContract("FastPriceFeed", [5 * 60])

  // const vaultPriceFeed = await deployContract("VaultPriceFeed", [])
  const vaultPriceFeed = await contractAt("VaultPriceFeed", "0x25EB35a6E2DE9C619366f15c0498517Fa6a500F1")

  // await sendTxn(vaultPriceFeed.setMaxStrictPriceDeviation(expandDecimals(1, 28)), "vaultPriceFeed.setMaxStrictPriceDeviation") // 0.05 USD
  // await sendTxn(vaultPriceFeed.setPriceSampleSpace(1), "vaultPriceFeed.setPriceSampleSpace")
  // await sendTxn(vaultPriceFeed.setIsAmmEnabled(false), "vaultPriceFeed.setIsAmmEnabled")

  const plp = await deployContract("PLP", [])
  // const plp = await contractAt("PLP", "0x3712329C2bb19Bb8FFf501fdCa96c8CFba010348")
  await sendTxn(plp.setInPrivateTransferMode(true), "plp.setInPrivateTransferMode")

  const plpManager = await deployContract("PlpManager", [vault.address, usdg.address, plp.address, 15 * 60])
  // const plpManager = await contractAt("PlpManager", "0xDe25a87529bcD43465086b6c8EB77e9B486f29Ee")

  await sendTxn(plpManager.setInPrivateMode(true), "plpManager.setInPrivateMode")
  await sendTxn(plp.setMinter(plpManager.address, true), "plp.setMinter")
  await sendTxn(usdg.addVault(plpManager.address), "usdg.addVault(plpManager)")

  await sendTxn(vault.initialize(
    router.address, // router
    usdg.address, // usdg
    vaultPriceFeed.address, // priceFeed
    toUsd(2), // liquidationFeeUsd
    100, // fundingRateFactor
    100 // stableFundingRateFactor
  ), "vault.initialize")

  await sendTxn(vault.setFundingRate(60 * 60, 100, 100), "vault.setFundingRate")

  await sendTxn(vault.setInManagerMode(true), "vault.setInManagerMode")
  await sendTxn(vault.setManager(plpManager.address, true), "vault.setManager")

  await sendTxn(vault.setFees(
    10, // _taxBasisPoints
    5, // _stableTaxBasisPoints
    20, // _mintBurnFeeBasisPoints
    20, // _swapFeeBasisPoints
    1, // _stableSwapFeeBasisPoints
    10, // _marginFeeBasisPoints
    toUsd(2), // _liquidationFeeUsd
    24 * 60 * 60, // _minProfitTime
    true // _hasDynamicFees
  ), "vault.setFees")

  const vaultErrorController = await deployContract("VaultErrorController", [])
  // const vaultErrorController = await contractAt("VaultErrorController", "0x72d289b84cdF6642Cb2E952c7F86cb3228a76A8e")
  await sendTxn(vault.setErrorController(vaultErrorController.address), "vault.setErrorController")
  await sendTxn(vaultErrorController.setErrors(vault.address, errors), "vaultErrorController.setErrors")

  const vaultUtils = await deployContract("VaultUtils", [vault.address])
  // const vaultUtils = await contractAt("VaultUtils", "0xAb7754713fbCE1335e2536E46f63196136ca9E98")
  await sendTxn(vault.setVaultUtils(vaultUtils.address), "vault.setVaultUtils")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
