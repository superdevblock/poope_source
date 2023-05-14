import {
    BigInt,
    Address,
    ethereum
} from "@graphprotocol/graph-ts"

import {
    Swap as SwapEvent
} from "../generated/Router/Router"

import {
    Swap,
    Transaction
} from "../generated/schema"


function _getIdFromEvent(event: ethereum.Event): string {
    return event.transaction.hash.toHexString() + ':' + event.logIndex.toString()
}

export function handleSwap(event: SwapEvent): void {
    // let transaction = Transaction.load(txId)
    // if (transaction == null) {
    //   transaction = new Transaction(event.transaction.hash.toHexString())
    //   transaction.from = event.transaction.from.toHexString()
    //   transaction.to = event.transaction.to.toHexString()
    //   transaction.save()
    // }
  
  
    let id = _getIdFromEvent(event)
    let entity = new Swap(id)
  
    entity.tokenIn = event.params.tokenIn.toHexString()
    entity.tokenOut = event.params.tokenOut.toHexString()
    entity.account = event.params.account.toHexString()
  
    entity.amountIn = event.params.amountIn
    entity.amountOut = event.params.amountOut
    // entity.amountOutAfterFees = event.params.amountOutAfterFees
    // entity.feeBasisPoints = event.params.feeBasisPoints
  
    entity.transaction = event.transaction.hash.toHexString()
  
  
    entity.timestamp = event.block.timestamp.toI32()
  
    entity.save()
  
    // let decimals = getTokenDecimals(entity.tokenIn)
    // let denominator = BigInt.fromString("10").pow(decimals)
    // let volume = entity.amountIn * entity.tokenInPrice / denominator
    // _storeVolume("swap", event.block.timestamp, volume)
    // _storeVolumeBySource("swap", event.block.timestamp, event.transaction.to, volume)
    // _storeVolumeByToken("swap", event.block.timestamp, event.params.tokenIn, event.params.tokenOut, volume)
  
    // let fee = volume * entity.feeBasisPoints / BASIS_POINTS_DIVISOR
    // _storeFees("swap", event.block.timestamp, fee)
  
    // _storeUserAction(event.block.timestamp, event.transaction.from, "swap")
  }
  
