import { Maybe } from '@metamask/providers/dist/utils'
import { ethers } from 'ethers'
import React, { useContext, useState, createContext, useEffect } from 'react'
import contractJSON from '../../artifacts/contracts/Greeter.sol/Greeter.json'

interface ContextProps {
  account: string
  setAccount: (account: string) => void
  isConnected: boolean
  setIsConnected: (isConnected: boolean) => void
  provider: ethers.providers.Web3Provider
  setProvider: (_provider: ethers.providers.Web3Provider) => void
  contract: ethers.Contract
  setContract: (_contract: ethers.Contract) => void
  signer: ethers.providers.JsonRpcSigner
  setSigner: (_signer: ethers.providers.JsonRpcSigner) => void
  contractAbi: ethers.ContractInterface
  contractAddress: string
}

interface ChildrenProps {
  children: React.ReactNode
}
const defaultValues = {} as ContextProps

const context = createContext<ContextProps>(defaultValues)

function ContextProvider({ children }: ChildrenProps) {
  const [account, setAccount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [contract, setContract] = useState<ethers.Contract>()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const contractAddress = '0xf9549900A5E1973c0E519c0b08bb6a0AD21ab6ED'
  const contractAbi = contractJSON.abi // what type should this be

  return (
    <context.Provider
      value={{
        account,
        setAccount,
        isConnected,
        setIsConnected,
        provider,
        setProvider,
        signer,
        setSigner,
        contract,
        setContract,
        contractAddress,
        contractAbi,
      }}
    >
      {children}
    </context.Provider>
  )
}

function useAppContext() {
  const _context = useContext(context)
  return _context
}

export { ContextProvider, useAppContext }
