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

    const PriceFeedExt = await deployContract("PriceFeedExt", ["DOGE Price by Pyth network", "8"])

    await sendTxn(PriceFeedExt.initialize(
        false, 
        "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
        "1000",
        "0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c",
        "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
        "DOGE",
        "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["DAI Price by Band protocol", "8"])
    // const PriceFeedExt = await contractAt("PriceFeedExt", "0x0F9A22f13f234373099B0D65368947e592bB0978");

    // await sendTxn(PriceFeedExt.initialize(
    //     true, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "DAI",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["USDT Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "USDT",
    //     "USD"), "PriceFeedExt.initialize")


    // const PriceFeedExt = await deployContract("PriceFeedExt", ["USDC Price by Pyth network", "8"])

    // await sendTxn(PriceFeedExt.initialize(
    //     false, 
    //     "0xe0d0e68297772dd5a1f1d99897c581e2082dba5b",
    //     "1000",
    //     "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    //     "0xDA7a001b254CD22e46d3eAB04d937489c93174C3",
    //     "USDC",
    //     "USD"), "PriceFeedExt.initialize")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });