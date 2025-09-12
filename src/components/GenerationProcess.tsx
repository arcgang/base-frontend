import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeDisplay from './CodeDisplay';
import DesignSystemItem from './DesignSystemItem';
import { FileGeneration, UserInput, DesignSystemItem as DesignSystemItemType } from '../types';
import { getRandomSnippet, designSystemItems } from '../data/codeSnippets';
import { CheckCircle } from 'lucide-react';
import Typewriter from 'typewriter-effect';

interface GenerationProcessProps {
  userInput: UserInput;
  onComplete: () => void;
}

const GenerationProcess: React.FC<GenerationProcessProps> = ({ userInput, onComplete }) => {
  const [step, setStep] = useState<'design' | 'files' | 'complete'>('design');
  const [designSystem, setDesignSystem] = useState<DesignSystemItemType[]>([]);
  const [files, setFiles] = useState<FileGeneration[]>([]);
  const [progress, setProgress] = useState(0);

  // Simulate design system generation
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDesignSystem(prev => {
          if (prev.length < designSystemItems.length) {
            const newItem = designSystemItems[prev.length];
            return [...prev, newItem];
          }
          clearInterval(interval);
          setTimeout(() => setStep('files'), 1000);
          return prev;
        });
      }, 700);
      
      return () => clearInterval(interval);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulate file generation
  useEffect(() => {
    if (step !== 'files') return;
    
    const fileTypes: Array<FileGeneration['type']> = ['config', 'component', 'component', 'util', 'style', 'component', 'util'];
    const fileNames = [
      'tailwind.config.ts',
      `${userInput.projectName}Button.tsx`,
      `${userInput.projectName}Card.tsx`,
      'utils.ts',
      'theme.css',
      'Dashboard.tsx',
      'api.ts'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < fileTypes.length) {
        const newFile: FileGeneration = {
          name: fileNames[index],
          type: fileTypes[index],
          content: getRandomSnippet(fileTypes[index] === 'style' ? 'config' : fileTypes[index])
        };
        
        setFiles(prev => [...prev, newFile]);
        setProgress(Math.min(100, Math.round((index + 1) / fileTypes.length * 100)));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep('complete');
          onComplete();
        }, 2000);
      }
    }, 1200);
    
    return () => clearInterval(interval);
  }, [step, userInput, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-white">
            {step === 'design' && 'Designing System'}
            {step === 'files' && 'Generating Files'}
            {step === 'complete' && 'Generation Complete'}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-dark-100 rounded-full">
              <div 
                className="h-full bg-primary-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm font-mono h-6">
          {step === 'design' && (
            <Typewriter
              options={{
                strings: [
                  `Analyzing project "${userInput.projectName}"...`,
                  `Extracting design tokens...`,
                  `Building component library...`,
                  `Optimizing for ${userInput.theme} theme...`
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 10
              }}
            />
          )}
          
          {step === 'files' && (
            <Typewriter
              options={{
                strings: [
                  `Scaffolding project structure...`,
                  `Implementing ${userInput.features.join(', ')}...`,
                  `Applying ${userInput.theme} styling...`,
                  `Optimizing bundle size...`
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 10
              }}
            />
          )}
          
          {step === 'complete' && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle size={16} />
              <span>Project successfully generated!</span>
            </div>
          )}
        </div>
      </div>
      
      {step === 'design' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designSystem.map((item, index) => (
            <DesignSystemItem key={index} item={item} index={index} />
          ))}
        </div>
      )}
      
      {step === 'files' && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <CodeDisplay key={index} file={file} index={index} />
          ))}
        </div>
      )}
      
      {step === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary-900/50 to-dark-100 p-8 rounded-lg border border-primary-700/50 text-center"
        >
          <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Generation Complete!</h3>
          <p className="text-gray-300 mb-4">
            Your {userInput.projectName} project is ready with {userInput.features.length} features.
          </p>
          <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all">
            Download Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GenerationProcess;