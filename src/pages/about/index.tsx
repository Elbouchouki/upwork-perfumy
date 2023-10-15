import Head from 'next/head'
import React from 'react'
import Navbar from '~/components/navbar'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | Perfumy</title>
        <meta name="description" content="About | Perfumy" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col " >
        <Navbar />
        About
      </main>
    </>
  )
}

export default AboutPage