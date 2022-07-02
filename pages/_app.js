import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </>
  );
}

export default MyApp;
