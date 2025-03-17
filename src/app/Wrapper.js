'use client';
import Sidebar from '@/component/sidebar/Sidebar';
import React, { useEffect, useState } from 'react';

const Wrapper = ({ children }) => {
  // Initialize with a default value.
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isOpen');
      if (saved !== null) {
        setIsOpen(JSON.parse(saved));
      }
    }
  }, []);

  // Update localStorage when isOpen changes.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isOpen', JSON.stringify(isOpen));
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`md:px-8 px-4 transition-width duration-300 ${
          isOpen ? 'ml-56' : 'ml-20'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
