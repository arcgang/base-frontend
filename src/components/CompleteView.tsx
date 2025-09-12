import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Copy } from 'lucide-react';
import { useAppStore } from '../store';

const CompleteView: React.FC = () => {
  const { userInput, submitEmail, isEmailSubmitted } = useAppStore();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    submitEmail(email);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check size={32} className="text-green-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Your code is ready!</h2>
      <p className="text-gray-400 text-center mb-6">
        We've generated your {userInput.projectType} project with {userInput.features.length} features.
      </p>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-300">Project details</h3>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Project name:</span>
            <span className="text-white font-medium">{userInput.projectName || 'My Project'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white font-medium">{userInput.projectType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Features:</span>
            <span className="text-white font-medium">{userInput.features.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Theme:</span>
            <span className="text-white font-medium">{userInput.theme}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <button 
          className="w-full py-3 flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors"
        >
          <Download size={18} className="mr-2" />
          Download Project
        </button>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={window.location.href}
            readOnly
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md pr-12 text-gray-300 font-mono text-sm"
          />
          <button
            onClick={handleCopyLink}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Copy link"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      
      {!isEmailSubmitted ? (
        <div className="border-t border-gray-800 pt-6">
          <h3 className="font-medium text-center mb-4">Get notified when we launch</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                className={`w-full px-4 py-2 bg-gray-800 border ${emailError ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              />
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      ) : (
        <div className="border-t border-gray-800 pt-6">
          <div className="flex items-center justify-center text-green-500 mb-2">
            <Check size={20} className="mr-2" />
            <p className="font-medium">Thank you for subscribing!</p>
          </div>
          <p className="text-gray-400 text-center text-sm">
            We'll notify you at {userInput.email} when we launch.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CompleteView;