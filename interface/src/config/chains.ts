import { ethers } from "ethers";
import { isDevelopment } from "lib/legacy";

const { parseEther } = ethers.utils;

export const MAINNET = 25;
export const AVALANCHE = 43114;
export const TESTNET = 97;
export const ARBITRUM_TESTNET = 421611;
export const ARBITRUM = 42161;
export const GOERLI_TESTNET = 5;
export const CRONOS = 25;
export const ETHER_MAIN = 1;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = CRONOS;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

// export const SUPPORTED_CHAIN_IDS = [ARBITRUM, AVALANCHE];
export const SUPPORTED_CHAIN_IDS = [CRONOS];

if (isDevelopment()) {
  SUPPORTED_CHAIN_IDS.push(ARBITRUM_TESTNET);
}

export const IS_NETWORK_DISABLED = {
  [ARBITRUM]: true,
  [MAINNET]: true,
  [TESTNET]: true,
  [AVALANCHE]: true,
  [GOERLI_TESTNET]: true,
  [CRONOS]: true,
  [ETHER_MAIN]: false
};

export const CHAIN_NAMES_MAP = {
  [MAINNET]: "BSC",
  [TESTNET]: "BSC Testnet",
  [ARBITRUM_TESTNET]: "ArbRinkeby",
  [ARBITRUM]: "Arbitrum",
  [AVALANCHE]: "Avalanche",
  [GOERLI_TESTNET]: "Goerli",
  [CRONOS]: "Cronos",
  [ETHER_MAIN]: "Ethereum"
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [ARBITRUM]: "0",
  [AVALANCHE]: "3000000000", // 3 gwei
  [GOERLI_TESTNET]: "3000000000", // 3 gwei
  [CRONOS]: "3000000000", // 3 gwei
  [ETHER_MAIN]: "3000000000"
};

export const MAX_GAS_PRICE_MAP = {
  [AVALANCHE]: "200000000000", // 200 gwei
  [GOERLI_TESTNET]: "200000000000", // 200 gwei
  [CRONOS]: "5000000000000", // 5000 gwei
  [ETHER_MAIN]: "200000000000"
};

export const HIGH_EXECUTION_FEES_MAP = {
  [ARBITRUM]: 3, // 3 USD
  [AVALANCHE]: 3, // 3 USD
  [GOERLI_TESTNET]: 3, // 3 USD
  [CRONOS]: 3, // 3 USD
  [ETHER_MAIN]: 3, // 3 USD
};

const constants = {
  [MAINNET]: {
    nativeTokenSymbol: "BNB",
    defaultCollateralSymbol: "BUSD",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 8,
    v2: false,
  },

  [TESTNET]: {
    nativeTokenSymbol: "BNB",
    defaultCollateralSymbol: "BUSD",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 8,
    v2: false,
  },

  [ARBITRUM_TESTNET]: {
    nativeTokenSymbol: "ETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [ARBITRUM]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [AVALANCHE]: {
    nativeTokenSymbol: "AVAX",
    wrappedTokenSymbol: "WAVAX",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
  },

  [GOERLI_TESTNET]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
  },

  [CRONOS]: {
    nativeTokenSymbol: "CRO",
    wrappedTokenSymbol: "WCRO",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
  },

  [ETHER_MAIN]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
  },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const ARBITRUM_RPC_PROVIDERS = [getDefaultArbitrumRpcUrl()];
export const AVALANCHE_RPC_PROVIDERS = ["https://api.avax.network/ext/bc/C/rpc"]; // Avalanche MAINNET
export const GOERLI_RPC_PROVIDERS = ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]; // Goerli Test Network
export const CRONOS_RPC_PROVIDERS = ["https://cronos-evm.publicnode.com"]; //Cronos MAINNET
export const ETHER_RPC_PROVIDERS = ["https://mainnet.infura.io/v3/"]; //Ether MAINNET
// BSC TESTNET
// const RPC_PROVIDERS = [
//   "https://data-seed-prebsc-1-s1.binance.org:8545",
//   "https://data-seed-prebsc-2-s1.binance.org:8545",
//   "https://data-seed-prebsc-1-s2.binance.org:8545",
//   "https://data-seed-prebsc-2-s2.binance.org:8545",
//   "https://data-seed-prebsc-1-s3.binance.org:8545",
//   "https://data-seed-prebsc-2-s3.binance.org:8545"
// ]

export const BSC_RPC_PROVIDERS = [
  "https://bsc-dataseed.binance.org",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed2.defibit.io",
  "https://bsc-dataseed3.defibit.io",
  "https://bsc-dataseed4.defibit.io",
  "https://bsc-dataseed2.ninicoin.io",
  "https://bsc-dataseed3.ninicoin.io",
  "https://bsc-dataseed4.ninicoin.io",
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed2.binance.org",
  "https://bsc-dataseed3.binance.org",
  "https://bsc-dataseed4.binance.org",
];

export const RPC_PROVIDERS = {
  [MAINNET]: BSC_RPC_PROVIDERS,
  [ARBITRUM]: ARBITRUM_RPC_PROVIDERS,
  [AVALANCHE]: AVALANCHE_RPC_PROVIDERS,
  [GOERLI_TESTNET]: GOERLI_RPC_PROVIDERS,
  [CRONOS]: CRONOS_RPC_PROVIDERS,
  [ETHER_MAIN]: ETHER_RPC_PROVIDERS
};

export const FALLBACK_PROVIDERS = {
  [ARBITRUM]: [getAlchemyHttpUrl()],
  [AVALANCHE]: ["https://avax-mainnet.gateway.pokt.network/v1/lb/626f37766c499d003aada23b"],
  [GOERLI_TESTNET]: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  [CRONOS]: ["https://cronos-evm.publicnode.com"],
};

export const NETWORK_METADATA = {
  [MAINNET]: {
    chainId: "0x" + MAINNET.toString(16),
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: BSC_RPC_PROVIDERS,
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [TESTNET]: {
    chainId: "0x" + TESTNET.toString(16),
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
  [ARBITRUM_TESTNET]: {
    chainId: "0x" + ARBITRUM_TESTNET.toString(16),
    chainName: "Arbitrum Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/"],
  },
  [ARBITRUM]: {
    chainId: "0x" + ARBITRUM.toString(16),
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ARBITRUM_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(ARBITRUM)],
  },
  [AVALANCHE]: {
    chainId: "0x" + AVALANCHE.toString(16),
    chainName: "Avalanche",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: AVALANCHE_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(AVALANCHE)],
  },
  [GOERLI_TESTNET]: {
    chainId: "0x" + GOERLI_TESTNET.toString(16),
    chainName: "Goerli",
    nativeCurrency: {
      name: "goerliEth",
      symbol: "goerliEth",
      decimals: 18,
    },
    rpcUrls: GOERLI_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(GOERLI_TESTNET)],
  },
  [CRONOS]: {
    chainId: "0x" + CRONOS.toString(16),
    chainName: "Cronos",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    rpcUrls: CRONOS_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(CRONOS)],
  },
  [ETHER_MAIN]: {
    chainId: "0x" + ETHER_MAIN.toString(16),
    chainName: "Cronos",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    rpcUrls: ETHER_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(ETHER_MAIN)],
  },
};

export const getConstant = (chainId: number, key: string) => {
  if (!constants[chainId]) {
    throw new Error(`Unsupported chainId ${chainId}`);
  }

  if (!(key in constants[chainId])) {
    throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
  }

  return constants[chainId][key];
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getDefaultArbitrumRpcUrl() {
  return "https://arb1.arbitrum.io/rpc";
}

export function getAlchemyHttpUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "https://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getAlchemyWsUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "wss://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "wss://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getExplorerUrl(chainId) {
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  } else if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  } else if (chainId === MAINNET) {
    return "https://cronoscan.com/";
  } else if (chainId === TESTNET) {
    return "https://testnet.bscscan.com/";
  } else if (chainId === ARBITRUM_TESTNET) {
    return "https://testnet.arbiscan.io/";
  } else if (chainId === ARBITRUM) {
    return "https://arbiscan.io/";
  } else if (chainId === AVALANCHE) {
    return "https://snowtrace.io/";
  } else if (chainId === GOERLI_TESTNET) {
    return "https://goerli.etherscan.io/";
  } else if (chainId === CRONOS) {
    return "https://cronoscan.com/";
  } else if (chainId === ETHER_MAIN) {
    return "https://etherscan.io/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
