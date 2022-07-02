import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className="text-3xl underline text-red-500">Hello World!</h1>
    </div>
  );
}
