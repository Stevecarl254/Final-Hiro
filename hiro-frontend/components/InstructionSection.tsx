"use client";

import Link from "next/link";
import Image from "next/image";
import { FaClipboardCheck, FaBoxOpen, FaPhoneAlt } from "react-icons/fa";

export default function HowToHireSection() {
  const steps = [
    {
      id: 1,
      icon: <FaClipboardCheck className="w-7 h-7 text-white" />,
      title: "Choose Equipment",
      description: "Browse our catering equipment and select what you need.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      icon: <FaBoxOpen className="w-7 h-7 text-white" />,
      title: "Place Order",
      description: "Fill in details, select dates, and submit your request.",
      color: "bg-green-500",
    },
    {
      id: 3,
      icon: <FaPhoneAlt className="w-7 h-7 text-white" />,
      title: "We Contact You",
      description: "Our team contacts you promptly to confirm and arrange delivery.",
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-yellow-200 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-yellow-300 rounded-full opacity-20 animate-ping-slow"></div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Steps */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-3">
            How to Hire Catering Equipment with <span className="text-yellow-600">Hiro</span>
          </h2>
          <p className="text-gray-700 mb-6 max-w-md">
            Follow these simple steps to get the equipment you need quickly and hassle-free!
          </p>

          {/* Steps container with mockup overlap */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.slice(0, 2).map((step, index) => (
                <div
                  key={step.id}
                  className={`bg-white rounded-2xl shadow-lg p-4 flex items-start gap-3 transform transition-transform hover:-translate-y-1 hover:shadow-xl animate-stepFadeUp`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`p-2 rounded-full flex items-center justify-center ${step.color}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-[#002366]">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 3 below */}
            <div className="mt-4 md:mt-6 w-3/4">
              <div
                className={`bg-white rounded-2xl shadow-lg p-4 flex items-start gap-3 transform transition-transform hover:-translate-y-1 hover:shadow-xl animate-stepFadeUp`}
                style={{ animationDelay: "0.4s" }}
              >
                <div className={`p-2 rounded-full flex items-center justify-center ${steps[2].color}`}>
                  {steps[2].icon}
                </div>
                <div>
                  <h3 className="text-md font-semibold text-[#002366]">{steps[2].title}</h3>
                  <p className="text-gray-600 text-sm">{steps[2].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <Link
              href="/services\hiring-catering-equipment"
              className="inline-block bg-[#002366] text-white font-semibold px-6 py-3 rounded-full text-base hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Hire Catering Equipment
            </Link>
          </div>
        </div>

        {/* Mockup */}
        <div className="flex-1 flex justify-center items-center relative md:-ml-12 md:-mt-6">
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-floating">
            <Image
              src="/catering-person.png"
              alt="Catering Person Mockup"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes stepFadeUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-stepFadeUp { animation: stepFadeUp 0.6s ease-in-out forwards; }
        .animate-floating { animation: floating 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 6s infinite; }
        .animate-ping-slow { animation: pingSlow 7s infinite; }
      `}</style>
    </section>
  );
}