import { ARBITRUM, ARBITRUM_TESTNET, AVALANCHE, GOERLI_TESTNET, CRONOS, MAINNET, TESTNET } from "./chains";

export const XGMT_EXCLUDED_ACCOUNTS = [
  "0x330eef6b9b1ea6edd620c825c9919dc8b611d5d5",
  "0xd9b1c23411adbb984b1c4be515fafc47a12898b2",
  "0xa633158288520807f91ccc98aa58e0ea43acb400",
  "0xffd0a93b4362052a336a7b22494f1b77018dd34b",
];

const CONTRACTS = {
  [MAINNET]: {
    // bsc mainnet
    Treasury: "0xa44E7252a0C137748F523F112644042E5987FfC7",
    BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    GMT: "0x99e92123eB77Bc8f999316f622e5222498438784",
    Vault: "0xc73A8DcAc88498FD4b4B1b2AaA37b0a2614Ff67B",
    Router: "0xD46B23D042E976F8666F554E928e0Dc7478a8E1f",
    Reader: "0x087A618fD25c92B61254DBe37b09E5E8065FeaE7",
    AmmFactory: "0xBCfCcbde45cE874adCB698cC183deBcF17952812",
    AmmFactoryV2: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    OrderBook: "0x1111111111111111111111111111111111111111",
    OrderBookReader: "0x1111111111111111111111111111111111111111",
    GmxMigrator: "0xDEF2af818514c1Ca1A9bBe2a4D45E28f260063f9",
    USDG: "0x85E76cbf4893c1fbcB34dCF1239A91CE2A4CF5a7",
    NATIVE_TOKEN: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    XGMT: "0xe304ff0983922787Fd84BC9170CD21bF78B16B10",
    GMT_USDG_PAIR: "0xa41e57459f09a126F358E118b693789d088eA8A0",
    XGMT_USDG_PAIR: "0x0b622208fc0691C2486A3AE6B7C875b4A174b317",
    GMT_USDG_FARM: "0x3E8B08876c791dC880ADC8f965A02e53Bb9C0422",
    XGMT_USDG_FARM: "0x68D7ee2A16AB7c0Ee1D670BECd144166d2Ae0759",
    USDG_YIELD_TRACKER: "0x0EF0Cf825B8e9F89A43FfD392664131cFB4cfA89",
    XGMT_YIELD_TRACKER: "0x82A012A9b3003b18B6bCd6052cbbef7Fa4892e80",
    GMT_USDG_FARM_TRACKER_XGMT: "0x08FAb024BEfcb6068847726b2eccEAd18b6c23Cd",
    GMT_USDG_FARM_TRACKER_NATIVE: "0xd8E26637B34B2487Cad1f91808878a391134C5c2",
    XGMT_USDG_FARM_TRACKER_XGMT: "0x026A02F7F26C1AFccb9Cba7C4df3Dc810F4e92e8",
    XGMT_USDG_FARM_TRACKER_NATIVE: "0x22458CEbD14a9679b2880147d08CA1ce5aa40E84",
    AUTO: "0xa184088a740c695E156F91f5cC086a06bb78b827",
    AUTO_USDG_PAIR: "0x0523FD5C53ea5419B4DAF656BC1b157dDFE3ce50",
    AUTO_USDG_FARM: "0xE6958298328D02051769282628a3b4178D0F3A47",
    AUTO_USDG_FARM_TRACKER_XGMT: "0x093b8be41c1A30704De84a9521632f9a139c08bd",
    AUTO_USDG_FARM_TRACKER_NATIVE: "0x23ed48E5dce3acC7704d0ce275B7b9a0e346b63A",
    GMT_GMX_IOU: "0x47052469970C2484729875CC9E2dd2683fcE71fb",
    XGMT_GMX_IOU: "0xeB3733DFe3b68C9d26898De2493A3Bb59FDb4A7B",
    GMT_USDG_GMX_IOU: "0x481312655F81b5e249780A6a49735335BF6Ca7f4",
    XGMT_USDG_GMX_IOU: "0x8095F1A92526C304623483018aA28cC6E62EB1e1",
  },
  [TESTNET]: {
    // bsc testnet
    Vault: "0x1B183979a5cd95FAF392c8002dbF0D5A1C687D9a",
    Router: "0x10800f683aa564534497a5b67F45bE3556a955AB",
    Reader: "0x98D4742F1B6a821bae672Cd8721283b91996E454",
    AmmFactory: "0x6725f303b657a9451d8ba641348b6761a6cc7a17",
    AmmFactoryV2: "0x1111111111111111111111111111111111111111",
    OrderBook: "0x9afD7B4f0b58d65F6b2978D3581383a06b2ac4e9",
    OrderBookReader: "0x0713562970D1A802Fa3FeB1D15F9809943982Ea9",
    GmxMigrator: "0xDEF2af818514c1Ca1A9bBe2a4D45E28f260063f9",
    USDG: "0x2D549bdBf810523fe9cd660cC35fE05f0FcAa028",
    GMT: "0xedba0360a44f885ed390fad01aa34d00d2532817",
    NATIVE_TOKEN: "0x612777Eea37a44F7a95E3B101C39e1E2695fa6C2",
    XGMT: "0x28cba798eca1a3128ffd1b734afb93870f22e613",
    GMT_USDG_PAIR: "0xe0b0a315746f51932de033ab27223d85114c6b85",
    XGMT_USDG_PAIR: "0x0108de1eea192ce8448080c3d90a1560cf643fa0",
    GMT_USDG_FARM: "0xbe3cB06CE03cA692b77902040479572Ba8D01b0B",
    XGMT_USDG_FARM: "0x138E92195D4B99CE3618092D3F9FA830d9A69B4b",
    USDG_YIELD_TRACKER: "0x62B49Bc3bF252a5DB26D88ccc7E61119e3179B4f",
    XGMT_YIELD_TRACKER: "0x5F235A582e0993eE9466FeEb8F7B4682993a57d0",
    GMT_USDG_FARM_TRACKER_XGMT: "0x4f8EE3aE1152422cbCaFACd4e3041ba2D859913C",
    GMT_USDG_FARM_TRACKER_NATIVE: "0xd691B26E544Fe370f39A776964c991363aF72e56",
    XGMT_USDG_FARM_TRACKER_XGMT: "0xfd5617CFB082Ba9bcD62d654603972AE312bC695",
    XGMT_USDG_FARM_TRACKER_NATIVE: "0x0354387DD85b7D8aaD1611B3D167A384d6AE0c28",
    GMT_GMX_IOU: "0x47052469970C2484729875CC9E2dd2683fcE71fb",
    XGMT_GMX_IOU: "0xeB3733DFe3b68C9d26898De2493A3Bb59FDb4A7B",
    GMT_USDG_GMX_IOU: "0x481312655F81b5e249780A6a49735335BF6Ca7f4",
    XGMT_USDG_GMX_IOU: "0x8095F1A92526C304623483018aA28cC6E62EB1e1",
  },
  [ARBITRUM_TESTNET]: {
    // arbitrum testnet
    Vault: "0xBc9BC47A7aB63db1E0030dC7B60DDcDe29CF4Ffb",
    Router: "0xe0d4662cdfa2d71477A7DF367d5541421FAC2547",
    VaultReader: "0xFc371E380262536c819D12B9569106bf032cC41c",
    Reader: "0x2E093c70E3A7E4919611d2555dFd8D697d2fC0a1",
    GlpManager: "0xD875d99E09118d2Be80579b9d23E83469077b498",
    RewardRouter: "0x0000000000000000000000000000000000000000",
    RewardReader: "0x0000000000000000000000000000000000000000",
    NATIVE_TOKEN: "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
    GLP: "0xb4f81Fa74e06b5f762A104e47276BA9b2929cb27",
    GMX: "0x0000000000000000000000000000000000000000",
    ES_GMX: "0x0000000000000000000000000000000000000000",
    BN_GMX: "0x0000000000000000000000000000000000000000",
    USDG: "0xBCDCaF67193Bf5C57be08623278fCB69f4cA9e68",
    ES_GMX_IOU: "0x0000000000000000000000000000000000000000",
    StakedGmxTracker: "0x0000000000000000000000000000000000000000",
    BonusGmxTracker: "0x0000000000000000000000000000000000000000",
    FeeGmxTracker: "0x0000000000000000000000000000000000000000",
    StakedGlpTracker: "0x0000000000000000000000000000000000000000",
    FeeGlpTracker: "0x0000000000000000000000000000000000000000",

    StakedGmxDistributor: "0x0000000000000000000000000000000000000000",
    StakedGlpDistributor: "0x0000000000000000000000000000000000000000",

    GmxVester: "0x0000000000000000000000000000000000000000",
    GlpVester: "0x0000000000000000000000000000000000000000",

    OrderBook: "0xebD147E5136879520dDaDf1cA8FBa48050EFf016",
    OrderBookReader: "0xC492c8d82DC576Ad870707bb40EDb63E2026111E",

    PositionRouter: "0xB4bB78cd12B097603e2b55D2556c09C17a5815F8",
    PositionManager: "0x168aDa266c2f10C1F37973B213d6178551030e44",

    // UniswapGmxEthPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E",
    ReferralStorage: "0x0000000000000000000000000000000000000000",
    ReferralReader: "0x0000000000000000000000000000000000000000",
  },
  [ARBITRUM]: {
    // arbitrum mainnet
    Vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
    Router: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
    VaultReader: "0xfebB9f4CAC4cD523598fE1C5771181440143F24A",
    Reader: "0x2b43c90D1B727cEe1Df34925bcd5Ace52Ec37694",
    GlpManager: "0x321F653eED006AD1C29D174e17d96351BDe22649",
    RewardRouter: "0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1",
    RewardReader: "0x8BFb8e82Ee4569aee78D03235ff465Bd436D40E0",
    NATIVE_TOKEN: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    GLP: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
    GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    ES_GMX: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
    BN_GMX: "0x35247165119B69A40edD5304969560D0ef486921",
    USDG: "0x45096e7aA921f27590f8F19e457794EB09678141",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954",
    StakedGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    BonusGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    FeeGmxTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
    StakedGlpTracker: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
    FeeGlpTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",

    StakedGmxDistributor: "0x23208B91A98c7C1CD9FE63085BFf68311494F193",
    StakedGlpDistributor: "0x60519b48ec4183a61ca2B8e37869E675FD203b34",

    GmxVester: "0x199070DDfd1CFb69173aa2F7e20906F26B363004",
    GlpVester: "0xA75287d2f8b217273E7FCD7E86eF07D33972042E",

    OrderBook: "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB",
    OrderExecutor: "0x7257ac5D0a0aaC04AA7bA2AC0A6Eb742E332c3fB",
    OrderBookReader: "0xa27C20A7CF0e1C68C0460706bB674f98F362Bc21",

    PositionRouter: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
    PositionManager: "0x75E42e6f01baf1D6022bEa862A28774a9f8a4A0C",

    UniswapGmxEthPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E",
    ReferralStorage: "0xe6fab3f0c7199b0d34d7fbe83394fc0e0d06e99d",
    ReferralReader: "0x8Aa382760BCdCe8644C33e6C2D52f6304A76F5c8",
  },
  // [AVALANCHE]: {
  //   // avalanche
  //   Vault: "0x9ab2De34A33fB459b538c43f251eB825645e8595",
  //   Router: "0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8",
  //   VaultReader: "0x66eC8fc33A26feAEAe156afA3Cb46923651F6f0D",
  //   Reader: "0x2eFEE1950ededC65De687b40Fd30a7B5f4544aBd",
  //   GlpManager: "0xe1ae4d4b06A5Fe1fc288f6B4CD72f9F8323B107F",
  //   RewardRouter: "0x82147C5A7E850eA4E28155DF107F2590fD4ba327",
  //   RewardReader: "0x04Fc11Bd28763872d143637a7c768bD96E44c1b6",
  //   NATIVE_TOKEN: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  //   GLP: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
  //   GMX: "0x62edc0692BD897D2295872a9FFCac5425011c661",
  //   ES_GMX: "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17",
  //   BN_GMX: "0x8087a341D32D445d9aC8aCc9c14F5781E04A26d2",
  //   USDG: "0xc0253c3cC6aa5Ab407b5795a04c28fB063273894",
  //   ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

  //   StakedGmxTracker: "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342",
  //   BonusGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
  //   FeeGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
  //   StakedGlpTracker: "0x9e295B5B976a184B14aD8cd72413aD846C299660",
  //   FeeGlpTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",

  //   StakedGmxDistributor: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
  //   StakedGlpDistributor: "0xDd593Cf40734199afc9207eBe9ffF23dA4Bf7720",

  //   GmxVester: "0x472361d3cA5F49c8E633FB50385BfaD1e018b445",
  //   GlpVester: "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A",

  //   OrderBook: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
  //   OrderExecutor: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
  //   OrderBookReader: "0xccFE3E576f8145403d3ce8f3c2f6519Dae40683B",

  //   PositionRouter: "0xffF6D276Bc37c61A23f06410Dce4A400f66420f8",
  //   PositionManager: "0xA21B83E579f4315951bA658654c371520BDcB866",

  //   TraderJoeGmxAvaxPool: "0x0c91a070f862666bbcce281346be45766d874d98",
  //   ReferralStorage: "0x827ed045002ecdabeb6e2b0d1604cf5fc3d322f8",
  //   ReferralReader: "0x505Ce16D3017be7D76a7C2631C0590E71A975083",
  // },
  [AVALANCHE]: {
    // avalanche
    Vault: "0x2a5bae3eaec36d147dFE859b1a68F1A5eCCB0dd5",//replaced 0x9e34FDE4Bf55061a1805C11654C21acCd34d511E
    Router: "0x8F16166be2B3a778AbBA0EbaaeC8f6bd8d4aD705",//replaced 0x6A154CE91003Cf4b8787280fd7C96D9BFb3f88C3
    VaultReader: "0xD9193457a09fA7a16e3B628129F43C1D0Ff6c6eD",//replaced 0x9DFEbCA2fa5318093016892dC772CC7132dDcE43
    Reader: "0x5921A3E1545A374C20Ab1f7413d78B3815b667dA",//replaced 0x8D88Aa3F648e751f989E528a32577Ee434B8e47F
    GlpManager: "0x9d530DdC986bd20beC3E70dC5382dF2e0a1bE7a6",//replaced 0x3a417b2949d59B129e5C6c0A52114335C780B9AE
    RewardRouter: "0x6E53C1cDA69858B02779FA2656F8C19a933CB9e0",//replaced 0x0AB63435EbA15CCedb44d86Cf3e2f1d8DBeB9e08
    RewardReader: "0xC1aEad06886edaBE97e068800EF2877568C2fFAf",//replaced 0x4Ee70052E9c64602Ab96a2A61850E72A051bbd89
    NATIVE_TOKEN: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    GLP: "0x0E2b5428CE48c87a33Ad55A14d3b79BC7300C241",//replaced 0xA63FbC76dDaf2F800B3699a4a46C5f260E04050C
    GMX: "0xDc2C540Fd99eb5dC424095C8C6A63f7c805D46e9", //replaced 0x39E1Da9a034Fd5ADba01C7F6cFA8B5dE16dD908c
    ES_GMX: "0xafb5b77201aF3afbeE2b25c76b2DcE618a65d3bf",//replaced 0x6CdEf99C74CcF3FA65211fF547Be5dDB4A73770C
    BN_GMX: "0xE7807Af3c341CeA2f02a414e444aAD85B4D3d6df",//replaced 0x6e29e6db1Ea778fCC17BA575C8fB22A4dfeAE08f
    USDG: "0xCFc3be74C254Ca3F6B029780F804CE1289793756", //replaced 0x775003195F41AFa4f75F751c35F06B3dF76F8e04
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

    StakedGmxTracker: "0x81d201D05162B2E5f6B990E5950841651066438B",//replaced 0x48d7f4529f6149c5EB96AeF38534b90AD7562b4d
    BonusGmxTracker: "0xBb694c9D5454CbFbA8f2befde84204c7FD4D3bc5",//replaced 0xC5fcC14560781C4c9FD55d7466d781539177A3a4
    FeeGmxTracker: "0x71fbf7C63a196CE008aAbd2f9BB68619bFb3A837",//replaced 0xb31018C29500a565e511a0800dA87e1457CdE9b1
    StakedGlpTracker: "0x508a28d2d6B866cA6DE03044D32FE05E8672d55E",//replaced 0x8b498C45465f4a7e9CEc0D12Aa6a695A6b563A34
    FeeGlpTracker: "0xacE33f27a278f110CCcAedaD77481DE1598793b1",//replaced 0x82b84dc1A46D43747496E62BBEE2c70Ef8EE4EAD

    StakedGmxDistributor: "0xa7256d891F294866Bc060c764C1B3c15b66C798B",//replaced 0x4e11F35A9c226be709078787cC44375FD7c22424
    StakedGlpDistributor: "0x9a8fe3cCe5ca1470D213aFcb0C04ba46525c631F",//replaced 0x7ed80C511359db0E34e2FbF14aB12Ee9AfAB0Baa

    GmxVester: "0x57Ff6E61E703293742F1a4aF22262582E03429cb",//replaced 0x957C9a17fc5A5Fda190D1Bc4Fc1AF2B6282C2743
    GlpVester: "0x9024C2ac08c250fCACD1c6D60D7321c759af2cd5",//replaced 0xcf920DC4df556267A82783c4647cbe9Ce55cB1A2

    OrderBook: "0x2cd0640F9bA7C0a0306C92a674be4f89eF89cE80",//replaced 0xA76fB4882bcb66fBe68948B71eBe7f3B80e329Ea
    OrderExecutor: "0xA76fB4882bcb66fBe68948B71eBe7f3B80e329Ea",//replaced
    OrderBookReader: "0xD44d5D7605c388bE8A9eeEBc37Ba24188CD1e634",//replaced 0x1d47908DC429b00611bd11AF78A7D39E7Dc6bCa2

    PositionRouter: "0xA8A8ef28cE7cDC25319f0E13fD8245F26caf8849",//replaced 0xD3D403595ccBB99537Af13099aC89A102AAd70D1
    PositionManager: "0xda18A5372fF256314fd3654FA074B4d949aBE823",//replaced 0xD5326A526f78667375D9D5dA7C739e261Df52fe6

    TraderJoeGmxAvaxPool: "0x153DA2C6B4Ed40B4C67a8c95EE45E93B5c85786F",//replaced
    ReferralStorage: "0xF51Def0A8A991E2Aa227643271d290c2DAa8cFCe",//replaced 0xa4Ac7025c01e8fa2bfB7f274913e76b5d4d719de
    ReferralReader: "0x69A0542B67622056B401159360692b1011B23B87",//replaced 0xDe0D6DbCCB35b92e0952C51ddDD81C7A86C5E480
  },
  [GOERLI_TESTNET]: {
    // goerli
    Vault: "0xDAaD544a99cE12348375f7eE87ED7E135df6c251",
    Router: "0xE28bc7762065B8c20C780E3B9e2562EE7b994465",
    VaultReader: "0x0e46636862C0507FbDB8bD93B15f7745E8dbcEdc",
    Reader: "0x56a79960d02456De0434D55ef65FA90BF39dbA20",
    GlpManager: "0x3c689f719D1a6f1F3679f629bde2cb08742014Cf",
    RewardRouter: "0xDf16a652Cd152edb8F8b139C7E20576465f73632",
    RewardReader: "0x7D45596211F09c0AdBceB0f02f1BF6E1926f5BA6",
    NATIVE_TOKEN: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    GLP: "0xAd20dbA3AC166690d9d2cf2624eb9af6892FA27B",
    GMX: "0x2F85207AAfF05040e7fcE48c5ed80d01c4C38597",
    ES_GMX: "0x57E040359Be0a5B4b0A2f98D6651BffAa5e1E0E1",
    BN_GMX: "0x90d189AD74D5B286653b5865f59B9fE99af8a96a",
    USDG: "0x049276CB253F73C052ADEc1D22288c75Bf2095f4",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

    StakedGmxTracker: "0x5f919c59dcdb9419daFc0F5272C53bed20f3cfB3",
    BonusGmxTracker: "0x72b67a834662302d141a31C18dce72EE9705fe8A",
    FeeGmxTracker: "0x98eee67707C98efD2aD51caaa52E28b57f8d3001",
    StakedGlpTracker: "0x73FA13a46e55176D5FA9Ee75A74887492CFC85de",
    FeeGlpTracker: "0xFB2Ac7632BCfA9E3DD160B00F9CBcbaf53B2F48d",

    StakedGmxDistributor: "0x1087a968c88b2E903834598cc33fbB138F398b09",
    StakedGlpDistributor: "0x02eaf961fA00519210AAE896638478bd793685ae",

    GmxVester: "0xf93ea218A14f14BFfeA0Ef9b0628890ecFcafbF5",
    GlpVester: "0xD2d115640dd906b517622e784E6B205C53A93500",

    OrderBook: "0x2D8BF359Fe5969448bE386BE0C66A9111c1Dd8e1",
    OrderExecutor: "0xA76fB4882bcb66fBe68948B71eBe7f3B80e329Ea",//replaced //unused
    OrderBookReader: "0x3C54B4fE089472A7F963A0803278f0eC2632014F",

    PositionRouter: "0xa0b9783C1cBf4096AC8D5876920855F333D58c2f", 
    PositionManager: "0x38ba6Ae837450612E787AD7f2A72D13B048c300F",

    TraderJoeGmxAvaxPool: "0xAb9176a0A6263871c3b6A531724e09e38277663C",//replaced
    ReferralStorage: "0x990B504aa9717870b9D5C28320af8ce4B59a5A9F",
    ReferralReader: "0xF7D307012282496541ec698E57C1F4b082B73a21",
  },
  [CRONOS]: {
    // cronos
    Vault: "0x26e5FbFbfd38a27D5777C9C9CC5543e687E637D8",
    Router: "0x1e5e40bD56AE9f411f628200606f60dfD486323d",
    VaultReader: "0xBe52Ec73A8336407e77707FB493dC04a2a137584",
    Reader: "0xefC907F78f8e10B9d3f5a4d0C4B2c39cB5e6bF6A",
    GlpManager: "0x32889DD3209b32fEc343A4c8081f54aBEFFC06b8",
    RewardRouter: "0x7Eb3e37842D46474B7E4206291f361e6353E3560",
    RewardReader: "0x4f7B5E7500F0Dd8Ac315aCc249350f89346Cb9c9",
    NATIVE_TOKEN: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    GLP: "0xB4d8D3B6b165091bf7A03744442960C771ccE3F0",
    GMX: "0x1542ba4ca0fb6d1b4476a933b292002fd1959a52",
    ES_GMX: "0x7B0f4CE052cB9819f9c972A498457bfdC95913E1",
    BN_GMX: "0x5772ad251EFaE60083AF3542A0281271cEbe5E17",
    USDG: "0x630D0DCd6db1Bd8BF7b261304A7f508b34f43675",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

    StakedGmxTracker: "0x3209363F27eA6D76F581c25EFE5E1806F3b08722",
    BonusGmxTracker: "0x3752CbE688277c246E05c3FAe224ffd55a56bafa",
    FeeGmxTracker: "0x32E3052C8c3C3f19b3B872a9D62a4379464229d7",
    StakedGlpTracker: "0x9645320E8323aE2F4e1Ecf9c6E93eb56e4Da09Ba",
    FeeGlpTracker: "0xD90B4A81a44C9BF2eb98102eE0959622C6D07f0C",

    StakedGmxDistributor: "0x9Db287aeF735802a73ffdABe8D50AF0560C5b140",
    StakedGlpDistributor: "0x6Dc02f0547FfaBAEAFE230Ab26cD467b630e4a99",

    GmxVester: "0x9c8147f8f4574Ce3BDDB68B4F49D925cE4D81AD6",
    GlpVester: "0xe10f426988A30197446eEf88373C7E012Cb81a07",

    OrderBook: "0xe68C423AdcD64Db9827d97EB475074f758Ed97D8",
    OrderExecutor: "0xA76fB4882bcb66fBe68948B71eBe7f3B80e329Ea",//replaced //unused
    OrderBookReader: "0xD0bFe21E6040010eA7521E5D4EBB6c7aD7639c0C",

    PositionRouter: "0x898dECf055b9236F6E6062080bc5d11C958CfB0b", 
    PositionManager: "0x75be73dAB8EcF685DdA1701b23c12dBb8eDDf07b",

    TraderJoeGmxAvaxPool: "0x0a740F670F2234e746c36E9C503040534513Ed48",//replaced
    ReferralStorage: "0xA9daCb8294a17bF278119ADE901D388CC1D0DC7A",
    ReferralReader: "0x9AE999CB837D3AE4948A3e235BEeafAdcF84A61f",
  },
};

export function getContract(chainId: number, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
