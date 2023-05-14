import { BigInt, TypedMap } from "@graphprotocol/graph-ts"
import {
  ChainlinkPrice,
  UniswapPrice
} from "../generated/schema"

export let BASIS_POINTS_DIVISOR = BigInt.fromI32(10000)
export let PRECISION = BigInt.fromI32(10).pow(30)

export let WCRO = "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23"
export let WBTC = "0x062e66477faf219f25d27dced647bf57c3107d52"
export let WETH = "0xe44fd7fcb2b1581822d0c862b68222998a0c299a"
export let ATOM = "0xb888d8dd1733d72681b30c00ee76bde93ae7aa93"
export let DAI = "0xf2001b145b43032aaf5ee2884e456ccd805f677d"
export let USDT = "0x66e428c3f67a68878562e79a0234c1f83c208770"
export let USDC = "0xc21223249ca28397b4b6541dffaecc539bff0c59"

export let BLU = "0x1542ba4ca0fb6d1b4476a933b292002fd1959a52"

export function timestampToDay(timestamp: BigInt): BigInt {
  return timestampToPeriod(timestamp, "daily")
}

export function timestampToPeriod(timestamp: BigInt, period: string): BigInt {
  let periodTime: BigInt

  if (period == "daily") {
    periodTime = BigInt.fromI32(86400)
  } else if (period == "hourly") {
    periodTime = BigInt.fromI32(3600)
  } else if (period == "weekly" ){
    periodTime = BigInt.fromI32(86400 * 7)
  } else {
    throw new Error("Unsupported period " + period)
  }

  return timestamp / periodTime * periodTime
}

export function getTokenDecimals(token: String): u8 {
  let tokenDecimals = new Map<String, i32>()
  tokenDecimals.set(WCRO, 18)
  tokenDecimals.set(WBTC, 8)
  tokenDecimals.set(WETH, 18)
  tokenDecimals.set(ATOM, 6)
  tokenDecimals.set(DAI, 18)
  tokenDecimals.set(USDT, 6)
  tokenDecimals.set(USDC, 6)

  return tokenDecimals.get(token) as u8
}

export function getTokenAmountUsd(token: String, amount: BigInt): BigInt {
  let decimals = getTokenDecimals(token)
  let denominator = BigInt.fromI32(10).pow(decimals)
  let price = getTokenPrice(token)
  return amount * price / denominator
}

export function getTokenPrice(token: String): BigInt {
  // if (token == BTC_B) {
  //   token = BTC
  // }

  if (token != BLU) {
    let chainlinkPriceEntity = ChainlinkPrice.load(token)
    if (chainlinkPriceEntity != null) {
      // all chainlink prices have 8 decimals
      // adjusting them to fit BLU 30 decimals USD values
      return chainlinkPriceEntity.value * BigInt.fromI32(10).pow(22)
    }
  }

  if (token == BLU) {
    let uniswapPriceEntity = UniswapPrice.load(BLU)

    if (uniswapPriceEntity != null) {
      return uniswapPriceEntity.value
    }
  }

  let prices = new TypedMap<String, BigInt>()
  prices.set(WCRO, BigInt.fromI32(100) * PRECISION)
  prices.set(WBTC, BigInt.fromI32(30000) * PRECISION)
  prices.set(WETH, BigInt.fromI32(2000) * PRECISION)
  prices.set(ATOM, BigInt.fromI32(10) * PRECISION)
  prices.set(DAI, PRECISION)
  prices.set(USDT, PRECISION)
  prices.set(USDC, PRECISION)

  prices.set(BLU, BigInt.fromI32(1) * PRECISION)
  return prices.get(token) as BigInt
}
