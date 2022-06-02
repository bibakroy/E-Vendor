import { getSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
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
    <>
      <Head>
        <title>E-Market</title>
        <link rel="icon" href="/logo-for-tab.svg" />
      </Head>
      <Script
        id="my-script"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3001613,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <div className="bg-gray-100">
        <Header />
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      </div>
    </>
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
