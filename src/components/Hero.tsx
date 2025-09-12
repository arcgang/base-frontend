import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Zap } from 'lucide-react';
import TypedText from './TypedText';
import { useAppStore } from '../store';

const Hero: React.FC = () => {
  const { userInput } = useAppStore();
  
  return (
    <div className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          <span className="gradient-text">Your Digital Product</span><br />
          <TypedText 
            strings={["Reimagined", "Simplified", "Accelerated"]} 
            typeSpeed={80}
            backSpeed={50}
            className="text-white"
          />
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
            {userInput.projectType.replace('-', ' ')}
          </span>
          {userInput.features.map(feature => (
            <span key={feature} className="px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm">
              {feature.replace('-', ' ')}
            </span>
          ))}
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
            {userInput.theme}
          </span>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Transform your ideas into production-ready code in minutes, not days.
          Our AI-powered platform generates clean, maintainable code based on your specifications.
        </p>
      </motion.div>


    </div>
  );
};

export default Hero;