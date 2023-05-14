const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function main() {
  const rewardRouter = await contractAt("RewardRouter", "0xEa7fCb85802713Cb03291311C66d6012b23402ea")
  const bnPoope = await contractAt("MintableBaseToken", "0x35247165119B69A40edD5304969560D0ef486921")
  const plpManager = await contractAt("PlpManager", "0x91425Ac4431d068980d497924DD540Ae274f3270")

  const stakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const bonusPoopeTracker = await contractAt("RewardTracker", "0x4d268a7d4C16ceB5a606c173Bd974984343fea13")
  const feePoopeTracker = await contractAt("RewardTracker", "0xd2D1162512F927a7e282Ef43a362659E4F2a728F")

  const feePlpTracker = await contractAt("RewardTracker", "0x4e971a87900b931fF39d1Aad67697F49835400b6")
  const stakedPlpTracker = await contractAt("RewardTracker", "0x1aDDD80E6039594eE970E5872D247bf0414C8903")

  // allow rewardRouter to stake in stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(rewardRouter.address, false), "stakedPoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in bonusPoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(rewardRouter.address, false), "bonusPoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in feePoopeTracker
  await sendTxn(feePoopeTracker.setHandler(rewardRouter.address, false), "feePoopeTracker.setHandler(rewardRouter)")
  // allow rewardRouter to burn bnPoope
  await sendTxn(bnPoope.setMinter(rewardRouter.address, false), "bnPoope.setMinter(rewardRouter)")

  // allow rewardRouter to mint in plpManager
  await sendTxn(plpManager.setHandler(rewardRouter.address, false), "plpManager.setHandler(rewardRouter)")
  // allow rewardRouter to stake in feePlpTracker
  await sendTxn(feePlpTracker.setHandler(rewardRouter.address, false), "feePlpTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in stakedPlpTracker
  await sendTxn(stakedPlpTracker.setHandler(rewardRouter.address, false), "stakedPlpTracker.setHandler(rewardRouter)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
