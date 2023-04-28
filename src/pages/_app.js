import "@/styles/globals.css";
import Layout from "../../components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../../store";
import NProgress from "nprogress";
import Router from "next/router";
import "../../styles/nprogress.css";

export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", NProgress.start);
  Router.events.on("routeChangeError", NProgress.done);
  Router.events.on("routeChangeComplete", NProgress.done);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
