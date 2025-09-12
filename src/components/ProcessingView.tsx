import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import ProgressBar from './ProgressBar';
import DesignSystemItem from './DesignSystemItem';
import FileItem from './FileItem';
import CodeBlock from './CodeBlock';

const ProcessingView: React.FC = () => {
  const { processingProgress, designSystem, files, codeSnippets } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new items appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [designSystem.length, files.length, codeSnippets.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">Generating your code</h2>
          <span className="text-sm font-medium text-primary-400">{processingProgress}%</span>
        </div>
        <ProgressBar progress={processingProgress} />
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto pr-2 space-y-6"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        {/* Design System Section */}
        {designSystem.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="w-2 h-6 bg-primary-500 rounded-sm mr-2"></span>
              Design System
            </h3>
            <div className="space-y-3">
              {designSystem.map(item => (
                <DesignSystemItem key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Files Section */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="w-2 h-6 bg-secondary-500 rounded-sm mr-2"></span>
              Generated Files
            </h3>
            <div className="space-y-3">
              {files.map(file => (
                <FileItem key={file.id} file={file} />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Code Snippets Section */}
        {codeSnippets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded-sm mr-2"></span>
              Code Preview
            </h3>
            <div className="space-y-6">
              {codeSnippets.map(snippet => (
                <CodeBlock
                  key={snippet.id}
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProcessingView;