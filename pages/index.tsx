import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { ProductFeed } from "../components/ProductFeed";
import { ProductType } from "../utils/types";

type ProductsPropsType = {
  products: ProductType[];
};

const Home = ({ products }: ProductsPropsType) => {
  return (
    <div>
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

export async function getServerSideProps() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
