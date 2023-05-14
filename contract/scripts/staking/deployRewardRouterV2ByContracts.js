const { deployContract, contractAt, sendTxn, writeTmpAddresses } = require("../shared/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('../core/tokens')[network];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const { nativeToken } = tokens

  const vestingDuration = 365 * 24 * 60 * 60

  const plpManager = await contractAt("PlpManager", "0x3a417b2949d59B129e5C6c0A52114335C780B9AE")
  const plp = await contractAt("PLP", "0xA63FbC76dDaf2F800B3699a4a46C5f260E04050C")

  const poope = await contractAt("Poopeespade", "0x39E1Da9a034Fd5ADba01C7F6cFA8B5dE16dD908c");
  const esPoope = await contractAt("EsPOOPE", "0x6CdEf99C74CcF3FA65211fF547Be5dDB4A73770C");
  // const bnPoope = await deployContract("MintableBaseToken", ["Bonus POOPE", "bnPOOPE", 0]);
  const bnPoope = await contractAt("MintableBaseToken", "0x6e29e6db1Ea778fCC17BA575C8fB22A4dfeAE08f");


  // await sendTxn(esPoope.setInPrivateTransferMode(true), "esPoope.setInPrivateTransferMode")
  // await sendTxn(plp.setInPrivateTransferMode(true), "plp.setInPrivateTransferMode")

  // const stakedPoopeTracker = await deployContract("RewardTracker", ["Staked POOPE", "sPOOPE"])
  const stakedPoopeTracker = await contractAt("RewardTracker", "0x48d7f4529f6149c5EB96AeF38534b90AD7562b4d")
  // const stakedPoopeDistributor = await deployContract("RewardDistributor", [esPoope.address, stakedPoopeTracker.address])
  const stakedPoopeDistributor = await contractAt("RewardDistributor", "0x4e11F35A9c226be709078787cC44375FD7c22424")

  // await sendTxn(stakedPoopeTracker.initialize([poope.address, esPoope.address], stakedPoopeDistributor.address), "stakedPoopeTracker.initialize")
  // await sendTxn(stakedPoopeDistributor.updateLastDistributionTime(), "stakedPoopeDistributor.updateLastDistributionTime")

  // const bonusPoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus POOPE", "sbPOOPE"])
  const bonusPoopeTracker = await contractAt("RewardTracker", "0xC5fcC14560781C4c9FD55d7466d781539177A3a4")

  // const bonusPoopeDistributor = await deployContract("BonusDistributor", [bnPoope.address, bonusPoopeTracker.address])
  const bonusPoopeDistributor = await contractAt("BonusDistributor", "0x667Af1B5Cb7b86107B0B9BEa3AE3C44506E1d8Ce")

  // await sendTxn(bonusPoopeTracker.initialize([stakedPoopeTracker.address], bonusPoopeDistributor.address), "bonusPoopeTracker.initialize")
  // await sendTxn(bonusPoopeDistributor.updateLastDistributionTime(), "bonusPoopeDistributor.updateLastDistributionTime")

  // const feePoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus + Fee POOPE", "sbfPOOPE"])
  const feePoopeTracker = await contractAt("RewardTracker", "0xb31018C29500a565e511a0800dA87e1457CdE9b1")

  // const feePoopeDistributor = await deployContract("RewardDistributor", [nativeToken.address, feePoopeTracker.address])
  const feePoopeDistributor = await contractAt("RewardDistributor", "0xd04EA0a03850786b7d057Ac668A3ab9B3E00199D")

  // await sendTxn(feePoopeTracker.initialize([bonusPoopeTracker.address, bnPoope.address], feePoopeDistributor.address), "feePoopeTracker.initialize")
  // await sendTxn(feePoopeDistributor.updateLastDistributionTime(), "feePoopeDistributor.updateLastDistributionTime")

  // const feePlpTracker = await deployContract("RewardTracker", ["Fee PLP", "fPLP"])
  const feePlpTracker = await contractAt("RewardTracker", "0x82b84dc1A46D43747496E62BBEE2c70Ef8EE4EAD")

  // const feePlpDistributor = await deployContract("RewardDistributor", [nativeToken.address, feePlpTracker.address])
  const feePlpDistributor = await contractAt("RewardDistributor", "0x6445024BFA34a160714d0099D7F24f0b19Bb3C0c")

  // await sendTxn(feePlpTracker.initialize([plp.address], feePlpDistributor.address), "feePlpTracker.initialize")
  // await sendTxn(feePlpDistributor.updateLastDistributionTime(), "feePlpDistributor.updateLastDistributionTime")

  // const stakedPlpTracker = await deployContract("RewardTracker", ["Fee + Staked PLP", "fsPLP"])
  const stakedPlpTracker = await contractAt("RewardTracker", "0x8b498C45465f4a7e9CEc0D12Aa6a695A6b563A34")

  // const stakedPlpDistributor = await deployContract("RewardDistributor", [esPoope.address, stakedPlpTracker.address])
  const stakedPlpDistributor = await contractAt("RewardDistributor", "0x7ed80C511359db0E34e2FbF14aB12Ee9AfAB0Baa")
  // await sendTxn(stakedPlpTracker.initialize([feePlpTracker.address], stakedPlpDistributor.address), "stakedPlpTracker.initialize")
  // await sendTxn(stakedPlpDistributor.updateLastDistributionTime(), "stakedPlpDistributor.updateLastDistributionTime")

  // await sendTxn(stakedPoopeTracker.setInPrivateTransferMode(true), "stakedPoopeTracker.setInPrivateTransferMode")
  // await sendTxn(stakedPoopeTracker.setInPrivateStakingMode(true), "stakedPoopeTracker.setInPrivateStakingMode")
  // await sendTxn(bonusPoopeTracker.setInPrivateTransferMode(true), "bonusPoopeTracker.setInPrivateTransferMode")
  // await sendTxn(bonusPoopeTracker.setInPrivateStakingMode(true), "bonusPoopeTracker.setInPrivateStakingMode")
  // await sendTxn(bonusPoopeTracker.setInPrivateClaimingMode(true), "bonusPoopeTracker.setInPrivateClaimingMode")
  // await sendTxn(feePoopeTracker.setInPrivateTransferMode(true), "feePoopeTracker.setInPrivateTransferMode")
  // await sendTxn(feePoopeTracker.setInPrivateStakingMode(true), "feePoopeTracker.setInPrivateStakingMode")

  // await sendTxn(feePlpTracker.setInPrivateTransferMode(true), "feePlpTracker.setInPrivateTransferMode")
  // await sendTxn(feePlpTracker.setInPrivateStakingMode(true), "feePlpTracker.setInPrivateStakingMode")
  // await sendTxn(stakedPlpTracker.setInPrivateTransferMode(true), "stakedPlpTracker.setInPrivateTransferMode")
  // await sendTxn(stakedPlpTracker.setInPrivateStakingMode(true), "stakedPlpTracker.setInPrivateStakingMode")

  // const poopeVester = await deployContract("Vester", [
  //   "Vested POOPE", // _name
  //   "vPOOPE", // _symbol
  //   vestingDuration, // _vestingDuration
  //   esPoope.address, // _esToken
  //   feePoopeTracker.address, // _pairToken
  //   poope.address, // _claimableToken
  //   stakedPoopeTracker.address, // _rewardTracker
  // ])
  const poopeVester = await contractAt("Vester", "0x957C9a17fc5A5Fda190D1Bc4Fc1AF2B6282C2743")
  //
  // const plpVester = await deployContract("Vester", [
  //   "Vested PLP", // _name
  //   "vPLP", // _symbol
  //   vestingDuration, // _vestingDuration
  //   esPoope.address, // _esToken
  //   stakedPlpTracker.address, // _pairToken
  //   poope.address, // _claimableToken
  //   stakedPlpTracker.address, // _rewardTracker
  // ])
  const plpVester = await contractAt("Vester", "0xcf920DC4df556267A82783c4647cbe9Ce55cB1A2")
  // const rewardRouter = await deployContract("RewardRouterV2", [])
  const rewardRouter = await contractAt("RewardRouterV2", "0x0AB63435EbA15CCedb44d86Cf3e2f1d8DBeB9e08")

  // await sendTxn(rewardRouter.initialize(
  //   nativeToken.address,
  //   poope.address,
  //   esPoope.address,
  //   bnPoope.address,
  //   plp.address,
  //   stakedPoopeTracker.address,
  //   bonusPoopeTracker.address,
  //   feePoopeTracker.address,
  //   feePlpTracker.address,
  //   stakedPlpTracker.address,
  //   plpManager.address,
  //   poopeVester.address,
  //   plpVester.address
  // ), "rewardRouter.initialize")

  await sendTxn(plpManager.setHandler(rewardRouter.address, true), "plpManager.setHandler(rewardRouter)")
  await sleep(15000)
  // allow rewardRouter to stake in stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(rewardRouter.address, true), "stakedPoopeTracker.setHandler(rewardRouter)")
  await sleep(15000)
  // allow bonusPoopeTracker to stake stakedPoopeTracker
  await sendTxn(stakedPoopeTracker.setHandler(bonusPoopeTracker.address, true), "stakedPoopeTracker.setHandler(bonusPoopeTracker)")
  await sleep(15000)
  // allow rewardRouter to stake in bonusPoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(rewardRouter.address, true), "bonusPoopeTracker.setHandler(rewardRouter)")
  await sleep(15000)
  // allow bonusPoopeTracker to stake feePoopeTracker
  await sendTxn(bonusPoopeTracker.setHandler(feePoopeTracker.address, true), "bonusPoopeTracker.setHandler(feePoopeTracker)")
  await sleep(15000)
  await sendTxn(bonusPoopeDistributor.setBonusMultiplier(10000), "bonusPoopeDistributor.setBonusMultiplier")
  await sleep(15000)
  // allow rewardRouter to stake in feePoopeTracker
  await sendTxn(feePoopeTracker.setHandler(rewardRouter.address, true), "feePoopeTracker.setHandler(rewardRouter)")
  await sleep(15000)
  // allow stakedPoopeTracker to stake esPoope
  await sendTxn(esPoope.setHandler(stakedPoopeTracker.address, true), "esPoope.setHandler(stakedPoopeTracker)")
  await sleep(15000)
  // allow feePoopeTracker to stake bnPoope
  await sendTxn(bnPoope.setHandler(feePoopeTracker.address, true), "bnPoope.setHandler(feePoopeTracker")
  await sleep(15000)
  // allow rewardRouter to burn bnPoope
  await sendTxn(bnPoope.setMinter(rewardRouter.address, true), "bnPoope.setMinter(rewardRouter")
  await sleep(15000)

  // allow stakedPlpTracker to stake feePlpTracker
  await sendTxn(feePlpTracker.setHandler(stakedPlpTracker.address, true), "feePlpTracker.setHandler(stakedPlpTracker)")
  await sleep(15000)
  // allow feePlpTracker to stake plp
  await sendTxn(plp.setHandler(feePlpTracker.address, true), "plp.setHandler(feePlpTracker)")
  await sleep(15000)

  // allow rewardRouter to stake in feePlpTracker
  await sendTxn(feePlpTracker.setHandler(rewardRouter.address, true), "feePlpTracker.setHandler(rewardRouter)")
  await sleep(15000)
  // allow rewardRouter to stake in stakedPlpTracker
  await sendTxn(stakedPlpTracker.setHandler(rewardRouter.address, true), "stakedPlpTracker.setHandler(rewardRouter)")
  await sleep(15000)

  await sendTxn(esPoope.setHandler(rewardRouter.address, true), "esPoope.setHandler(rewardRouter)")
  await sleep(15000)
  await sendTxn(esPoope.setHandler(stakedPoopeDistributor.address, true), "esPoope.setHandler(stakedPoopeDistributor)")
  await sleep(15000)
  await sendTxn(esPoope.setHandler(stakedPlpDistributor.address, true), "esPoope.setHandler(stakedPlpDistributor)")
  await sleep(15000)
  await sendTxn(esPoope.setHandler(stakedPlpTracker.address, true), "esPoope.setHandler(stakedPlpTracker)")
  await sleep(15000)
  await sendTxn(esPoope.setHandler(poopeVester.address, true), "esPoope.setHandler(poopeVester)")
  await sleep(15000)
  await sendTxn(esPoope.setHandler(plpVester.address, true), "esPoope.setHandler(plpVester)")
  await sleep(15000)

  await sendTxn(esPoope.setMinter(poopeVester.address, true), "esPoope.setMinter(poopeVester)")
  await sleep(15000)
  await sendTxn(esPoope.setMinter(plpVester.address, true), "esPoope.setMinter(plpVester)")
  await sleep(15000)

  await sendTxn(poopeVester.setHandler(rewardRouter.address, true), "poopeVester.setHandler(rewardRouter)")
  await sleep(15000)
  await sendTxn(plpVester.setHandler(rewardRouter.address, true), "plpVester.setHandler(rewardRouter)")
  await sleep(15000)

  await sendTxn(feePoopeTracker.setHandler(poopeVester.address, true), "feePoopeTracker.setHandler(poopeVester)")
  await sleep(15000)
  await sendTxn(stakedPlpTracker.setHandler(plpVester.address, true), "stakedPlpTracker.setHandler(plpVester)")
  await sleep(15000)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
