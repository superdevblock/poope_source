const { deployContract, contractAt, sendTxn, readTmpAddresses } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('../core/tokens')[network];

async function main() {
  const {
    nativeToken
  } = tokens

  const weth = await contractAt("Token", nativeToken.address)
  const poope = await contractAt("POOPE", "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a")
  const esPoope = await contractAt("EsPOOPE", "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA")
  const bnPoope = await contractAt("MintableBaseToken", "0x35247165119B69A40edD5304969560D0ef486921")

  const stakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const bonusPoopeTracker = await contractAt("RewardTracker", "0x4d268a7d4C16ceB5a606c173Bd974984343fea13")
  const feePoopeTracker = await contractAt("RewardTracker", "0xd2D1162512F927a7e282Ef43a362659E4F2a728F")

  const feePlpTracker = await contractAt("RewardTracker", "0x4e971a87900b931fF39d1Aad67697F49835400b6")
  const stakedPlpTracker = await contractAt("RewardTracker", "0x1aDDD80E6039594eE970E5872D247bf0414C8903")

  const plp = await contractAt("PLP", "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258")
  const plpManager = await contractAt("PlpManager", "0x321F653eED006AD1C29D174e17d96351BDe22649")

  console.log("plpManager", plpManager.address)

  const rewardRouter = await deployContract("RewardRouter", [])

  await sendTxn(rewardRouter.initialize(
    weth.address,
    poope.address,
    esPoope.address,
    bnPoope.address,
    plp.address,
    stakedPoopeTracker.address,
    bonusPoopeTracker.address,
    feePoopeTracker.address,
    feePlpTracker.address,
    stakedPlpTracker.address,
    plpManager.address
  ), "rewardRouter.initialize")

  // allow rewardRouter to stake in stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(rewardRouter.address, true), "stakedPoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in bonusPoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(rewardRouter.address, true), "bonusPoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in feePoopeTracker
  await sendTxn(feePoopeTracker.setHandler(rewardRouter.address, true), "feePoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to burn bnPoope
  await sendTxn(bnPoope.setMinter(rewardRouter.address, true), "bnPoope.setMinter(rewardRouter)")

  // allow rewardRouter to mint in plpManager
  await sendTxn(plpManager.setHandler(rewardRouter.address, true), "plpManager.setHandler(rewardRouter)")
  // allow rewardRouter to stake in feePlpTracker
  await sendTxn(feePlpTracker.setHandler(rewardRouter.address, true), "feePlpTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in stakedPlpTracker
  await sendTxn(stakedPlpTracker.setHandler(rewardRouter.address, true), "stakedPlpTracker.setHandler(rewardRouter)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
