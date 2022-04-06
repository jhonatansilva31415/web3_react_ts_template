import React, { useState } from 'react'
import { useAppContext } from '../context'

const Greeter = () => {
  const { isConnected, contract } = useAppContext()
  const [greet, setGreet] = useState<string>('')

  async function getGreet() {
    if (isConnected) {
      let _greet = await contract.greet()
      setGreet(_greet)
    }
  }

  return (
    <button
      disabled={!isConnected}
      onClick={getGreet}
      className="px-4 py-2 text-xs font-bold text-white bg-blue-400 rounded-full disabled lg:px-5 lg:py-3 lg:text-base"
    >
      <div>Greet after connecting</div>
      <div>{greet}</div>
    </button>
  )
}

export default Greeter
