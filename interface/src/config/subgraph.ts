import { ARBITRUM, AVALANCHE, GOERLI_TESTNET, CRONOS } from "./chains";

export const SUBGRAPH_URLS = {
  [ARBITRUM]: {
    stats: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-arbitrum-referrals",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/gmx-vault",
  },

  [AVALANCHE]: {
    stats: "https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/stats",
    referrals: "https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/referrals",
    trades:"https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/trades",
  },

  [GOERLI_TESTNET]: {
    stats: "https://api.thegraph.com/subgraphs/name/alphamatesdev/goerli-gmx-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/alphamatesdev/goerli-gmx-referrals",
    trades:"https://api.thegraph.com/subgraphs/name/alphamatesdev/goerli-trades",
  },
  
  [CRONOS]: {
    stats: "https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/stats",
    referrals: "https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/referrals",
    trades:"https://graph-node.bluespade.xyz/subgraphs/name/graphprotocol/trades",
  },

  common: {
    chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
  },
};
