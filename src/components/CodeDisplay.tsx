import React, { useEffect, useRef } from 'react';
import { FileGeneration } from '../types';
import { motion } from 'framer-motion';
import { File } from 'lucide-react';

interface CodeDisplayProps {
  file: FileGeneration;
  index: number;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ file, index }) => {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = 0;
    }
  }, [file]);

  const getFileIcon = () => {
    switch (file.type) {
      case 'component':
        return <div className="w-3 h-3 rounded-full bg-blue-400"></div>;
      case 'config':
        return <div className="w-3 h-3 rounded-full bg-yellow-400"></div>;
      case 'style':
        return <div className="w-3 h-3 rounded-full bg-pink-400"></div>;
      case 'util':
        return <div className="w-3 h-3 rounded-full bg-green-400"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-dark-100 rounded-lg overflow-hidden shadow-lg border border-gray-800"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-dark-200 border-b border-gray-800">
        <div className="flex items-center gap-2">
          {getFileIcon()}
          <span className="text-sm font-mono text-gray-300">{file.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <File size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500">{file.type}</span>
        </div>
      </div>
      <pre 
        ref={codeRef}
        className="p-4 text-sm font-mono text-gray-300 overflow-auto code-scroll max-h-60"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <code>{file.content}</code>
      </pre>
    </motion.div>
  );
};

export default CodeDisplay;