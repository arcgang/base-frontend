import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  className = '',
}) => {
  const codeRef = useRef<HTMLPreElement>(null);

  // Simple syntax highlighting function
  useEffect(() => {
    if (!codeRef.current) return;

    // This is a very simple highlighting just for demo purposes
    const highlightCode = () => {
      if (!codeRef.current) return;
      
      let highlighted = code
        // Keywords
        .replace(/(import|export|const|let|function|return|interface|type|extends|from|as|if|else|for|while|class|new|true|false|null|undefined)/g, '<span class="text-pink-400">$1</span>')
        // Strings
        .replace(/(['"`])(.*?)(['"`])/g, '<span class="text-green-400">$1$2$3</span>')
        // Comments
        .replace(/\/\/(.*)/g, '<span class="text-gray-500">// $1</span>')
        // Types
        .replace(/(\w+)(?=\s*[:<])/g, '<span class="text-blue-400">$1</span>')
        // Function calls
        .replace(/(\w+)(?=\()/g, '<span class="text-yellow-400">$1</span>');

      codeRef.current.innerHTML = highlighted;
    };

    highlightCode();
  }, [code]);

  return (
    <div className={clsx('rounded-lg overflow-hidden bg-gray-900 shadow-lg', className)}>
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm font-medium">{title}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre ref={codeRef} className="font-mono text-sm text-gray-300 whitespace-pre">{code}</pre>
      </div>
    </div>
  );
};

export default CodeBlock;