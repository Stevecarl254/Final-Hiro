"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle, Wrench, Hammer, Settings, Zap } from "lucide-react";

const specialties = [
  { title: "Oven & Stove Repair", icon: <Wrench className="w-8 h-8 text-[#001f3f]" /> },
  { title: "Refrigeration Maintenance", icon: <Hammer className="w-8 h-8 text-[#001f3f]" /> },
  { title: "Electrical Systems", icon: <Settings className="w-8 h-8 text-[#001f3f]" /> },
  { title: "Emergency Repairs", icon: <Zap className="w-8 h-8 text-[#001f3f]" /> },
];

const processSteps = [
  {
    title: "Assessment & Diagnosis",
    description: "We inspect your catering equipment thoroughly to identify any issues or potential failures.",
    icon: <Wrench className="w-6 h-6 text-white" />,
  },
  {
    title: "Disassembly & Cleaning",
    description: "Equipment is carefully disassembled and cleaned to ensure optimal repair conditions.",
    icon: <Hammer className="w-6 h-6 text-white" />,
  },
  {
    title: "Repair & Replacement",
    description: "Faulty parts are repaired or replaced using professional-grade tools and materials.",
    icon: <Settings className="w-6 h-6 text-white" />,
  },
  {
    title: "Testing & Quality Check",
    description: "Each item is rigorously tested to ensure full functionality and safety.",
    icon: <Zap className="w-6 h-6 text-white" />,
  },
  {
    title: "Final Delivery",
    description: "Your equipment is delivered back, fully operational and ready for use.",
    icon: <Wrench className="w-6 h-6 text-white" />,
  },
];

const RepairingCateringPage: React.FC = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-[#001f3f] text-white py-32 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Repairing Catering Equipment</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Fast, professional, and reliable repair services to keep your catering operations running smoothly.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white hover:text-[#001f3f] transition"
        >
          Book a Repair
        </Link>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative">
        {/* Background shapes */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#5cc3ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#001f3f]/20 rounded-full blur-3xl"></div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] text-center mb-12">Our Repair Specialties</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {specialties.map((spec) => (
            <div
              key={spec.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="bg-[#5cc3ff]/20 p-4 rounded-full mb-4">{spec.icon}</div>
              <h3 className="text-xl font-semibold text-[#001f3f]">{spec.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How Our Process Works Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#5cc3ff]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#001f3f]/10 rounded-full blur-3xl"></div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] text-center mb-12">How Our Process Works</h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#5cc3ff]/40"></div>

          <div className="space-y-16">
            {processSteps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={step.title}
                  ref={(el) => (revealRefs.current[idx] = el!)}
                  className={`opacity-0 transform translate-y-10 transition-all duration-700`}
                >
                  <div className={`flex items-center w-full ${isLeft ? "justify-start" : "justify-end"}`}>
                    <div className="w-1/2">
                      <div className={`flex ${isLeft ? "justify-end pr-8" : "justify-start pl-8"} items-center`}>
                        {/* Icon circle */}
                        <div className="bg-[#001f3f] rounded-full w-12 h-12 flex items-center justify-center z-10">
                          {step.icon}
                        </div>
                        {/* Step content */}
                        <div className={`bg-white rounded-lg shadow p-6 ml-4 mr-4 ${isLeft ? "text-right" : "text-left"}`}>
                          <h3 className="text-xl font-semibold text-[#001f3f] mb-2">{step.title}</h3>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-12">Why Choose Us</h2>
        <ul className="space-y-6">
          <li className="flex justify-center items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
            <span className="text-gray-700">Experienced technicians with catering equipment expertise.</span>
          </li>
          <li className="flex justify-center items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
            <span className="text-gray-700">Quick turnaround times for minimal downtime.</span>
          </li>
          <li className="flex justify-center items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
            <span className="text-gray-700">Use of professional-grade tools and genuine parts.</span>
          </li>
          <li className="flex justify-center items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
            <span className="text-gray-700">Full supervision and quality assurance on all repairs.</span>
          </li>
        </ul>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-[#001f3f] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Equipment Repaired Today</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Trust our skilled technicians to restore your catering equipment efficiently and professionally.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white hover:text-[#001f3f] transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default RepairingCateringPage;
