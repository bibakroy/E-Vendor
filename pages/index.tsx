import type { NextPage } from "next";
import Head from "next/head";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Market</title>
        <link rel="icon" href="/logo-for-tab.svg" />
      </Head>
      <Header />
      <main>
        <Banner />
        {/* Product Feed  */}
      </main>
    </div>
  );
};

export default Home;
