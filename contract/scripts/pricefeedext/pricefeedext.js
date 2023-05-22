const { utils } = require("ethers");
const crypto = require( 'crypto' );
const { deployContract, contractAt , sendTxn } = require("../shared/helpers")

async function main() {
    // const PriceFeedExt = await deployContract("PriceFeedExt", ["CRO Price by Band protocol", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     true, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0x23199c2bcb1303f667e733b9934db9eca5991e765b45f5ed18bc4b231415f2fe",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "CRO",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["ETH Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "ETH",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["BTC Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "BTC",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["ATOM Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "ETH",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["ADA Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "ADA",
    //     "USD"), "PriceFeedExt.initialize")

    const PriceFeedExt_pepe = await deployContract("PriceFeedExt", ["PEPE Price by UniSwap V2", "18"]);
    await sendTxn(PriceFeedExt_pepe.initialize(
        "0x6982508145454ce325ddbe47a25d4ec3d2311933", 
        "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f",

        "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ), "PriceFeedExt.initialize");

    const PriceFeedExt_wojak = await deployContract("PriceFeedExt", ["WOJAK Price by UniSwap V2", "18"]);
    await sendTxn(PriceFeedExt_wojak.initialize(
        "0x5026f006b85729a8b14553fae6af249ad16c9aab", 
        "0x0f23d49bc92ec52ff591d091b3e16c937034496e",

        "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ), "PriceFeedExt.initialize");

    const PriceFeedExt_mong = await deployContract("PriceFeedExt", ["MONG Price by UniSwap V2", "18"]);
    await sendTxn(PriceFeedExt_bob.initialize(
        "0x1ce270557c1f68cfb577b856766310bf8b47fd9c", 
        "0x7054b0f980a7eb5b3a6b3446f3c947d80162775c",

        "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ), "PriceFeedExt.initialize");

    const PriceFeedExt_ladys = await deployContract("PriceFeedExt", ["LADYS Price by UniSwap V2", "18"]);
    await sendTxn(PriceFeedExt_ladys.initialize(
        "0x12970e6868f88f6557b76120662c1b3e50a646bf", 
        "0xcbe856765eeec3fdc505ddebf9dc612da995e593",

        "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ), "PriceFeedExt.initialize");

    const PriceFeedExt_bob = await deployContract("PriceFeedExt", ["BOB Price by UniSwap V2", "18"]);
    await sendTxn(PriceFeedExt_bob.initialize(
        "0x7d8146cf21e8d7cbe46054e01588207b51198729", 
        "0xbe8bc29765e11894f803906ee1055a344fdf2511",

        "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ), "PriceFeedExt.initialize");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });