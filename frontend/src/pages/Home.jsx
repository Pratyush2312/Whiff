import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import SignatureCollection from '../components/SignatureCollection'
import Whiff from '../components/Whiff'
import Whatsapp from '../components/Whatsapp'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Whatsapp/>
      <SignatureCollection />
      <Whiff />
      <Footer />
    </div>
  )
}

export default Home
