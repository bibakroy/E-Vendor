import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Market</title>
        <link rel="icon" href="/logo-for-tab.svg" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
