import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
