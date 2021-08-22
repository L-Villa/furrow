import React from "react";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";

const Content = () => {
  return (
    <section className="home-content-section">
      <div className="container">
        <AnimateWhenVisible
          variants={{
            initial: {
              opacity: 0,
              y: 72,
            },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.6, 0.05, -0.01, 0.9],
              },
            },
          }}
          options={{
            triggerOnce: true,
            rootMargin: "-300px",
          }}
        >
          <div className="content">
            Greate stories don't just happen- <br />
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
