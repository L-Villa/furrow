import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalStateContext } from "../context/GlobalContext";
import { useUpdateCursor } from "../hooks/useContextSetters";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";

const About = () => {
  const [expanded, setExpanded] = useState(0);
  const {
    data: {
      accordian: accordionIds,
      animation: { variants, options },
    },
  }: any = useGlobalStateContext();
  return (
    <AnimateWhenVisible variants={variants} options={options}>
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
                what makes yours worth telling. Whether it’s working directly
                with you, an agency partner, or putting the finishing touches on
                something special, we’re ready to dig in and get our hands
                dirty—are you?
              </p>
            </div>
            <div className="services">
              <h3>Services</h3>
              {accordionIds.map((details: IProps["details"], index: number) => (
                <Accordian
                  key={index}
                  details={details}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimateWhenVisible>
  );
};

interface IProps {
  details: {
    id: number;
    title: string;
    results: string[];
  };
  expanded: number;
  setExpanded: React.Dispatch<React.SetStateAction<number>>;
}
const Accordian: React.FC<IProps> = ({ details, expanded, setExpanded }) => {
  const [isOpen, setIsOpen] = useState(details.id === expanded);
  const [hovered, setHovered] = useState(false);
  const onCursor = useUpdateCursor();
  const {
    currentTheme,
    data: {
      animation: { ease },
    },
  }: any = useGlobalStateContext();

  useEffect(() => {
    setIsOpen(details.id === expanded);
  }, [expanded]);

  return (
    <>
      <motion.div
        className="accordian-header"
        whileHover={{ color: currentTheme === "dark" ? "#ffffff" : "#000000" }}
        onMouseEnter={() => onCursor("hovered")}
        onMouseLeave={() => onCursor()}
        onClick={() => setExpanded(isOpen ? 999 : details.id)}
        onHoverStart={() => setHovered(!hovered)}
        onHoverEnd={() => setHovered(!hovered)}
      >
        <div className="accordian-icon">
          <motion.span
            initial={false}
            animate={{ rotate: isOpen || hovered ? 0 : 45, x: 3 }}
            transition={{ duration: 0.2, ease: ease }}
          ></motion.span>
          <motion.span
            initial={false}
            animate={{ rotate: isOpen || hovered ? 0 : -45, x: -3 }}
            transition={{ duration: 0.2, ease: ease }}
          ></motion.span>
        </div>
        {details.title}
      </motion.div>
      <motion.div
        className="accordian-content"
        initial={false}
        animate={{ height: isOpen ? "100%" : "0px" }}
        transition={{ duration: 0.8, ease: ease }}
      >
        {details.results.map((result, index) => (
          <span key={index}>{result}</span>
        ))}
      </motion.div>
    </>
  );
};

export default About;
