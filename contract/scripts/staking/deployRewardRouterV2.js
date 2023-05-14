const { deployContract, contractAt, sendTxn, writeTmpAddresses } = require("../shared/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('../core/tokens')[network];

async function main() {
  const { nativeToken } = tokens

  const vestingDuration = 365 * 24 * 60 * 60

  const blpManager = await contractAt("BlpManager", "0x32889DD3209b32fEc343A4c8081f54aBEFFC06b8")
  const blp = await contractAt("BLP", "0xB4d8D3B6b165091bf7A03744442960C771ccE3F0")

  const blu = await contractAt("Bluespade", "0x1542bA4CA0fb6D1B4476a933B292002fd1959A52");
  const esBlu = await contractAt("EsBLU", "0x7B0f4CE052cB9819f9c972A498457bfdC95913E1");
  // const bnBlu = await deployContract("MintableBaseToken", ["Bonus BLU", "bnBLU", 0]);
  const bnBlu = await contractAt("MintableBaseToken", "0x5772ad251EFaE60083AF3542A0281271cEbe5E17");

  // await sendTxn(esBlu.setInPrivateTransferMode(true), "esBlu.setInPrivateTransferMode")
  // await sendTxn(blp.setInPrivateTransferMode(true), "blp.setInPrivateTransferMode")

  // const stakedBluTracker = await deployContract("RewardTracker", ["Staked BLU", "sBLU"])
  // const stakedBluDistributor = await deployContract("RewardDistributor", [esBlu.address, stakedBluTracker.address])
  const stakedBluTracker = await contractAt("RewardTracker", "0x3209363F27eA6D76F581c25EFE5E1806F3b08722");
  const stakedBluDistributor = await contractAt("RewardDistributor", "0x9Db287aeF735802a73ffdABe8D50AF0560C5b140");
  // await sendTxn(stakedBluTracker.initialize([blu.address, esBlu.address], stakedBluDistributor.address), "stakedBluTracker.initialize")
  // await sendTxn(stakedBluDistributor.updateLastDistributionTime(), "stakedBluDistributor.updateLastDistributionTime")

  // const bonusBluTracker = await deployContract("RewardTracker", ["Staked + Bonus BLU", "sbBLU"])
  // const bonusBluDistributor = await deployContract("BonusDistributor", [bnBlu.address, bonusBluTracker.address])
  const bonusBluTracker = await contractAt("RewardTracker", "0x3752CbE688277c246E05c3FAe224ffd55a56bafa");
  const bonusBluDistributor = await contractAt("BonusDistributor", "0x902aF2952A80DC3d8CF2603743f6CAfb8FE9C97C");
  // await sendTxn(bonusBluTracker.initialize([stakedBluTracker.address], bonusBluDistributor.address), "bonusBluTracker.initialize")
  // await sendTxn(bonusBluDistributor.updateLastDistributionTime(), "bonusBluDistributor.updateLastDistributionTime")

  // const feeBluTracker = await deployContract("RewardTracker", ["Staked + Bonus + Fee BLU", "sbfBLU"])
  // const feeBluDistributor = await deployContract("RewardDistributor", [nativeToken.address, feeBluTracker.address])
  const feeBluTracker = await contractAt("RewardTracker", "0x32E3052C8c3C3f19b3B872a9D62a4379464229d7");
  const feeBluDistributor = await contractAt("RewardDistributor", "0x8AA9def08b39018aC3fDBdf389D63f6989cBF048");
  // await sendTxn(feeBluTracker.initialize([bonusBluTracker.address, bnBlu.address], feeBluDistributor.address), "feeBluTracker.initialize")
  // await sendTxn(feeBluDistributor.updateLastDistributionTime(), "feeBluDistributor.updateLastDistributionTime")

  // const feeBlpTracker = await deployContract("RewardTracker", ["Fee BLP", "fBLP"])
  // const feeBlpDistributor = await deployContract("RewardDistributor", [nativeToken.address, feeBlpTracker.address])
  const feeBlpTracker = await contractAt("RewardTracker", "0xD90B4A81a44C9BF2eb98102eE0959622C6D07f0C");
  const feeBlpDistributor = await contractAt("RewardDistributor", "0x259CD1C9ABc0f06080e6b9588f2c2e06C347B9a1");
  // await sendTxn(feeBlpTracker.initialize([blp.address], feeBlpDistributor.address), "feeBlpTracker.initialize")
  // await sendTxn(feeBlpDistributor.updateLastDistributionTime(), "feeBlpDistributor.updateLastDistributionTime")

  // const stakedBlpTracker = await deployContract("RewardTracker", ["Fee + Staked BLP", "fsBLP"])
  // const stakedBlpDistributor = await deployContract("RewardDistributor", [esBlu.address, stakedBlpTracker.address])
  const stakedBlpTracker = await contractAt("RewardTracker", "0x9645320E8323aE2F4e1Ecf9c6E93eb56e4Da09Ba");
  const stakedBlpDistributor = await contractAt("RewardDistributor", "0x6Dc02f0547FfaBAEAFE230Ab26cD467b630e4a99");
  // await sendTxn(stakedBlpTracker.initialize([feeBlpTracker.address], stakedBlpDistributor.address), "stakedBlpTracker.initialize")
  // await sendTxn(stakedBlpDistributor.updateLastDistributionTime(), "stakedBlpDistributor.updateLastDistributionTime")

  // await sendTxn(stakedBluTracker.setInPrivateTransferMode(true), "stakedBluTracker.setInPrivateTransferMode")
  // await sendTxn(stakedBluTracker.setInPrivateStakingMode(true), "stakedBluTracker.setInPrivateStakingMode")
  // await sendTxn(bonusBluTracker.setInPrivateTransferMode(true), "bonusBluTracker.setInPrivateTransferMode")
  // await sendTxn(bonusBluTracker.setInPrivateStakingMode(true), "bonusBluTracker.setInPrivateStakingMode")
  // await sendTxn(bonusBluTracker.setInPrivateClaimingMode(true), "bonusBluTracker.setInPrivateClaimingMode")
  // await sendTxn(feeBluTracker.setInPrivateTransferMode(true), "feeBluTracker.setInPrivateTransferMode")
  // await sendTxn(feeBluTracker.setInPrivateStakingMode(true), "feeBluTracker.setInPrivateStakingMode")

  // await sendTxn(feeBlpTracker.setInPrivateTransferMode(true), "feeBlpTracker.setInPrivateTransferMode")
  // await sendTxn(feeBlpTracker.setInPrivateStakingMode(true), "feeBlpTracker.setInPrivateStakingMode")
  // await sendTxn(stakedBlpTracker.setInPrivateTransferMode(true), "stakedBlpTracker.setInPrivateTransferMode")
  // await sendTxn(stakedBlpTracker.setInPrivateStakingMode(true), "stakedBlpTracker.setInPrivateStakingMode")

  // console.log("bluVester = ", {
  //   _name: "Vested BLU", // _name
  //   _symbol: "vBLU", // _symbol
  //   _vestingDuration: vestingDuration, // _vestingDuration
  //   _esToken: esBlu.address, // _esToken
  //   _pairToken: feeBluTracker.address, // _pairToken
  //   _claimableToken: blu.address, // _claimableToken
  //   _rewardTracker: stakedBluTracker.address, // _rewardTracker
  // })

  // const bluVester = await deployContract("Vester", [{
  //   _name: "Vested BLU", // _name
  //   _symbol: "vBLU", // _symbol
  //   _vestingDuration: vestingDuration, // _vestingDuration
  //   _esToken: esBlu.address, // _esToken
  //   _pairToken: feeBluTracker.address, // _pairToken
  //   _claimableToken: blu.address, // _claimableToken
  //   _rewardTracker: stakedBluTracker.address, // _rewardTracker
  // }
  // ])
  const bluVester = await contractAt("Vester", "0x9c8147f8f4574Ce3BDDB68B4F49D925cE4D81AD6");

  // console.log("blpVester = ", {
  //   _name: "Vested BLP", // _name
  //   _symbol: "vBLP", // _symbol
  //    _vestingDuration: vestingDuration, // _vestingDuration
  //    _esToken: esBlu.address, // _esToken
  //    _pairToken: stakedBlpTracker.address, // _pairToken
  //    _claimableToken: blu.address, // _claimableToken
  //    _rewardTracker: stakedBlpTracker.address, // _rewardTracker
  // })

  // const blpVester = await deployContract("Vester", [{
  //   _name: "Vested BLP", // _name
  //   _symbol: "vBLP", // _symbol
  //    _vestingDuration: vestingDuration, // _vestingDuration
  //    _esToken: esBlu.address, // _esToken
  //    _pairToken: stakedBlpTracker.address, // _pairToken
  //    _claimableToken: blu.address, // _claimableToken
  //    _rewardTracker: stakedBlpTracker.address, // _rewardTracker
  // }
  // ])

  const blpVester = await contractAt("Vester", "0xe10f426988A30197446eEf88373C7E012Cb81a07");

  const rewardRouter = await deployContract("RewardRouterV2", [])
  // const rewardRouter = await contractAt("RewardRouterV2", "0x4C1F944332d7e59Fc0ad42a86Fe29dE47073b523");

  await sendTxn(rewardRouter.initialize({
    _weth: nativeToken.address,
    _blu: blu.address,
    _esBlu: esBlu.address,
    _bnBlu: bnBlu.address,
    _blp: blp.address,
    _stakedBluTracker: stakedBluTracker.address,
    _bonusBluTracker: bonusBluTracker.address,
    _feeBluTracker: feeBluTracker.address,
    _feeBlpTracker: feeBlpTracker.address,
    _stakedBlpTracker: stakedBlpTracker.address,
    _blpManager: blpManager.address,
    _bluVester: bluVester.address,
    _blpVester: blpVester.address
  }
  ), "rewardRouter.initialize")

  await sendTxn(blpManager.setHandler(rewardRouter.address, true), "blpManager.setHandler(rewardRouter)")

  // allow rewardRouter to stake in stakedBluTracker
  // await sendTxn(stakedBluTracker.setHandler(rewardRouter.address, true), "stakedBluTracker.setHandler(rewardRouter)")
  // allow bonusBluTracker to stake stakedBluTracker
  // await sendTxn(stakedBluTracker.setHandler(bonusBluTracker.address, true), "stakedBluTracker.setHandler(bonusBluTracker)")
  // allow rewardRouter to stake in bonusBluTracker
  // await sendTxn(bonusBluTracker.setHandler(rewardRouter.address, true), "bonusBluTracker.setHandler(rewardRouter)")
  // allow bonusBluTracker to stake feeBluTracker
  // await sendTxn(bonusBluTracker.setHandler(feeBluTracker.address, true), "bonusBluTracker.setHandler(feeBluTracker)")
  // await sendTxn(bonusBluDistributor.setBonusMultiplier(10000), "bonusBluDistributor.setBonusMultiplier")
  // allow rewardRouter to stake in feeBluTracker
  // await sendTxn(feeBluTracker.setHandler(rewardRouter.address, true), "feeBluTracker.setHandler(rewardRouter)")
  // allow stakedBluTracker to stake esBlu
  // await sendTxn(esBlu.setHandler(stakedBluTracker.address, true), "esBlu.setHandler(stakedBluTracker)")
  // allow feeBluTracker to stake bnBlu
  // await sendTxn(bnBlu.setHandler(feeBluTracker.address, true), "bnBlu.setHandler(feeBluTracker")
  // allow rewardRouter to burn bnBlu
  // await sendTxn(bnBlu.setMinter(rewardRouter.address, true), "bnBlu.setMinter(rewardRouter")

  // allow stakedBlpTracker to stake feeBlpTracker
  // await sendTxn(feeBlpTracker.setHandler(stakedBlpTracker.address, true), "feeBlpTracker.setHandler(stakedBlpTracker)")
  // allow feeBlpTracker to stake blp
  // await sendTxn(blp.setHandler(feeBlpTracker.address, true), "blp.setHandler(feeBlpTracker)")

  // allow rewardRouter to stake in feeBlpTracker
  // await sendTxn(feeBlpTracker.setHandler(rewardRouter.address, true), "feeBlpTracker.setHandler(rewardRouter)")
  // allow rewardRouter to stake in stakedBlpTracker
  // await sendTxn(stakedBlpTracker.setHandler(rewardRouter.address, true), "stakedBlpTracker.setHandler(rewardRouter)")

  // await sendTxn(esBlu.setHandler(rewardRouter.address, true), "esBlu.setHandler(rewardRouter)")
  // await sendTxn(esBlu.setHandler(stakedBluDistributor.address, true), "esBlu.setHandler(stakedBluDistributor)")
  // await sendTxn(esBlu.setHandler(stakedBlpDistributor.address, true), "esBlu.setHandler(stakedBlpDistributor)")
  // await sendTxn(esBlu.setHandler(stakedBlpTracker.address, true), "esBlu.setHandler(stakedBlpTracker)")
  // await sendTxn(esBlu.setHandler(bluVester.address, true), "esBlu.setHandler(bluVester)")
  // await sendTxn(esBlu.setHandler(blpVester.address, true), "esBlu.setHandler(blpVester)")

  // await sendTxn(esBlu.setMinter(bluVester.address, true), "esBlu.setMinter(bluVester)")
  // await sendTxn(esBlu.setMinter(blpVester.address, true), "esBlu.setMinter(blpVester)")

  // await sendTxn(bluVester.setHandler(rewardRouter.address, true), "bluVester.setHandler(rewardRouter)")
  // await sendTxn(blpVester.setHandler(rewardRouter.address, true), "blpVester.setHandler(rewardRouter)")

  // await sendTxn(feeBluTracker.setHandler(bluVester.address, true), "feeBluTracker.setHandler(bluVester)")
  // await sendTxn(stakedBlpTracker.setHandler(blpVester.address, true), "stakedBlpTracker.setHandler(blpVester)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
