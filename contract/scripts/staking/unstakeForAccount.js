const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function main() {
  const wallet = { address: "0x5F799f365Fa8A2B60ac0429C48B153cA5a6f0Cf8" }

  const account = "0x6eA748d14f28778495A3fBa3550a6CdfBbE555f9"
  const unstakeAmount = "79170000000000000000"

  const rewardRouter = await contractAt("RewardRouter", "0x1b8911995ee36F4F95311D1D9C1845fA18c56Ec6")
  const poope = await contractAt("POOPE", "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a");
  const bnPoope = await contractAt("MintableBaseToken", "0x35247165119B69A40edD5304969560D0ef486921");
  const stakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const bonusPoopeTracker = await contractAt("RewardTracker", "0x4d268a7d4C16ceB5a606c173Bd974984343fea13")
  const feePoopeTracker = await contractAt("RewardTracker", "0xd2D1162512F927a7e282Ef43a362659E4F2a728F")

  // const gasLimit = 30000000

  // await sendTxn(feePoopeTracker.setHandler(wallet.address, true, { gasLimit }), "feePoopeTracker.setHandler")
  // await sendTxn(bonusPoopeTracker.setHandler(wallet.address, true, { gasLimit }), "bonusPoopeTracker.setHandler")
  // await sendTxn(stakedPoopeTracker.setHandler(wallet.address, true, { gasLimit }), "stakedPoopeTracker.setHandler")

  const stakedAmount = await stakedPoopeTracker.stakedAmounts(account)
  console.log(`${account} staked: ${stakedAmount.toString()}`)
  console.log(`unstakeAmount: ${unstakeAmount.toString()}`)

  await sendTxn(feePoopeTracker.unstakeForAccount(account, bonusPoopeTracker.address, unstakeAmount, account), "feePoopeTracker.unstakeForAccount")
  await sendTxn(bonusPoopeTracker.unstakeForAccount(account, stakedPoopeTracker.address, unstakeAmount, account), "bonusPoopeTracker.unstakeForAccount")
  await sendTxn(stakedPoopeTracker.unstakeForAccount(account, poope.address, unstakeAmount, account), "stakedPoopeTracker.unstakeForAccount")

  await sendTxn(bonusPoopeTracker.claimForAccount(account, account), "bonusPoopeTracker.claimForAccount")

  const bnPoopeAmount = await bnPoope.balanceOf(account)
  console.log(`bnPoopeAmount: ${bnPoopeAmount.toString()}`)

  await sendTxn(feePoopeTracker.stakeForAccount(account, account, bnPoope.address, bnPoopeAmount), "feePoopeTracker.stakeForAccount")

  const stakedBnPoope = await feePoopeTracker.depositBalances(account, bnPoope.address)
  console.log(`stakedBnPoope: ${stakedBnPoope.toString()}`)

  const reductionAmount = stakedBnPoope.mul(unstakeAmount).div(stakedAmount)
  console.log(`reductionAmount: ${reductionAmount.toString()}`)
  await sendTxn(feePoopeTracker.unstakeForAccount(account, bnPoope.address, reductionAmount, account), "feePoopeTracker.unstakeForAccount")
  await sendTxn(bnPoope.burn(account, reductionAmount), "bnPoope.burn")

  const poopeAmount = await poope.balanceOf(account)
  console.log(`poopeAmount: ${poopeAmount.toString()}`)

  await sendTxn(poope.burn(account, unstakeAmount), "poope.burn")
  const nextPoopeAmount = await poope.balanceOf(account)
  console.log(`nextPoopeAmount: ${nextPoopeAmount.toString()}`)

  const nextStakedAmount = await stakedPoopeTracker.stakedAmounts(account)
  console.log(`nextStakedAmount: ${nextStakedAmount.toString()}`)

  const nextStakedBnPoope = await feePoopeTracker.depositBalances(account, bnPoope.address)
  console.log(`nextStakedBnPoope: ${nextStakedBnPoope.toString()}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
