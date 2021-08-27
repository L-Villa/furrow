import React from "react";
import { useGlobalStateContext } from "../context/GlobalContext";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";

const Content = () => {
  const {
    data: {
      animation: { variants, options },
    },
  }: any = useGlobalStateContext();
  return (
    <section className="home-content-section">
      <div className="container">
        <AnimateWhenVisible variants={variants} options={options}>
          <div className="content">
            Great stories don&rsquo;t just happen— <br />
            they need to be uncovered. And we dig deep to discover the great
            stories that lie just below the surface. Dirt under our fingernails
            and all.
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
};

export default Content;
