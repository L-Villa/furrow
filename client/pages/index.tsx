import type { NextPage } from "next";
import Head from "next/head";
import About from "../components/About";
import Banner from "../components/Banner";
import Content from "../components/Content";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import { useTheme } from "../hooks/useContextSetters";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  useTheme();
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
      <About />
      <Footer />
    </div>
  );
};

export default Home;
