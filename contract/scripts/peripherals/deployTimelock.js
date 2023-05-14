const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

async function getArbValues() {
  const vault = await contractAt("Vault", "0x489ee077994B6658eAfA855C308275EAd8097C4A")
  const tokenManager = { address: "0xddDc546e07f1374A07b270b7d863371e575EA96A" }
  const plpManager = { address: "0x321F653eED006AD1C29D174e17d96351BDe22649" }

  const positionRouter = { address: "0x3D6bA331e3D9702C5e8A8d254e5d8a285F223aba" }
  const positionManager = { address: "0x956618e5B6996919eB6B943aBf36910DdabC9a0f" }
  const poope = { address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a" }

  return { vault, tokenManager, plpManager, positionRouter, positionManager, poope }
}

async function getAvaxValues() {
  const vault = await contractAt("Vault", "0x9e34FDE4Bf55061a1805C11654C21acCd34d511E")
  const tokenManager = { address: "0x63F2323eE76842397957Edfd65A39DAEb63cf801" }
  const plpManager = { address: "0x3a417b2949d59B129e5C6c0A52114335C780B9AE" }

  const positionRouter = { address: "0x195256074192170d1530527abC9943759c7167d8" }
  const positionManager = { address: "0xAaf69ca8d44d74EAD76a86f25001cfC44515e94E" }
  const poope = { address: "0x62edc0692BD897D2295872a9FFCac5425011c661" }

  return { vault, tokenManager, plpManager, positionRouter, positionManager, poope }
}

async function getGoerliValues() {
  const vault = await contractAt("Vault", "0x815688F3499aE6194A006EDB2185Fc0dd9Bd7463")
  const tokenManager = { address: "0x04CA48593f9cc59C1F6166aF57D2Eb00B231edc4" }
  const plpManager = { address: "0x803f874315Dd373D4F56cfD322386334a09aa39b" }

  const positionRouter = { address: "0x4aa1f522aC1a208DAde1Ca8500423971E7b634c7" }
  const positionManager = { address: "0x61c76EEfdB415355F8D3B60d20E4D91bF17Bd619" }
  const poope = { address: "0x2F85207AAfF05040e7fcE48c5ed80d01c4C38597" }

  return { vault, tokenManager, plpManager, positionRouter, positionManager, poope }
}

async function getCronosValues() {
  const vault = await contractAt("Vault", "0x26e5FbFbfd38a27D5777C9C9CC5543e687E637D8")
  const tokenManager = { address: "0x4038a0F91351A0C9168D293d86E8d10241BBaBe2" }
  const plpManager = { address: "0x32889DD3209b32fEc343A4c8081f54aBEFFC06b8" }

  const positionRouter = { address: "0xb8753D850Ee02103168428e8EE482936D9Cde045" }
  const positionManager = { address: "0x75be73dAB8EcF685DdA1701b23c12dBb8eDDf07b" }
  const poope = { address: "0x1542bA4CA0fb6D1B4476a933B292002fd1959A52" }

  return { vault, tokenManager, plpManager, positionRouter, positionManager, poope }
}

async function getValues() {
  if (network === "arbitrum") {
    return getArbValues()
  }

  if (network === "avax") {
    return getAvaxValues()
  }

  if (network === "goerli") {
    return getGoerliValues()
  }

  if (network === "cronos") {
    return getCronosValues()
  }
}

async function main() {
  const admin = "0x5d2E4189d0b273d7E7C289311978a0183B96C404";
  const buffer = 0 // 24 * 60 * 60 //1 day 86400
  const maxTokenSupply = expandDecimals("20000000", 18)

  const { vault, tokenManager, plpManager, positionRouter, positionManager, poope } = await getValues()
  const mintReceiver = tokenManager

  console.log("Timelock", {
    _admin: admin,
    _buffer: buffer,
    _tokenManager: tokenManager.address,
    _mintReceiver: mintReceiver.address,
    _plpManager: plpManager.address,
    _maxTokenSupply: maxTokenSupply,
    _marginFeeBasisPoints: 10, // marginFeeBasisPoints 0.1%
    _maxMarginFeeBasisPoints: 500 // maxMarginFeeBasisPoints 5%
  })

  const timelock = await deployContract("Timelock", [{
    _admin: admin,
    _buffer: buffer,
    _tokenManager: tokenManager.address,
    _mintReceiver: mintReceiver.address,
    _plpManager: plpManager.address,
    _maxTokenSupply: maxTokenSupply,
    _marginFeeBasisPoints: 10, // marginFeeBasisPoints 0.1%
    _maxMarginFeeBasisPoints: 500 // maxMarginFeeBasisPoints 5%
  }
  ], "Timelock")

  // const deployedTimelock = await contractAt("Timelock", timelock.address, signer)

  // await sendTxn(deployedTimelock.setShouldToggleIsLeverageEnabled(true), "deployedTimelock.setShouldToggleIsLeverageEnabled(true)")
  // await sendTxn(deployedTimelock.setContractHandler(positionRouter.address, true), "deployedTimelock.setContractHandler(positionRouter)")
  // await sendTxn(deployedTimelock.setContractHandler(positionManager.address, true), "deployedTimelock.setContractHandler(positionManager)")

  // // // update gov of vault
  // const vaultGov = await contractAt("Timelock", await vault.gov(), signer)

  // await sendTxn(vaultGov.signalSetGov(vault.address, deployedTimelock.address), "vaultGov.signalSetGov")
  // await sendTxn(deployedTimelock.signalSetGov(vault.address, vaultGov.address), "deployedTimelock.signalSetGov(vault)")

  // const signers = [
  //   "0x5d2E4189d0b273d7E7C289311978a0183B96C404"
  // ]

  // for (let i = 0; i < signers.length; i++) {
  //   const signer = signers[i]
  //   await sendTxn(deployedTimelock.setContractHandler(signer, true), `deployedTimelock.setContractHandler(${signer})`)
  // }

  // const keepers = [
  //   "0x5d2E4189d0b273d7E7C289311978a0183B96C404" // X
  // ]

  // for (let i = 0; i < keepers.length; i++) {
  //   const keeper = keepers[i]
  //   await sendTxn(deployedTimelock.setKeeper(keeper, true), `deployedTimelock.setKeeper(${keeper})`)
  // }

  // await sendTxn(deployedTimelock.signalApprove(poope.address, admin, "1000000000000000000"), "deployedTimelock.signalApprove")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
