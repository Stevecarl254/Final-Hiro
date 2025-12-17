"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FiCheck } from "react-icons/fi";

const reasons = [
  "Exceptional catering tailored to your event",
  "Professional and experienced staff",
  "High-quality ingredients and presentation",
  "Flexible and reliable service",
  "Creating unforgettable experiences",
];

export default function WhyHiroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative py-24 font-['Figtree'] overflow-hidden bg-gray-100 bg-[url('/rough-texture.png')]"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left: List */}
        <motion.div
          className="flex-1"
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-8">
            Why Hiro Catering
          </h2>
          <ul className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={itemVariants}
                className="flex items-start gap-3 text-lg text-gray-800"
              >
                <FiCheck className="text-[#00b8e6] mt-1 flex-shrink-0" size={20} />
                {reason}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          className="flex-1 w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
        >
          <img
            src="/why hiro.jpg"
            alt="Why Hiro Catering"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}