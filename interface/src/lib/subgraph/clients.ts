import { createClient } from "./utils";
import { SUBGRAPH_URLS } from "config/subgraph";
import { ARBITRUM, ARBITRUM_TESTNET, AVALANCHE, GOERLI_TESTNET, CRONOS } from "config/chains";

export const chainlinkClient = createClient(SUBGRAPH_URLS.common.chainLink);

export const arbitrumGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].stats);
export const arbitrumReferralsGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].referrals);
export const nissohGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].nissohVault);

export const avalancheGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].stats);
export const avalancheReferralsGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].referrals);
export const avalancheGraphClientForTrades = createClient(SUBGRAPH_URLS[AVALANCHE].trades);

export const goerliGraphClient = createClient(SUBGRAPH_URLS[GOERLI_TESTNET].stats);
export const goerliReferralsGraphClient = createClient(SUBGRAPH_URLS[GOERLI_TESTNET].referrals);
export const goerliGraphClientForTrades = createClient(SUBGRAPH_URLS[GOERLI_TESTNET].trades);

export const cronosGraphClient = createClient(SUBGRAPH_URLS[CRONOS].stats);
export const cronosReferralsGraphClient = createClient(SUBGRAPH_URLS[CRONOS].referrals);
export const cronosGraphClientForTrades = createClient(SUBGRAPH_URLS[CRONOS].trades);

export function getGmxGraphClient(chainId: number) {
  if (chainId === ARBITRUM) {
    return arbitrumGraphClient;
  } else if (chainId === AVALANCHE) {
    return avalancheGraphClient;
  } else if (chainId === ARBITRUM_TESTNET) {
    return null;
  } else if (chainId === GOERLI_TESTNET) {
    return goerliGraphClient;
  } else if (chainId === CRONOS) {
    return cronosGraphClient;
  }

  throw new Error(`Unsupported chain ${chainId}`);
}
