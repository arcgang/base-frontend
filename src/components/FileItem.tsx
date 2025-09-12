import React from 'react';
import { FileText, Code, Settings, Layout, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { FileGeneration } from '../types';
import clsx from 'clsx';

interface FileItemProps {
  file: FileGeneration;
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const getIcon = () => {
    switch (file.type) {
      case 'component':
        return <Code className="text-blue-400" />;
      case 'util':
        return <FileText className="text-yellow-400" />;
      case 'config':
        return <Settings className="text-purple-400" />;
      case 'page':
        return <Layout className="text-green-400" />;
      default:
        return <File className="text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'pending':
        return 'text-gray-500';
      case 'generating':
        return 'text-yellow-500';
      case 'complete':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'flex items-center p-4 rounded-lg border',
        file.status === 'pending' 
          ? 'border-gray-700 bg-gray-800/50' 
          : file.status === 'generating'
            ? 'border-yellow-900/50 bg-yellow-900/10'
            : 'border-green-900/50 bg-green-900/10'
      )}
    >
      <div className="mr-4">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-mono font-medium text-white">{file.name}</h3>
          <span className="ml-2 text-xs text-gray-500">{file.path}</span>
        </div>
        {file.description && <p className="text-sm text-gray-400">{file.description}</p>}
      </div>
      <div className={`ml-4 ${getStatusColor()}`}>
        {file.status === 'pending' && (
          <span className="text-xs font-medium">Pending</span>
        )}
        {file.status === 'generating' && (
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin mr-2"></div>
            <span className="text-xs font-medium">Generating</span>
          </div>
        )}
        {file.status === 'complete' && (
          <span className="text-xs font-medium">Complete</span>
        )}
      </div>
    </motion.div>
  );
};

export default FileItem;