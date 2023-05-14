const { deployContract, contractAt, sendTxn, signers, updateTokensPerInterval } = require("../shared/helpers")
const { expandDecimals, bigNumberify } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

const shouldSendTxn = true

const monthlyEsBluForBlpOnArb = expandDecimals(toInt("0"), 18)
const monthlyEsBluForBlpOnAvax = expandDecimals(toInt("0"), 18)

async function getStakedAmounts() {
  const arbStakedBluTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", signers.arbitrum)
  const arbStakedBluAndEsBlu =await arbStakedBluTracker.totalSupply()

  const avaxStakedBluTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4", signers.avax)
  const avaxStakedBluAndEsBlu =await avaxStakedBluTracker.totalSupply()

  return {
    arbStakedBluAndEsBlu,
    avaxStakedBluAndEsBlu
  }
}

async function getArbValues() {
  const bluRewardTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const blpRewardTracker = await contractAt("RewardTracker", "0x1aDDD80E6039594eE970E5872D247bf0414C8903")
  const tokenDecimals = 18
  const monthlyEsBluForBlp = monthlyEsBluForBlpOnArb

  return { tokenDecimals, bluRewardTracker, blpRewardTracker, monthlyEsBluForBlp }
}

async function getAvaxValues() {
  const bluRewardTracker = await contractAt("RewardTracker", "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342")
  const blpRewardTracker = await contractAt("RewardTracker", "0x9e295B5B976a184B14aD8cd72413aD846C299660")
  const tokenDecimals = 18
  const monthlyEsBluForBlp = monthlyEsBluForBlpOnAvax

  return { tokenDecimals, bluRewardTracker, blpRewardTracker, monthlyEsBluForBlp }
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
  const { arbStakedBluAndEsBlu, avaxStakedBluAndEsBlu } = await getStakedAmounts()
  const { tokenDecimals, bluRewardTracker, blpRewardTracker, monthlyEsBluForBlp } = await getValues()

  const stakedAmounts = {
    arbitrum: {
      total: arbStakedBluAndEsBlu
    },
    avax: {
      total: avaxStakedBluAndEsBlu
    }
  }

  let totalStaked = bigNumberify(0)

  for (const net in stakedAmounts) {
    totalStaked = totalStaked.add(stakedAmounts[net].total)
  }

  const totalEsBluRewards = expandDecimals(50000, tokenDecimals)
  const secondsPerMonth = 28 * 24 * 60 * 60

  const bluRewardDistributor = await contractAt("RewardDistributor", await bluRewardTracker.distributor())

  const bluCurrentTokensPerInterval = await bluRewardDistributor.tokensPerInterval()
  const bluNextTokensPerInterval = totalEsBluRewards.mul(stakedAmounts[network].total).div(totalStaked).div(secondsPerMonth)
  const bluDelta = bluNextTokensPerInterval.sub(bluCurrentTokensPerInterval).mul(10000).div(bluCurrentTokensPerInterval)

  console.log("bluCurrentTokensPerInterval", bluCurrentTokensPerInterval.toString())
  console.log("bluNextTokensPerInterval", bluNextTokensPerInterval.toString(), `${bluDelta.toNumber() / 100.00}%`)

  const blpRewardDistributor = await contractAt("RewardDistributor", await blpRewardTracker.distributor())

  const blpCurrentTokensPerInterval = await blpRewardDistributor.tokensPerInterval()
  const blpNextTokensPerInterval = monthlyEsBluForBlp.div(secondsPerMonth)

  console.log("blpCurrentTokensPerInterval", blpCurrentTokensPerInterval.toString())
  console.log("blpNextTokensPerInterval", blpNextTokensPerInterval.toString())

  if (shouldSendTxn) {
    await updateTokensPerInterval(bluRewardDistributor, bluNextTokensPerInterval, "bluRewardDistributor")
    await updateTokensPerInterval(blpRewardDistributor, blpNextTokensPerInterval, "blpRewardDistributor")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
