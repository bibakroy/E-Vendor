import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { ProductFeed } from "../components/ProductFeed";
import { ProductType } from "../utils/types";
import { GetServerSideProps } from "next";

type ProductsPropsType = {
  products: ProductType[];
};

const Home = ({ products }: ProductsPropsType) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>E-Market</title>
        <link rel="icon" href="/logo-for-tab.svg" />
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
      session,
    },
  };
};
