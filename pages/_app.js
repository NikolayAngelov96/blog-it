import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
