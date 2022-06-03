import "../styles/globals.css";
import "../styles/customStyle.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Partytown } from "@builder.io/partytown/react";
import Head from "next/head";
import Hotjar from "../lib/third-party/hotjar";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        <Partytown debug={true} forward={["dataLayer.push"]} />
      </Head> */}
      <Hotjar />

      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
