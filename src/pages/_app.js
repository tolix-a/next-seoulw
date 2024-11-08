import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuTapBar from "@/components/MenuTapBar";
import "@/styles/globals.scss";
import "@/styles/reset.scss";
import { Suspense, useEffect } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import useMainStore from "@/store/main_store";
import { fn } from "@/utils/apiFunc";
import Loading from "@/components/Loading";
import { fetchData } from "next-auth/client/_utils";
import TopButton from "@/components/TopButton";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { mainData, setMainData } = useMainStore();

  useEffect(() => {
    setMainData();
  }, []);


  //  
  return <>
      {
        mainData.length === 0 ? (
          <Loading />
        ) : (
        <SessionProvider session={session}>
          <Head>
            <title>Seoul W</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Seoul Culture Website" />
            <meta name="copyright" content="© 2024 Seoul W Website" />
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <div className="app">
            <Header />
            <Suspense
              fallback={
                <main>
                  <div>
                    <Loading />
                  </div>
                </main>
              }
            >
              <main>
                <Component {...pageProps} />
              </main>
            </Suspense>
            <TopButton />
            <Footer />
            <MenuTapBar />
          </div>
        </SessionProvider>
        )
      }
    </>
  // );
}
