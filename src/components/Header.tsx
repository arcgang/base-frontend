import React from 'react';
import { Github, Twitter } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        

      </div>
    </header>
  );
};

export default Header;