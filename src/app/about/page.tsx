"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/navbar";

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <Navbar title="About" />
      <header className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">
          About <span className="text-purple-500">VIP AI</span>
        </h1>
       
      </header>

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Welcome to the <span className="text-purple-500">VIP AI Experience</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Experience the power of artificial intelligence with our VIP AI platform. Our advanced AI solutions are designed to transform your business and enhance decision-making capabilities through cutting-edge technology and intelligent automation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-purple-500">AI-Powered Analytics</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Advanced AI algorithms providing deep insights and predictive analytics for your data.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-purple-500">Intelligent Automation</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Smart automation solutions powered by AI to streamline your business processes.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-purple-500">AI Consultation</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Expert AI consultation and personalized solutions for your specific needs.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
