const { getFrameSigner, deployContract, contractAt, sendTxn, writeTmpAddresses } = require("../shared/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

async function getArbValues() {
  const plp = { address: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258" }
  const plpManager = { address: "0x321F653eED006AD1C29D174e17d96351BDe22649" }
  const stakedPlpTracker = await contractAt("RewardTracker", "0x1aDDD80E6039594eE970E5872D247bf0414C8903")
  const feePlpTracker = await contractAt("RewardTracker", "0x4e971a87900b931fF39d1Aad67697F49835400b6")

  return { plp, plpManager, stakedPlpTracker, feePlpTracker }
}

async function getAvaxValues() {
  const plp = { address: "0x01234181085565ed162a948b6a5e88758CD7c7b8" }
  const plpManager = { address: "0xe1ae4d4b06A5Fe1fc288f6B4CD72f9F8323B107F" }
  const stakedPlpTracker = await contractAt("RewardTracker", "0x9e295B5B976a184B14aD8cd72413aD846C299660")
  const feePlpTracker = await contractAt("RewardTracker", "0xd2D1162512F927a7e282Ef43a362659E4F2a728F")

  return { plp, plpManager, stakedPlpTracker, feePlpTracker }
}

async function getValues() {
  if (network === "arbitrum") {
    return getArbValues()
  }

  if (network === "avax") {
    return getAvaxValues()
  }
}

async function main() {
  const signer = await getFrameSigner()
  const { plp, plpManager, stakedPlpTracker, feePlpTracker } = await getValues()

  const timelock = await contractAt("Timelock", await stakedPlpTracker.gov(), signer)

  const stakedPlp = await deployContract("StakedPlp", [
    plp.address,
    plpManager.address,
    stakedPlpTracker.address,
    feePlpTracker.address
  ])

  await sendTxn(timelock.signalSetHandler(stakedPlpTracker.address, stakedPlp.address, true), "timelock.signalSetHandler(stakedPlpTracker)")
  await sendTxn(timelock.signalSetHandler(feePlpTracker.address, stakedPlp.address, true), "timelock.signalSetHandler(stakedPlpTracker)")

  // await deployContract("PlpBalance", [plpManager.address, stakedPlpTracker.address])
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
