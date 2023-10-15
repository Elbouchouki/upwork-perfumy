import Head from "next/head";

import { api } from "~/utils/api";

import ProductCard from "~/components/product-card";
import { ThemeSwitcher } from "~/components/theme-switcher";
import Navbar from "~/components/navbar";
import ProductList from "~/components/product-list";

export default function Home() {


  return (
    <>
      <Head>
        <title>Perfumy - Australia&apos;s Vape Search Engine</title>
        <meta name="description" content="Perfumy - Australia&apos;s Vape Search Engine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <ProductList />
      </main>
    </>

  );
}
