import React from "react";

const About = () => {
  return (
    <section className="home-about-section">
      <div className="container">
        <div className="flex align-top">
          <div className="about">
            <h2>
              Furrow is an integrated, full-service creative studio offering
              video production, creative development, and post-production
              services.
            </h2>
            <p>
              Everybody’s got a story. And we don’t stop until we’ve uncovered
              what makes yours worth telling. Whether it’s working directly with
              you, an agency partner, or putting the finishing touches on
              something special, we’re ready to dig in and get our hands
              dirty—are you?
            </p>
          </div>
          <div className="services">
            <h3>Services</h3>
            <Acordian />
          </div>
        </div>
      </div>
    </section>
  );
};

const Acordian: React.FC = () => {
  return (
    <>
      <div className="accordian-header">
        <div className="accordian-icon">
          <span></span>
          <span></span>
        </div>
        Hello Youtube
      </div>
      <div className="accordian-content">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </>
  );
};

export default About;
