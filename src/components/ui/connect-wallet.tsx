import * as React from "react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from "./button"

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button 
        variant="outline" 
        onClick={() => disconnect()}
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    )
  }

  return (
    <Button 
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect Wallet
    </Button>
  )
} 