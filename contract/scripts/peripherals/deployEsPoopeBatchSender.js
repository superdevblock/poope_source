const { getFrameSigner, deployContract, contractAt, sendTxn } = require("../shared/helpers")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

async function getArbValues() {
  const signer = await getFrameSigner()

  const esPoope = await contractAt("EsPOOPE", "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA")
  const esPoopeGov = await contractAt("Timelock", await esPoope.gov(), signer)
  const poopeVester = await contractAt("Vester", "0x199070DDfd1CFb69173aa2F7e20906F26B363004")
  const poopeVesterGov = await contractAt("Timelock", await poopeVester.gov(), signer)
  const plpVester = await contractAt("Vester", "0xA75287d2f8b217273E7FCD7E86eF07D33972042E")
  const plpVesterGov = await contractAt("Timelock", await plpVester.gov(), signer)

  return { esPoope, esPoopeGov, poopeVester, poopeVesterGov, plpVester, plpVesterGov }
}

async function getAvaxValues() {
  const signer = await getFrameSigner()

  const esPoope = await contractAt("EsPOOPE", "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17")
  const esPoopeGov = await contractAt("Timelock", await esPoope.gov(), signer)
  const poopeVester = await contractAt("Vester", "0x472361d3cA5F49c8E633FB50385BfaD1e018b445")
  const poopeVesterGov = await contractAt("Timelock", await poopeVester.gov(), signer)
  const plpVester = await contractAt("Vester", "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A")
  const plpVesterGov = await contractAt("Timelock", await plpVester.gov(), signer)

  return { esPoope, esPoopeGov, poopeVester, poopeVesterGov, plpVester, plpVesterGov }
}

async function main() {
  const method = network === "arbitrum" ? getArbValues : getAvaxValues
  const { esPoope, esPoopeGov, poopeVester, poopeVesterGov, plpVester, plpVesterGov } = await method()

  const esPoopeBatchSender = await deployContract("EsPoopeBatchSender", [esPoope.address])

  console.log("esPoope", esPoope.address)
  console.log("esPoopeGov", esPoopeGov.address)
  console.log("poopeVester", poopeVester.address)
  console.log("poopeVesterGov", poopeVesterGov.address)
  console.log("plpVester", plpVester.address)
  console.log("plpVesterGov", plpVesterGov.address)

  await sendTxn(esPoopeGov.signalSetHandler(esPoope.address, esPoopeBatchSender.address, true), "esPoopeGov.signalSetHandler")
  await sendTxn(poopeVesterGov.signalSetHandler(poopeVester.address, esPoopeBatchSender.address, true), "poopeVesterGov.signalSetHandler")
  await sendTxn(plpVesterGov.signalSetHandler(plpVester.address, esPoopeBatchSender.address, true), "plpVesterGov.signalSetHandler")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
