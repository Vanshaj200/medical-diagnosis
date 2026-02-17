import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto text-center px-4">
        <p className="mb-4 text-gray-600 dark:text-gray-400">© 2024 OnlySolution. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link to="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
          <Link to="/Contact" className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
