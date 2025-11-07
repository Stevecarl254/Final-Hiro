"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FiEye, FiTarget, FiAward } from "react-icons/fi";

const items = [
  {
    id: 1,
    title: "Our Vision",
    description:
      "To be the leading catering service in the region, creating memorable experiences with elegance, professionalism, and passion.",
    icon: <FiEye size={32} />,
  },
  {
    id: 2,
    title: "Our Goal",
    description:
      "Deliver exceptional catering solutions tailored to each client, ensuring satisfaction and lasting impressions.",
    icon: <FiTarget size={32} />,
  },
  {
    id: 3,
    title: "Our Values",
    description:
      "Quality, integrity, creativity, and professionalism guide everything we do in providing top-tier catering services.",
    icon: <FiAward size={32} />,
  },
];

export default function VisionSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
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
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/catering-bg.jpg"
          alt="Catering Background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-stretch gap-8 text-white">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-md rounded-2xl p-8 flex-1 flex flex-col items-center text-center relative"
          >
            {/* Icon */}
            <div className="text-[#00b8e6] mb-4">{item.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            {/* Description */}
            <p className="text-white/90">{item.description}</p>

            {/* Vertical separator line */}
            {index < items.length - 1 && (
              <div className="hidden md:block absolute right-0 top-10 bottom-10 w-px bg-[#00b8e6]"></div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
