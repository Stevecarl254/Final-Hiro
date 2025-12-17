"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const content = {
  heading: "Imagine This",
  subheading: "More Than Just Food",
  description:
    "At Hiro Catering, we create unforgettable experiences, blending exquisite food, elegant presentation, and warm hospitality to make your events truly special.",
  imageSrc: "/setup.jpeg", // Replace with your image path
  imageAlt: "Elegant catering setup",
};

export default function ImagineThisSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-24 bg-white overflow-hidden font-['Figtree']"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text Panel */}
        <motion.div
          className="flex-1 relative z-10 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center md:text-left"
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-2">
            {content.heading}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-[#00b8e6] mb-6 relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-[#00b8e6] after:mt-2">
            {content.subheading}
          </h3>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Image Panel with Gradient Overlay */}
        <motion.div
          className="flex-1 relative w-full md:w-1/2 h-96 rounded-3xl shadow-2xl overflow-hidden -mt-12 md:mt-0"
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        >
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            fill
            className="object-cover rounded-3xl"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
