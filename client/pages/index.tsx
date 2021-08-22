import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Content from "../components/Content";
import Featured from "../components/Featured";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Furrow</title>
        <meta name="Furrow" content="A creative website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Content />
      <Featured />
    </div>
  );
};

export default Home;
