const { deployContract, contractAt, sendTxn, writeTmpAddresses } = require("../shared/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('../core/tokens')[network];

async function main() {
  const { nativeToken } = tokens

  const vestingDuration = 365 * 24 * 60 * 60

  const plpManager = await contractAt("PlpManager", "0x32889DD3209b32fEc343A4c8081f54aBEFFC06b8")
  const plp = await contractAt("PLP", "0xB4d8D3B6b165091bf7A03744442960C771ccE3F0")

  const poope = await contractAt("Poopeespade", "0x1542bA4CA0fb6D1B4476a933B292002fd1959A52");
  const esPoope = await contractAt("EsPOOPE", "0x7B0f4CE052cB9819f9c972A498457bfdC95913E1");
  // const bnPoope = await deployContract("MintableBaseToken", ["Bonus POOPE", "bnPOOPE", 0]);
  const bnPoope = await contractAt("MintableBaseToken", "0x5772ad251EFaE60083AF3542A0281271cEbe5E17");

  // await sendTxn(esPoope.setInPrivateTransferMode(true), "esPoope.setInPrivateTransferMode")
  // await sendTxn(plp.setInPrivateTransferMode(true), "plp.setInPrivateTransferMode")

  // const stakedPoopeTracker = await deployContract("RewardTracker", ["Staked POOPE", "sPOOPE"])
  // const stakedPoopeDistributor = await deployContract("RewardDistributor", [esPoope.address, stakedPoopeTracker.address])
  const stakedPoopeTracker = await contractAt("RewardTracker", "0x3209363F27eA6D76F581c25EFE5E1806F3b08722");
  const stakedPoopeDistributor = await contractAt("RewardDistributor", "0x9Db287aeF735802a73ffdABe8D50AF0560C5b140");
  // await sendTxn(stakedPoopeTracker.initialize([poope.address, esPoope.address], stakedPoopeDistributor.address), "stakedPoopeTracker.initialize")
  // await sendTxn(stakedPoopeDistributor.updateLastDistributionTime(), "stakedPoopeDistributor.updateLastDistributionTime")

  // const bonusPoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus POOPE", "sbPOOPE"])
  // const bonusPoopeDistributor = await deployContract("BonusDistributor", [bnPoope.address, bonusPoopeTracker.address])
  const bonusPoopeTracker = await contractAt("RewardTracker", "0x3752CbE688277c246E05c3FAe224ffd55a56bafa");
  const bonusPoopeDistributor = await contractAt("BonusDistributor", "0x902aF2952A80DC3d8CF2603743f6CAfb8FE9C97C");
  // await sendTxn(bonusPoopeTracker.initialize([stakedPoopeTracker.address], bonusPoopeDistributor.address), "bonusPoopeTracker.initialize")
  // await sendTxn(bonusPoopeDistributor.updateLastDistributionTime(), "bonusPoopeDistributor.updateLastDistributionTime")

  // const feePoopeTracker = await deployContract("RewardTracker", ["Staked + Bonus + Fee POOPE", "sbfPOOPE"])
  // const feePoopeDistributor = await deployContract("RewardDistributor", [nativeToken.address, feePoopeTracker.address])
  const feePoopeTracker = await contractAt("RewardTracker", "0x32E3052C8c3C3f19b3B872a9D62a4379464229d7");
  const feePoopeDistributor = await contractAt("RewardDistributor", "0x8AA9def08b39018aC3fDBdf389D63f6989cBF048");
  // await sendTxn(feePoopeTracker.initialize([bonusPoopeTracker.address, bnPoope.address], feePoopeDistributor.address), "feePoopeTracker.initialize")
  // await sendTxn(feePoopeDistributor.updateLastDistributionTime(), "feePoopeDistributor.updateLastDistributionTime")

  // const feePlpTracker = await deployContract("RewardTracker", ["Fee PLP", "fPLP"])
  // const feePlpDistributor = await deployContract("RewardDistributor", [nativeToken.address, feePlpTracker.address])
  const feePlpTracker = await contractAt("RewardTracker", "0xD90B4A81a44C9BF2eb98102eE0959622C6D07f0C");
  const feePlpDistributor = await contractAt("RewardDistributor", "0x259CD1C9ABc0f06080e6b9588f2c2e06C347B9a1");
  // await sendTxn(feePlpTracker.initialize([plp.address], feePlpDistributor.address), "feePlpTracker.initialize")
  // await sendTxn(feePlpDistributor.updateLastDistributionTime(), "feePlpDistributor.updateLastDistributionTime")

  // const stakedPlpTracker = await deployContract("RewardTracker", ["Fee + Staked PLP", "fsPLP"])
  // const stakedPlpDistributor = await deployContract("RewardDistributor", [esPoope.address, stakedPlpTracker.address])
  const stakedPlpTracker = await contractAt("RewardTracker", "0x9645320E8323aE2F4e1Ecf9c6E93eb56e4Da09Ba");
  const stakedPlpDistributor = await contractAt("RewardDistributor", "0x6Dc02f0547FfaBAEAFE230Ab26cD467b630e4a99");
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

  // console.log("poopeVester = ", {
  //   _name: "Vested POOPE", // _name
  //   _symbol: "vPOOPE", // _symbol
  //   _vestingDuration: vestingDuration, // _vestingDuration
  //   _esToken: esPoope.address, // _esToken
  //   _pairToken: feePoopeTracker.address, // _pairToken
  //   _claimableToken: poope.address, // _claimableToken
  //   _rewardTracker: stakedPoopeTracker.address, // _rewardTracker
  // })

  // const poopeVester = await deployContract("Vester", [{
  //   _name: "Vested POOPE", // _name
  //   _symbol: "vPOOPE", // _symbol
  //   _vestingDuration: vestingDuration, // _vestingDuration
  //   _esToken: esPoope.address, // _esToken
  //   _pairToken: feePoopeTracker.address, // _pairToken
  //   _claimableToken: poope.address, // _claimableToken
  //   _rewardTracker: stakedPoopeTracker.address, // _rewardTracker
  // }
  // ])
  const poopeVester = await contractAt("Vester", "0x9c8147f8f4574Ce3BDDB68B4F49D925cE4D81AD6");

  // console.log("plpVester = ", {
  //   _name: "Vested PLP", // _name
  //   _symbol: "vPLP", // _symbol
  //    _vestingDuration: vestingDuration, // _vestingDuration
  //    _esToken: esPoope.address, // _esToken
  //    _pairToken: stakedPlpTracker.address, // _pairToken
  //    _claimableToken: poope.address, // _claimableToken
  //    _rewardTracker: stakedPlpTracker.address, // _rewardTracker
  // })

  // const plpVester = await deployContract("Vester", [{
  //   _name: "Vested PLP", // _name
  //   _symbol: "vPLP", // _symbol
  //    _vestingDuration: vestingDuration, // _vestingDuration
  //    _esToken: esPoope.address, // _esToken
  //    _pairToken: stakedPlpTracker.address, // _pairToken
  //    _claimableToken: poope.address, // _claimableToken
  //    _rewardTracker: stakedPlpTracker.address, // _rewardTracker
  // }
  // ])

  const plpVester = await contractAt("Vester", "0xe10f426988A30197446eEf88373C7E012Cb81a07");

  const rewardRouter = await deployContract("RewardRouterV2", [])
  // const rewardRouter = await contractAt("RewardRouterV2", "0x4C1F944332d7e59Fc0ad42a86Fe29dE47073b523");

  await sendTxn(rewardRouter.initialize({
    _weth: nativeToken.address,
    _poope: poope.address,
    _esPoope: esPoope.address,
    _bnPoope: bnPoope.address,
    _plp: plp.address,
    _stakedPoopeTracker: stakedPoopeTracker.address,
    _bonusPoopeTracker: bonusPoopeTracker.address,
    _feePoopeTracker: feePoopeTracker.address,
    _feePlpTracker: feePlpTracker.address,
    _stakedPlpTracker: stakedPlpTracker.address,
    _plpManager: plpManager.address,
    _poopeVester: poopeVester.address,
    _plpVester: plpVester.address
  }
  ), "rewardRouter.initialize")

  await sendTxn(plpManager.setHandler(rewardRouter.address, true), "plpManager.setHandler(rewardRouter)")

  // allow rewardRouter to stake in stakedPoopeTracker
  // await sendTxn(stakedPoopeTracker.setHandler(rewardRouter.address, true), "stakedPoopeTracker.setHandler(rewardRouter)")
  // allow bonusPoopeTracker to stake stakedPoopeTracker
  // await sendTxn(stakedPoopeTracker.setHandler(bonusPoopeTracker.address, true), "stakedPoopeTracker.setHandler(bonusPoopeTracker)")
  // allow rewardRouter to stake in bonusPoopeTracker
  // await sendTxn(bonusPoopeTracker.setHandler(rewardRouter.address, true), "bonusPoopeTracker.setHandler(rewardRouter)")
  // allow bonusPoopeTracker to stake feePoopeTracker
  // await sendTxn(bonusPoopeTracker.setHandler(feePoopeTracker.address, true), "bonusPoopeTracker.setHandler(feePoopeTracker)")
  // await sendTxn(bonusPoopeDistributor.setBonusMultiplier(10000), "bonusPoopeDistributor.setBonusMultiplier")
  // allow rewardRouter to stake in feePoopeTracker
  // await sendTxn(feePoopeTracker.setHandler(rewardRouter.address, true), "feePoopeTracker.setHandler(rewardRouter)")
  // allow stakedPoopeTracker to stake esPoope
  // await sendTxn(esPoope.setHandler(stakedPoopeTracker.address, true), "esPoope.setHandler(stakedPoopeTracker)")
  // allow feePoopeTracker to stake bnPoope
  // await sendTxn(bnPoope.setHandler(feePoopeTracker.address, true), "bnPoope.setHandler(feePoopeTracker")
  // allow rewardRouter to burn bnPoope
  // await sendTxn(bnPoope.setMinter(rewardRouter.address, true), "bnPoope.setMinter(rewardRouter")

  // allow stakedPlpTracker to stake feePlpTracker
  // await sendTxn(feePlpTracker.setHandler(stakedPlpTracker.address, true), "feePlpTracker.setHandler(stakedPlpTracker)")
  // allow feePlpTracker to stake plp
  // await sendTxn(plp.setHandler(feePlpTracker.address, true), "plp.setHandler(feePlpTracker)")

  // allow rewardRouter to stake in feePlpTracker
  // await sendTxn(feePlpTracker.setHandler(rewardRouter.address, true), "feePlpTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in stakedPlpTracker
  // await sendTxn(stakedPlpTracker.setHandler(rewardRouter.address, true), "stakedPlpTracker.setHandler(rewardRouter)")

  // await sendTxn(esPoope.setHandler(rewardRouter.address, true), "esPoope.setHandler(rewardRouter)")
  // await sendTxn(esPoope.setHandler(stakedPoopeDistributor.address, true), "esPoope.setHandler(stakedPoopeDistributor)")
  // await sendTxn(esPoope.setHandler(stakedPlpDistributor.address, true), "esPoope.setHandler(stakedPlpDistributor)")
  // await sendTxn(esPoope.setHandler(stakedPlpTracker.address, true), "esPoope.setHandler(stakedPlpTracker)")
  // await sendTxn(esPoope.setHandler(poopeVester.address, true), "esPoope.setHandler(poopeVester)")
  // await sendTxn(esPoope.setHandler(plpVester.address, true), "esPoope.setHandler(plpVester)")

  // await sendTxn(esPoope.setMinter(poopeVester.address, true), "esPoope.setMinter(poopeVester)")
  // await sendTxn(esPoope.setMinter(plpVester.address, true), "esPoope.setMinter(plpVester)")

  // await sendTxn(poopeVester.setHandler(rewardRouter.address, true), "poopeVester.setHandler(rewardRouter)")
  // await sendTxn(plpVester.setHandler(rewardRouter.address, true), "plpVester.setHandler(rewardRouter)")

  // await sendTxn(feePoopeTracker.setHandler(poopeVester.address, true), "feePoopeTracker.setHandler(poopeVester)")
  // await sendTxn(stakedPlpTracker.setHandler(plpVester.address, true), "stakedPlpTracker.setHandler(plpVester)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
