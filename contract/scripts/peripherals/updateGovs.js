const { deployContract, contractAt, sendTxn, getFrameSigner } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

async function getArbValues() {
  const contracts = [
    "0x199070DDfd1CFb69173aa2F7e20906F26B363004", // BluVester
    "0xA75287d2f8b217273E7FCD7E86eF07D33972042E", // BlpVester
    "0x321F653eED006AD1C29D174e17d96351BDe22649", // BlpManager
    "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258", // BLP
    "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA", // ES_BLU
    "0x35247165119B69A40edD5304969560D0ef486921", // BN_BLU
    "0x45096e7aA921f27590f8F19e457794EB09678141", // USDG
  ]

  const trackers = [
    "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", // StakedBluTracker
    "0x4d268a7d4C16ceB5a606c173Bd974984343fea13", // BonusBluTracker
    "0xd2D1162512F927a7e282Ef43a362659E4F2a728F", // FeeBluTracker
    "0x1aDDD80E6039594eE970E5872D247bf0414C8903", // StakedBlpTracker
    "0x4e971a87900b931fF39d1Aad67697F49835400b6", // FeeBlpTracker
  ]

  const vault = await contractAt("Vault", "0x489ee077994B6658eAfA855C308275EAd8097C4A")
  const nextTimelock = { address: await vault.gov() }

  return { contracts, trackers, nextTimelock }
}

async function getAvaxValues() {
  const contracts = [
    "0x472361d3cA5F49c8E633FB50385BfaD1e018b445", // BluVester
    "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A", // BlpVester
    "0xe1ae4d4b06A5Fe1fc288f6B4CD72f9F8323B107F", // BlpManager
    "0x01234181085565ed162a948b6a5e88758CD7c7b8", // BLP
    "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17", // ES_BLU
    "0x8087a341D32D445d9aC8aCc9c14F5781E04A26d2", // BN_BLU
    "0xc0253c3cC6aa5Ab407b5795a04c28fB063273894", // USDG
  ]

  const trackers = [
    "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342", // StakedBluTracker
    "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", // BonusBluTracker
    "0x4d268a7d4C16ceB5a606c173Bd974984343fea13", // FeeBluTracker
    "0x9e295B5B976a184B14aD8cd72413aD846C299660", // StakedBlpTracker
    "0xd2D1162512F927a7e282Ef43a362659E4F2a728F", // FeeBlpTracker
  ]

  const vault = await contractAt("Vault", "0x9ab2De34A33fB459b538c43f251eB825645e8595")
  const nextTimelock = { address: await vault.gov() }

  return { contracts, trackers, nextTimelock }
}

async function getValues() {
  if (network === "arbitrum") {
    return getArbValues()
  }

  if (network === "avax") {
    return getAvaxValues()
  }
}

async function setGov(target, nextTimelock, signer) {
    const prevTimelock = await contractAt("Timelock", await target.gov(), signer)
    // await sendTxn(prevTimelock.signalSetGov(target.address, nextTimelock.address), `signalSetGov: ${target.address}, ${nextTimelock.address}`)
    await sendTxn(prevTimelock.setGov(target.address, nextTimelock.address), `setGov: ${target.address}, ${nextTimelock.address}`)
}

async function main() {
  const signer = await getFrameSigner()

  const { contracts, trackers, nextTimelock } = await getValues()

  for (let i = 0; i < contracts.length; i++) {
    const target = await contractAt("Governable", contracts[i])
    await setGov(target, nextTimelock, signer)
  }

  for (let i = 0; i < trackers.length; i++) {
    const rewardTracker = await contractAt("RewardTracker", trackers[i])
    const distributor = await contractAt("RewardDistributor", await rewardTracker.distributor())

    await setGov(rewardTracker, nextTimelock, signer)
    await setGov(distributor, nextTimelock, signer)
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
