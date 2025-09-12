import React from 'react';
import { Check, Circle, LayoutGrid, Type, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import { DesignSystemItem as DesignSystemItemType } from '../types';
import clsx from 'clsx';

interface DesignSystemItemProps {
  item: DesignSystemItemType;
}

const DesignSystemItem: React.FC<DesignSystemItemProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'color':
        return <Circle className="text-primary-400" />;
      case 'typography':
        return <Type className="text-secondary-400" />;
      case 'component':
        return <LayoutGrid className="text-green-400" />;
      case 'layout':
      case 'spacing':
        return <Ruler className="text-yellow-400" />;
      default:
        return <Circle className="text-blue-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'flex items-center p-4 rounded-lg border',
        item.status === 'thinking' 
          ? 'border-gray-700 bg-gray-800/50' 
          : 'border-gray-600 bg-gray-800'
      )}
    >
      <div className="mr-4">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.description}</p>
      </div>
      <div className="ml-4">
        {item.status === 'thinking' ? (
          <div className="h-5 w-5 rounded-full border-2 border-gray-500 border-t-transparent animate-spin"></div>
        ) : (
          <Check className="text-green-400" />
        )}
      </div>
    </motion.div>
  );
};

export default DesignSystemItem;