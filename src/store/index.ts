import { create } from 'zustand';
import { UserInput, FileGeneration, DesignSystemItem, CodeSnippet } from '../types';

interface AppState {
  userInput: UserInput;
  files: FileGeneration[];
  designSystem: DesignSystemItem[];
  codeSnippets: CodeSnippet[];
  currentStage: 'input' | 'processing' | 'complete';
  processingProgress: number;
  isSubmitting: boolean;
  isEmailSubmitted: boolean;
  
  setUserInput: (input: Partial<UserInput>) => void;
  startProcessing: () => void;
  updateProgress: (progress: number) => void;
  completeProcessing: () => void;
  setIsSubmitting: (value: boolean) => void;
  submitEmail: (email: string) => void;
  init: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userInput: {
    projectName: 'React Dashboard',
    projectType: 'dashboard',
    features: ['auth', 'api', 'dark-mode', 'responsive'],
    theme: 'modern',
  },
  files: [],
  designSystem: [],
  codeSnippets: [],
  currentStage: 'processing',
  processingProgress: 0,
  isSubmitting: false,
  isEmailSubmitted: false,
  
  setUserInput: (input) => set((state) => ({
    userInput: { ...state.userInput, ...input }
  })),
  
  startProcessing: () => {
    set({ currentStage: 'processing', processingProgress: 0 });
    
    // Add design system items
    setTimeout(() => {
      set((state) => ({
        designSystem: [
          {
            id: 1,
            name: 'Color Palette',
            description: 'Defining primary and secondary colors',
            type: 'color',
            status: 'thinking'
          },
          {
            id: 2,
            name: 'Typography',
            description: 'Selecting font families and sizes',
            type: 'typography',
            status: 'thinking'
          }
        ],
        processingProgress: 5
      }));
    }, 3000);
    
    // Update design system status
    setTimeout(() => {
      set((state) => ({
        designSystem: state.designSystem.map(item => 
          item.id === 1 ? { ...item, status: 'decided' } : item
        ),
        processingProgress: 12
      }));
    }, 8000);
    
    // Add more design system items
    setTimeout(() => {
      set((state) => ({
        designSystem: [
          ...state.designSystem,
          {
            id: 3,
            name: 'Component Library',
            description: 'Building reusable UI components',
            type: 'component',
            status: 'thinking'
          },
          {
            id: 4,
            name: 'Spacing System',
            description: 'Consistent spacing throughout the app',
            type: 'spacing',
            status: 'thinking'
          }
        ],
        processingProgress: 20
      }));
    }, 15000);
    
    // Update design system and add files
    setTimeout(() => {
      set((state) => ({
        designSystem: state.designSystem.map(item => 
          item.id === 2 || item.id === 4 ? { ...item, status: 'decided' } : item
        ),
        files: [
          {
            id: 1,
            name: 'tailwind.config.js',
            path: '/config',
            type: 'config',
            status: 'generating',
            description: 'Configuration for design tokens'
          },
          {
            id: 2,
            name: 'Button.tsx',
            path: '/components',
            type: 'component',
            status: 'pending',
            description: 'Primary button component'
          }
        ],
        processingProgress: 30
      }));
    }, 22000);
    
    // Update files and add code snippet
    setTimeout(() => {
      set((state) => ({
        files: state.files.map(file => 
          file.id === 1 ? { ...file, status: 'complete' } : file
        ),
        codeSnippets: [
          {
            id: 1,
            language: 'typescript',
            title: 'tailwind.config.js',
            description: 'Design system configuration',
            code: `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        secondary: {
          400: '#e879f9',
          500: '#d946ef',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  }
}`
          }
        ],
        processingProgress: 42
      }));
    }, 30000);
    
    // Update design system and files
    setTimeout(() => {
      set((state) => ({
        designSystem: state.designSystem.map(item => 
          item.id === 3 ? { ...item, status: 'decided' } : item
        ),
        files: [
          ...state.files,
          {
            id: 3,
            name: 'Card.tsx',
            path: '/components',
            type: 'component',
            status: 'pending',
            description: 'Card component for content display'
          },
          {
            id: 4,
            name: 'Header.tsx',
            path: '/components',
            type: 'component',
            status: 'generating',
            description: 'App header with navigation'
          }
        ],
        processingProgress: 55
      }));
    }, 40000);
    
    // Update files and add code snippet
    setTimeout(() => {
      set((state) => ({
        files: state.files.map(file => 
          file.id === 2 || file.id === 4 ? { ...file, status: 'complete' } : 
          file.id === 3 ? { ...file, status: 'generating' } : file
        ),
        codeSnippets: [
          ...state.codeSnippets,
          {
            id: 2,
            language: 'tsx',
            title: 'Button.tsx',
            description: 'Reusable button component',
            code: `import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-md font-medium transition-all',
        {
          'bg-primary-500 hover:bg-primary-600 text-white': variant === 'primary',
          'bg-secondary-500 hover:bg-secondary-600 text-white': variant === 'secondary',
          'border border-gray-300 hover:border-gray-400': variant === 'outline',
          'px-2.5 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-5 py-2.5 text-lg': size === 'lg',
          'opacity-80 cursor-not-allowed': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};`
          }
        ],
        processingProgress: 68
      }));
    }, 50000);
    
    // Update files and add code snippet
    setTimeout(() => {
      set((state) => ({
        files: state.files.map(file => 
          file.id === 3 ? { ...file, status: 'complete' } : file
        ),
        files: [
          ...state.files,
          {
            id: 5,
            name: 'HomePage.tsx',
            path: '/pages',
            type: 'page',
            status: 'generating',
            description: 'Main landing page'
          }
        ],
        codeSnippets: [
          ...state.codeSnippets,
          {
            id: 3,
            language: 'tsx',
            title: 'Card.tsx',
            description: 'Reusable card component',
            code: `import React from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card = ({ 
  title, 
  children, 
  className,
  footer
}: CardProps) => {
  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden',
      className
    )}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};`
          }
        ],
        processingProgress: 82
      }));
    }, 65000);
    
    // Continue with more files but never complete
    setTimeout(() => {
      set((state) => ({
        files: [
          ...state.files,
          {
            id: 6,
            name: 'utils.ts',
            path: '/utils',
            type: 'util',
            status: 'generating',
            description: 'Utility functions'
          }
        ],
        processingProgress: 88
      }));
    }, 80000);
    
    // Add final files but keep progress under 100%
    setTimeout(() => {
      set((state) => ({
        files: state.files.map(file => 
          file.id === 5 ? { ...file, status: 'complete' } : file
        ),
        processingProgress: 94
      }));
    }, 95000);
  },
  
  updateProgress: (progress) => set({ processingProgress: progress }),
  
  completeProcessing: () => set({ currentStage: 'complete' }),
  
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  
  submitEmail: (email) => {
    set((state) => ({
      userInput: { ...state.userInput, email },
      isEmailSubmitted: true
    }));
  },
  
  // Auto-start processing on initialization
  init: () => {
    const { startProcessing } = get();
    setTimeout(() => {
      startProcessing();
    }, 1000);
  }
}));