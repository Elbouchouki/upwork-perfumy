import Head from 'next/head'
import React from 'react'
import Contact from '~/components/contact'
import Footer from '~/components/footer'
import Navbar from '~/components/navbar'

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Perfumy</title>
        <meta name="description" content="Contact | Perfumy" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col " >
        <Navbar />

        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default ContactPage