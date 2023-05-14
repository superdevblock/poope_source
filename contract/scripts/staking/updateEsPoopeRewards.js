const { deployContract, contractAt, sendTxn, signers, updateTokensPerInterval } = require("../shared/helpers")
const { expandDecimals, bigNumberify } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

const shouldSendTxn = true

const monthlyEsPoopeForPlpOnArb = expandDecimals(toInt("0"), 18)
const monthlyEsPoopeForPlpOnAvax = expandDecimals(toInt("0"), 18)

async function getStakedAmounts() {
  const arbStakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", signers.arbitrum)
  const arbStakedPoopeAndEsPoope =await arbStakedPoopeTracker.totalSupply()

  const avaxStakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", signers.avax)
  const avaxStakedPoopeAndEsPoope =await avaxStakedPoopeTracker.totalSupply()

  return {
    arbStakedPoopeAndEsPoope,
    avaxStakedPoopeAndEsPoope
  }
}

async function getArbValues() {
  const poopeRewardTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const plpRewardTracker = await contractAt("RewardTracker", "0x1aDDD80E6039594eE970E5872D247bf0414C8903")
  const tokenDecimals = 18
  const monthlyEsPoopeForPlp = monthlyEsPoopeForPlpOnArb

  return { tokenDecimals, poopeRewardTracker, plpRewardTracker, monthlyEsPoopeForPlp }
}

async function getAvaxValues() {
  const poopeRewardTracker = await contractAt("RewardTracker", "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342")
  const plpRewardTracker = await contractAt("RewardTracker", "0x9e295B5B976a184B14aD8cd72413aD846C299660")
  const tokenDecimals = 18
  const monthlyEsPoopeForPlp = monthlyEsPoopeForPlpOnAvax

  return { tokenDecimals, poopeRewardTracker, plpRewardTracker, monthlyEsPoopeForPlp }
}

function getValues() {
  if (network === "arbitrum") {
    return getArbValues()
  }

  if (network === "avax") {
    return getAvaxValues()
  }
}

function toInt(value) {
  return parseInt(value.replaceAll(",", ""))
}

async function main() {
  const { arbStakedPoopeAndEsPoope, avaxStakedPoopeAndEsPoope } = await getStakedAmounts()
  const { tokenDecimals, poopeRewardTracker, plpRewardTracker, monthlyEsPoopeForPlp } = await getValues()

  const stakedAmounts = {
    arbitrum: {
      total: arbStakedPoopeAndEsPoope
    },
    avax: {
      total: avaxStakedPoopeAndEsPoope
    }
  }

  let totalStaked = bigNumberify(0)

  for (const net in stakedAmounts) {
    totalStaked = totalStaked.add(stakedAmounts[net].total)
  }

  const totalEsPoopeRewards = expandDecimals(50000, tokenDecimals)
  const secondsPerMonth = 28 * 24 * 60 * 60

  const poopeRewardDistributor = await contractAt("RewardDistributor", await poopeRewardTracker.distributor())

  const poopeCurrentTokensPerInterval = await poopeRewardDistributor.tokensPerInterval()
  const poopeNextTokensPerInterval = totalEsPoopeRewards.mul(stakedAmounts[network].total).div(totalStaked).div(secondsPerMonth)
  const poopeDelta = poopeNextTokensPerInterval.sub(poopeCurrentTokensPerInterval).mul(10000).div(poopeCurrentTokensPerInterval)

  console.log("poopeCurrentTokensPerInterval", poopeCurrentTokensPerInterval.toString())
  console.log("poopeNextTokensPerInterval", poopeNextTokensPerInterval.toString(), `${poopeDelta.toNumber() / 100.00}%`)

  const plpRewardDistributor = await contractAt("RewardDistributor", await plpRewardTracker.distributor())

  const plpCurrentTokensPerInterval = await plpRewardDistributor.tokensPerInterval()
  const plpNextTokensPerInterval = monthlyEsPoopeForPlp.div(secondsPerMonth)

  console.log("plpCurrentTokensPerInterval", plpCurrentTokensPerInterval.toString())
  console.log("plpNextTokensPerInterval", plpNextTokensPerInterval.toString())

  if (shouldSendTxn) {
    await updateTokensPerInterval(poopeRewardDistributor, poopeNextTokensPerInterval, "poopeRewardDistributor")
    await updateTokensPerInterval(plpRewardDistributor, plpNextTokensPerInterval, "plpRewardDistributor")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
