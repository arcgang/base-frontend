import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import TypedText from './TypedText';

const InputForm: React.FC = () => {
  const { userInput, setUserInput, startProcessing, isSubmitting, setIsSubmitting } = useAppStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypes = [
    { id: 'web-app', label: 'Web Application' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'blog', label: 'Blog' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const features = [
    { id: 'auth', label: 'Authentication' },
    { id: 'api', label: 'API Integration' },
    { id: 'dark-mode', label: 'Dark Mode' },
    { id: 'responsive', label: 'Responsive Design' },
    { id: 'animations', label: 'Animations' },
    { id: 'forms', label: 'Form Handling' },
  ];

  const themes = [
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'colorful', label: 'Colorful' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'playful', label: 'Playful' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!userInput.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!userInput.features.length) {
      newErrors.features = 'Select at least one feature';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      startProcessing();
      setIsSubmitting(false);
    }, 1000);
  };

  const handleFeatureToggle = (featureId: string) => {
    setUserInput({
      features: userInput.features.includes(featureId)
        ? userInput.features.filter(id => id !== featureId)
        : [...userInput.features, featureId]
    });
    
    if (errors.features) {
      setErrors(prev => ({ ...prev, features: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">
        <TypedText 
          strings={["Generate your project", "Build your application", "Create your codebase"]} 
          className="gradient-text"
        />
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className={`w-full px-4 py-2 bg-gray-800 border ${errors.projectName ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            placeholder="My Awesome Project"
            value={userInput.projectName}
            onChange={(e) => {
              setUserInput({ projectName: e.target.value });
              if (errors.projectName) {
                setErrors(prev => ({ ...prev, projectName: '' }));
              }
            }}
          />
          {errors.projectName && (
            <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Project Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {projectTypes.map(type => (
              <button
                key={type.id}
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  userInput.projectType === type.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setUserInput({ projectType: type.id })}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Features
          </label>
          <div className="grid grid-cols-2 gap-3">
            {features.map(feature => (
              <div
                key={feature.id}
                className={`flex items-center px-4 py-3 rounded-md border ${
                  userInput.features.includes(feature.id)
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                } cursor-pointer transition-all`}
                onClick={() => handleFeatureToggle(feature.id)}
              >
                <input
                  type="checkbox"
                  id={`feature-${feature.id}`}
                  checked={userInput.features.includes(feature.id)}
                  onChange={() => {}}
                  className="w-4 h-4 accent-primary-500"
                />
                <label
                  htmlFor={`feature-${feature.id}`}
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {feature.label}
                </label>
              </div>
            ))}
          </div>
          {errors.features && (
            <p className="mt-1 text-sm text-red-500">{errors.features}</p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Theme
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {themes.map(theme => (
              <button
                key={theme.id}
                type="button"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  userInput.theme === theme.id
                    ? 'bg-secondary-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setUserInput({ theme: theme.id })}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-md hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Generate Code'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default InputForm;