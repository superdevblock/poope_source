const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const stakePoopeList = require("../../data/poopeMigration/stakePoopeList6.json")

async function main() {
  const wallet = { address: "0x5F799f365Fa8A2B60ac0429C48B153cA5a6f0Cf8" }
  const poope = await contractAt("POOPE", "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a");
  const rewardRouter = await contractAt("RewardRouter", "0xc73d553473dC65CE56db96c58e6a091c20980fbA")
  const stakedPoopeTracker = await contractAt("RewardTracker", "0x908C4D94D34924765f1eDc22A1DD098397c59dD4")
  const shouldStake = false

  console.log("processing list", stakePoopeList.length)

  // await sendTxn(poope.setMinter(wallet.address, true), "poope.setMinter")
  // await sendTxn(poope.mint(wallet.address, expandDecimals(5500000, 18)), "poope.mint")
  // await sendTxn(poope.approve(stakedPoopeTracker.address, expandDecimals(5500000, 18)), "poope.approve(stakedPoopeTracker)")
  // await sendTxn(rewardRouter.batchStakePoopeForAccount(["0x5F799f365Fa8A2B60ac0429C48B153cA5a6f0Cf8"], [1], { gasLimit: 30000000 }), "rewardRouter.batchStakePoopeForAccount")

  if (!shouldStake) {
    for (let i = 0; i < stakePoopeList.length; i++) {
      const item = stakePoopeList[i]
      const account = item.address
      const stakedAmount = await stakedPoopeTracker.stakedAmounts(account)
      console.log(`${account} : ${stakedAmount.toString()}`)
    }
    return
  }

  const batchSize = 30
  let accounts = []
  let amounts = []

  for (let i = 0; i < stakePoopeList.length; i++) {
    const item = stakePoopeList[i]
    accounts.push(item.address)
    amounts.push(item.balance)

    if (accounts.length === batchSize) {
      console.log("accounts", accounts)
      console.log("amounts", amounts)
      console.log("sending batch", i, accounts.length, amounts.length)
      await sendTxn(rewardRouter.batchStakePoopeForAccount(accounts, amounts), "rewardRouter.batchStakePoopeForAccount")

      const account = accounts[0]
      const amount = amounts[0]
      const stakedAmount = await stakedPoopeTracker.stakedAmounts(account)
      console.log(`${account}: ${amount.toString()}, ${stakedAmount.toString()}`)

      accounts = []
      amounts = []
    }
  }

  if (accounts.length > 0) {
    console.log("sending final batch", stakePoopeList.length, accounts.length, amounts.length)
    await sendTxn(rewardRouter.batchStakePoopeForAccount(accounts, amounts), "rewardRouter.batchStakePoopeForAccount")
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
