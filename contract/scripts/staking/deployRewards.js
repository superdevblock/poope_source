const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function main() {
  const wallet = { address: "0x5F799f365Fa8A2B60ac0429C48B153cA5a6f0Cf8" }
  const { AddressZero } = ethers.constants

  const weth = { address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1" }
  const poope = await deployContract("POOPE", []);
  const esPoope = await deployContract("EsPOOPE", []);
  const bnPoope = await deployContract("MintableBaseToken", ["Bonus POOPE", "bnPOOPE", 0]);
  const bnAlp = { address: AddressZero }
  const alp = { address: AddressZero }

  const stakedPoopeTracker = await deployContract("RewardTracker", ["Staked POOPE", "sPOOPE"])
  const stakedPoopeDistributor = await deployContract("RewardDistributor", [esPoope.address, stakedPoopeTracker.address])
  await sendTxn(stakedPoopeTracker.initialize([poope.address, esPoope.address], stakedPoopeDistributor.address), "stakedPoopeTracker.initialize")
  await sendTxn(stakedPoopeDistributor.updateLastDistributionTime(), "stakedPoopeDistributor.updateLastDistributionTime")

  const bonusPoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus POOPE", "sbPOOPE"])
  const bonusPoopeDistributor = await deployContract("BonusDistributor", [bnPoope.address, bonusPoopeTracker.address])
  await sendTxn(bonusPoopeTracker.initialize([stakedPoopeTracker.address], bonusPoopeDistributor.address), "bonusPoopeTracker.initialize")
  await sendTxn(bonusPoopeDistributor.updateLastDistributionTime(), "bonusPoopeDistributor.updateLastDistributionTime")

  const feePoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus + Fee POOPE", "sbfPOOPE"])
  const feePoopeDistributor = await deployContract("RewardDistributor", [weth.address, feePoopeTracker.address])
  await sendTxn(feePoopeTracker.initialize([bonusPoopeTracker.address, bnPoope.address], feePoopeDistributor.address), "feePoopeTracker.initialize")
  await sendTxn(feePoopeDistributor.updateLastDistributionTime(), "feePoopeDistributor.updateLastDistributionTime")

  const feePlpTracker = { address: AddressZero }
  const stakedPlpTracker = { address: AddressZero }

  const stakedAlpTracker = { address: AddressZero }
  const bonusAlpTracker = { address: AddressZero }
  const feeAlpTracker = { address: AddressZero }

  const plpManager = { address: AddressZero }
  const plp = { address: AddressZero }

  await sendTxn(stakedPoopeTracker.setInPrivateTransferMode(true), "stakedPoopeTracker.setInPrivateTransferMode")
  await sendTxn(stakedPoopeTracker.setInPrivateStakingMode(true), "stakedPoopeTracker.setInPrivateStakingMode")
  await sendTxn(bonusPoopeTracker.setInPrivateTransferMode(true), "bonusPoopeTracker.setInPrivateTransferMode")
  await sendTxn(bonusPoopeTracker.setInPrivateStakingMode(true), "bonusPoopeTracker.setInPrivateStakingMode")
  await sendTxn(bonusPoopeTracker.setInPrivateClaimingMode(true), "bonusPoopeTracker.setInPrivateClaimingMode")
  await sendTxn(feePoopeTracker.setInPrivateTransferMode(true), "feePoopeTracker.setInPrivateTransferMode")
  await sendTxn(feePoopeTracker.setInPrivateStakingMode(true), "feePoopeTracker.setInPrivateStakingMode")

  const rewardRouter = await deployContract("RewardRouter", [])

  await sendTxn(rewardRouter.initialize(
    poope.address,
    esPoope.address,
    bnPoope.address,
    bnAlp.address,
    plp.address,
    alp.address,
    stakedPoopeTracker.address,
    bonusPoopeTracker.address,
    feePoopeTracker.address,
    feePlpTracker.address,
    stakedPlpTracker.address,
    stakedAlpTracker.address,
    bonusAlpTracker.address,
    feeAlpTracker.address,
    plpManager.address
  ), "rewardRouter.initialize")

  // allow rewardRouter to stake in stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(rewardRouter.address, true), "stakedPoopeTracker.setHandler(rewardRouter)")
  // allow bonusPoopeTracker to stake stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(bonusPoopeTracker.address, true), "stakedPoopeTracker.setHandler(bonusPoopeTracker)")
  // allow rewardRouter to stake in bonusPoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(rewardRouter.address, true), "bonusPoopeTracker.setHandler(rewardRouter)")
  // allow bonusPoopeTracker to stake feePoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(feePoopeTracker.address, true), "bonusPoopeTracker.setHandler(feePoopeTracker)")
  await sendTxn(bonusPoopeDistributor.setBonusMultiplier(10000), "bonusPoopeDistributor.setBonusMultiplier")
  // allow rewardRouter to stake in feePoopeTracker
  await sendTxn(feePoopeTracker.setHandler(rewardRouter.address, true), "feePoopeTracker.setHandler(rewardRouter)")
  // allow stakedPoopeTracker to stake esPoope
  await sendTxn(esPoope.setHandler(stakedPoopeTracker.address, true), "esPoope.setHandler(stakedPoopeTracker)")
  // allow feePoopeTracker to stake bnPoope
  await sendTxn(bnPoope.setHandler(feePoopeTracker.address, true), "bnPoope.setHandler(feePoopeTracker")
  // allow rewardRouter to burn bnPoope
  await sendTxn(bnPoope.setMinter(rewardRouter.address, true), "bnPoope.setMinter(rewardRouter")

  // mint esPoope for distributors
  await sendTxn(esPoope.setMinter(wallet.address, true), "esPoope.setMinter(wallet)")
  await sendTxn(esPoope.mint(stakedPoopeDistributor.address, expandDecimals(50000 * 12, 18)), "esPoope.mint(stakedPoopeDistributor") // ~50,000 POOPE per month
  await sendTxn(stakedPoopeDistributor.setTokensPerInterval("20667989410000000"), "stakedPoopeDistributor.setTokensPerInterval") // 0.02066798941 esPoope per second

  // mint bnPoope for distributor
  await sendTxn(bnPoope.setMinter(wallet.address, true), "bnPoope.setMinter")
  await sendTxn(bnPoope.mint(bonusPoopeDistributor.address, expandDecimals(15 * 1000 * 1000, 18)), "bnPoope.mint(bonusPoopeDistributor)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
