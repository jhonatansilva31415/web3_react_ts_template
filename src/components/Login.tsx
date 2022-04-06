import React, { useEffect } from 'react'
import { useAppContext } from '../context'
import { ethers } from 'ethers'

const Login = () => {
  const {
    isConnected,
    setIsConnected,
    account,
    setAccount,
    provider,
    setProvider,
    signer,
    setSigner,
    contract,
    setContract,
    contractAbi,
    contractAddress,
  } = useAppContext()

  const handleAccountsChanged = async () => {
    // TODO need more testing
    const _signer = provider.getSigner()
    const _account = await _signer.getAddress()
    setIsConnected(false)
  }

  async function connectAccount() {
    if (window.ethereum) {
      const requireMetamask = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const _provider = new ethers.providers.Web3Provider(window.ethereum)
      const _signer = _provider.getSigner() // get signer
      const _account = await _signer.getAddress() // 0xsomething
      const signedMessage = await _signer.signMessage('Welcome to myApp!')
      let expectedSign = 'something'
      // this will change for you (since it uses your private key), you probably want to move this out to a backend
      console.log(`signedMessage ${signedMessage}`)
      //let isValid = ethers.utils.verifyMessage('Welcome to myApp!', signedMessage) returns back the address
      if (signedMessage == expectedSign) {
        console.log(`signed succesfully ${_account}`)
        const _contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          _signer
        )
        console.log(_contract)
        // set variables
        setIsConnected(true)
        setProvider(_provider)
        setSigner(_signer)
        setAccount(_account)
        setContract(_contract)
        // set event for listening on accountsChanged (metamask emits this)
        window.ethereum.on('accountsChanged', async () => {
          console.log(`in useEffect > window.ethereum.on > provider, signer `)
          // TODO not sure if that's the best approach, does this
          // only happen when the user disconnects?
          // what happens when he changes accounts in metamask
          setAccount('')
          setIsConnected(false)
          console.log('disconnected')
        })
      }
    }
  }

  return (
    <button
      disabled={isConnected}
      onClick={connectAccount}
      className="px-4 py-2 text-xs font-bold text-white rounded-full disabled bg-rose-400 lg:px-5 lg:py-3 lg:text-base"
    >
      {isConnected ? <div>{account}</div> : <div>Connect</div>}
    </button>
  )
}

export default Login
