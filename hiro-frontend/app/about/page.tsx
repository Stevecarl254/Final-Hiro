"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* About Hiro Section */}
      <section className="py-20 bg-[#f9fafc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/about.jpeg"
              alt="Hiro Catering Team"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f]">
              About Hiro Catering
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hiro Catering is built on a passion for fine dining, hospitality, and unforgettable service. 
              We combine creativity and professionalism to deliver world-class catering for every occasion — 
              from intimate gatherings to grand corporate events.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our philosophy is simple: great food, exceptional presentation, and warm service. 
              Every dish we serve carries the taste of dedication and artistry from our chefs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-6"
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Hiro Catering began as a small passion project with a single mission — to elevate the catering experience in Kenya. 
            Through creativity, commitment, and excellence, we’ve grown into one of the most trusted catering brands known 
            for innovation, elegance, and consistency. 
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-700 max-w-3xl mx-auto leading-relaxed mt-4"
          >
            Our team of culinary experts, planners, and service professionals share one goal: to turn every event 
            into an unforgettable experience — one plate, one smile at a time.
          </motion.p>
        </div>
      </section>

      {/* Sustainability & Community Impact */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f3f9f6] text-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">
              Sustainability & Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Hiro Catering, we believe in serving not just meals — but also our community and planet.
              Our sustainability journey focuses on eco-friendly practices, local sourcing, and community upliftment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-[#00b8e6]/10 p-3 rounded-full">🌿</div>
                <div>
                  <h3 className="text-xl font-semibold text-[#001f3f]">
                    Local Sourcing
                  </h3>
                  <p className="text-gray-600">
                    We prioritize local farmers and suppliers, supporting sustainability while ensuring 
                    the freshest ingredients for every event.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#00b8e6]/10 p-3 rounded-full">💧</div>
                <div>
                  <h3 className="text-xl font-semibold text-[#001f3f]">
                    Eco-Friendly Operations
                  </h3>
                  <p className="text-gray-600">
                    From biodegradable packaging to waste reduction initiatives, we’re constantly evolving 
                    to protect the environment we serve.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#00b8e6]/10 p-3 rounded-full">🤝</div>
                <div>
                  <h3 className="text-xl font-semibold text-[#001f3f]">
                    Community Empowerment
                  </h3>
                  <p className="text-gray-600">
                    We train youth and local hospitality enthusiasts, creating opportunities and fostering 
                    growth through food and service.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Impact Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative bg-[#001f3f] text-white p-10 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative z-10 space-y-6 text-center">
                <h3 className="text-3xl font-bold">Our Impact</h3>
                <div className="grid grid-cols-2 gap-8 mt-6">
                  <div>
                    <p className="text-4xl font-bold text-[#00b8e6]">80%</p>
                    <p className="text-sm">Local produce</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00b8e6]">200+</p>
                    <p className="text-sm">Youth trained yearly</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00b8e6]">95%</p>
                    <p className="text-sm">Recycled waste</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00b8e6]">15+</p>
                    <p className="text-sm">Community projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#f9fafc] text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-6"
          >
            Our Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-700 max-w-3xl mx-auto mb-10"
          >
            Every plate we serve is guided by integrity, creativity, teamwork, and a deep respect for people and the planet.
          </motion.p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "We uphold honesty and transparency in every interaction." },
              { title: "Creativity", desc: "We craft menus that inspire and delight every guest." },
              { title: "Excellence", desc: "We deliver perfection in taste, service, and presentation." },
              { title: "Community", desc: "We give back through training and local empowerment." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-[#001f3f] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
