const { deployContract, contractAt, sendTxn, readCsv } = require("../shared/helpers")
const { expandDecimals, bigNumberify } = require("../../test/shared/utilities")

const path = require('path')
const fs = require('fs')
const parse = require('csv-parse')

const inputDir = path.resolve(__dirname, "../..") + "/data/bonds/"

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

const inputFile = inputDir + "2022-09-14_transfers.csv"
const shouldSendTxns = true

async function getArbValues() {
  const esPoope = await contractAt("EsPOOPE", "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA")
  const esPoopeBatchSender = await contractAt("EsPoopeBatchSender", "0xc3828fa579996090Dc7767E051341338e60207eF")

  const vestWithPoopeOption = "0x544a6ec142Aa9A7F75235fE111F61eF2EbdC250a"
  const vestWithPlpOption = "0x9d8f6f6eE45275A5Ca3C6f6269c5622b1F9ED515"

  const poopeVester = await contractAt("Vester", "0x199070DDfd1CFb69173aa2F7e20906F26B363004")
  const plpVester = await contractAt("Vester", "0xA75287d2f8b217273E7FCD7E86eF07D33972042E")

  return { esPoope, esPoopeBatchSender, vestWithPoopeOption, vestWithPlpOption, poopeVester, plpVester }
}

async function getAvaxValues() {
  const esPoope = await contractAt("EsPOOPE", "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17")
  const esPoopeBatchSender = await contractAt("EsPoopeBatchSender", "0xc9baFef924159138697e72899a2753a3Dc8D1F4d")
  const vestWithPoopeOption = "0x171a321A78dAE0CDC0Ba3409194df955DEEcA746"
  const vestWithPlpOption = "0x28863Dd19fb52DF38A9f2C6dfed40eeB996e3818"

  const poopeVester = await contractAt("Vester", "0x472361d3cA5F49c8E633FB50385BfaD1e018b445")
  const plpVester = await contractAt("Vester", "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A")

  return { esPoope, esPoopeBatchSender, vestWithPoopeOption, vestWithPlpOption, poopeVester, plpVester }
}

async function main() {
  const wallet = { address: "0x5F799f365Fa8A2B60ac0429C48B153cA5a6f0Cf8" }

  const values = network === "arbitrum" ? await getArbValues() : await getAvaxValues()
  const { esPoope, esPoopeBatchSender, vestWithPoopeOption, vestWithPlpOption, poopeVester, plpVester } = values

  const txns = await readCsv(inputFile)
  console.log("processing list", txns.length)

  const vestWithPoopeAccounts = []
  const vestWithPoopeAmounts = []

  const vestWithPlpAccounts = []
  const vestWithPlpAmounts = []

  let totalEsPoope = bigNumberify(0)

  for (let i = 0; i < txns.length; i++) {
    const txn = txns[i]
    if (txn.Method !== "Transfer") {
      continue
    }

    const amount = ethers.utils.parseUnits(txn.Quantity, 18)

    if (txn.To.toLowerCase() === vestWithPoopeOption.toLowerCase()) {
      vestWithPoopeAccounts.push(txn.From)
      vestWithPoopeAmounts.push(amount)
      totalEsPoope = totalEsPoope.add(amount)
    }

    if (txn.To.toLowerCase() === vestWithPlpOption.toLowerCase()) {
      vestWithPlpAccounts.push(txn.From)
      vestWithPlpAmounts.push(amount)
      totalEsPoope = totalEsPoope.add(amount)
    }
  }

  console.log("vestWithPoopeAccounts", vestWithPoopeAccounts.length)
  console.log("vestWithPlpAccounts", vestWithPlpAccounts.length)
  console.log("totalEsPoope", totalEsPoope.toString(), ethers.utils.formatUnits(totalEsPoope, 18))

  if (shouldSendTxns) {
    if (vestWithPoopeAccounts.length > 0) {
      await sendTxn(esPoopeBatchSender.send(poopeVester.address, 4, vestWithPoopeAccounts, vestWithPoopeAmounts), "esPoopeBatchSender.send(poopeVester)")
    }
    if (vestWithPlpAccounts.length > 0) {
      await sendTxn(esPoopeBatchSender.send(plpVester.address, 320, vestWithPlpAccounts, vestWithPlpAmounts), "esPoopeBatchSender.send(plpVester)")
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
