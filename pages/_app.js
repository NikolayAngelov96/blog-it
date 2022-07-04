import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog it - Next JS Blog Posting App</title>
      </Head>
      <AuthProvider>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
