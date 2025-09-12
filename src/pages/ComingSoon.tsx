import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import InputForm from '../components/InputForm';
import GenerationProcess from '../components/GenerationProcess';
import AnimatedBackground from '../components/AnimatedBackground';
import { UserInput } from '../types';
import { Github, Twitter } from 'lucide-react';

const ComingSoon: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (input: UserInput) => {
    setUserInput(input);
  };

  const handleComplete = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {!userInput ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AI-Powered Code Generator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Instantly generate production-ready React applications with Tailwind CSS based on your specifications. Coming soon.
            </p>
            
            <div className="w-full max-w-md mx-auto">
              <InputForm onSubmit={handleSubmit} />
            </div>
          </motion.div>
        ) : (
          <GenerationProcess userInput={userInput} onComplete={handleComplete} />
        )}
      </main>
      

    </div>
  );
};

export default ComingSoon;