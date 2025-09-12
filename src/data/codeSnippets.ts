export const configSnippets = [
  `// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ...more colors
        },
      },
    },
  },
  plugins: [],
}`,
  `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    // ...more options
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
  `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})`,
];

export const componentSnippets = [
  `// Button.tsx
import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        outline: 'border border-primary-200 hover:bg-primary-100',
        // ...more variants
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);`,
  `// Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={\`bg-white rounded-lg shadow-md \${className}\`}>
      {title && (
        <div className="border-b px-4 py-3">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}`,
  `// Input.tsx
import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input px-3 py-2",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}`,
];

export const utilSnippets = [
  `// utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}`,
  `// hooks.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}`,
  `// api.ts
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(\`API Error: \${response.status}\`);
  }
  
  return response.json();
}`,
];

export const designSystemItems = [
  { name: 'Colors', description: 'Primary and accent color palettes', color: '#4f46e5' },
  { name: 'Typography', description: 'Font families and sizes' },
  { name: 'Spacing', description: 'Consistent spacing units' },
  { name: 'Shadows', description: 'Elevation system' },
  { name: 'Border Radius', description: 'Consistent rounding' },
  { name: 'Breakpoints', description: 'Responsive design system' },
  { name: 'Animation', description: 'Motion principles' },
  { name: 'Components', description: 'Reusable UI elements' },
];

export const getRandomSnippet = (type: 'component' | 'config' | 'util'): string => {
  switch (type) {
    case 'component':
      return componentSnippets[Math.floor(Math.random() * componentSnippets.length)];
    case 'config':
      return configSnippets[Math.floor(Math.random() * configSnippets.length)];
    case 'util':
      return utilSnippets[Math.floor(Math.random() * utilSnippets.length)];
    default:
      return '';
  }
};