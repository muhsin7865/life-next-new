import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/layout";
import getCategoryData from "@/lib/getCategoryData";
import getBrandsData from "@/lib/getBrandsData";
import { useLanguage } from "@/hooks/useLanguage";

import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { ModalProvider } from "@/components/ui/modalcontext";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
type TProps = AppProps & {
  data: any;
  brands_data: any;
  session: any;
  userAddrData: any;
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
const App = ({ Component, data, brands_data, pageProps }: TProps) => {
  const { t, currentLang } = useLanguage();

  return (
    <>
      <Head>
        <title>
          Life Pharmacy UAE - Online Pharmacy Delivery in 30 minutes
        </title>
      </Head>
      <NextNProgress color="#eba834" />
      <SessionProvider>
        <main className={poppins.className}>
          <Toaster position="top-right" />
          <ModalProvider>
            <Layout
              data={data}
              brands_data={brands_data}
              isArabic={false}
              lang={currentLang ? currentLang : "en"}
              langData={t}
            >
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </main>
      </SessionProvider>
    </>
  );
};

App.getInitialProps = async (context: any) => {
  const data = await getCategoryData();

  const brands_data = await getBrandsData(false);

  // const session = await getSession(context);
  // var userAddrData = {
  //   data: {
  //     addresses: []
  //   }
  // };
  // if (session) {
  //   const userAddrheaderRes = await fetch('https://prodapp.lifepharmacy.com/api/user/addresses', {
  //     headers: {
  //       Authorization: `Bearer ${session.token.token}`
  //     }
  //   });
  //   userAddrData = await userAddrheaderRes.json();
  // }
  return {
    data,
    brands_data,
  };
};

export default App;
