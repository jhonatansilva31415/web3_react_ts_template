import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import Greeter from '../components/Greeter'

const Home: NextPage = () => {
  return (
    <div>
      <Login />
      <Greeter />
    </div>
  )
}

export default Home
