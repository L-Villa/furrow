import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

interface iProps {
  children?: React.ReactNode;
  variants?: {
    initial: {
      opacity?: number;
      x?: number;
      y?: number;
      transition?: {
        duration?: number;
        ease?: string | number[];
      };
    };
    animate: {
      opacity?: number;
      x?: number;
      y?: number;
      transition?: {
        duration?: number;
        ease?: string | number[];
      };
    };
  };
  transition?: {
    duration?: number;
    ease?: string | number[];
  };
  options?: {
    triggerOnce?: boolean;
    rootMargin?: string;
  };
}
const AnimateWhenVisible: React.FC<iProps> = ({
  children,
  variants = {
    initial: { opacity: 0, x: 1000 },
    animate: { opacity: 1, x: 0 },
  },
  options = { triggerOnce: true },
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView(options);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [controls, inView]);

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        variants={variants}
        initial="initial"
        animate={controls}
        //@ts-ignore
        exit={controls}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateWhenVisible;
