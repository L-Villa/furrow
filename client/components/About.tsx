import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  useUpdateCursor,
  useGlobalStateContext,
} from "../context/GlobalContext";
import AnimateWhenVisible from "../hooks/AnimateWhenVisible";

const accordionIds = [
  {
    id: 0,
    title: "Pre-Production",
    results: [
      "Creative Development",
      "Writing",
      "Creative Development",
      "Writing",
      "Storyboards",
      "Art Direction",
      "Creative Direction",
      "Location Scouting",
      "Casting",
    ],
  },
  {
    id: 1,
    title: "Video Production",
    results: [
      "Principle Photography",
      "Production Management",
      "Crew",
      "Dailies",
      "LTO-Archiving",
    ],
  },
  {
    id: 2,
    title: "Post-Production",
    results: [
      "Colour correction",
      "Offline editing",
      "Online editing",
      "VFX",
      "Animation and motion graphics",
      "Closed captioning and subtitles",
      "Descriptive video",
      "Dailies",
      "Quality control",
      "LTO Archiving",
    ],
  },
  {
    id: 3,
    title: "Audio Post-Production",
    results: [
      "We work with some amazing partners who provide:",
      "Sound Design",
      "SFX",
      "Music",
      "Sound Mix",
    ],
  },
];

const About = () => {
  const [expanded, setExpanded] = useState(0);
  return (
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
              {accordionIds.map((details, index) => (
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

interface iProps {
  details: {
    id: number;
    title: string;
    results: string[];
  };
  expanded: number;
  setExpanded: React.Dispatch<React.SetStateAction<number>>;
}
const Accordian: React.FC<iProps> = ({ details, expanded, setExpanded }) => {
  const [isOpen, setIsOpen] = useState(details.id === expanded);
  const [hovered, setHovered] = useState(false);
  const onCursor = useUpdateCursor();
  const { currentTheme }: any = useGlobalStateContext();

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
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
          ></motion.span>
          <motion.span
            initial={false}
            animate={{ rotate: isOpen || hovered ? 0 : -45, x: -3 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
          ></motion.span>
        </div>
        {details.title}
      </motion.div>
      <motion.div
        className="accordian-content"
        initial={false}
        animate={{ height: isOpen ? "100%" : "0px" }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        {details.results.map((result, index) => (
          <span key={index}>{result}</span>
        ))}
      </motion.div>
    </>
  );
};

export default About;
