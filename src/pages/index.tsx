import Head from "next/head";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import ProductList from "~/components/product-list";

export default function Home() {


  return (
    <>
      <Head>
        <title>Perfumy - Australia&apos;s Vape Search Engine</title>
        <meta name="description" content="Perfumy - Australia&apos;s Vape Search Engine" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col " >
        <Navbar />
        <ProductList />
        <Footer />
      </main>
    </>

  );
}
