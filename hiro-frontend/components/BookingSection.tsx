"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function BookingSection() {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-28 bg-gradient-to-r from-[#001f3f] via-[#004d7a] to-[#00b8e6] overflow-hidden font-['Figtree']"
    >
      {/* Optional abstract shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#ffffff20] rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#ffffff20] rounded-full filter blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Let’s Make Your Event Unforgettable
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl"
        >
          Book Hiro Catering today and experience elegance, taste, and exceptional service tailored for your special day.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={buttonVariants}
          className="mt-6"
        >
          <Link href="/get-quote">
            <button className="bg-white text-[#001f3f] px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition-all duration-300">
              Book Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
