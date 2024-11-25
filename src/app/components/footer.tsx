  import React from 'react';

  const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-purple-600 to-purple-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300">
                Your trusted partner in digital solutions. We create amazing experiences.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-purple-300">Home</a></li>
                <li><a href="/blog" className="hover:text-purple-300">Blog</a></li>
                <li><a href="/about" className="hover:text-purple-300">About</a></li>
                
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: problemssolve196@gmail.com</li>
                <li>Phone: ...........</li>
                <li>Address: karachi pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500 mt-8 pt-8 text-center">
            <p className="text-gray-300">© {new Date().getFullYear()} All rights reserved.By Shahmeer Ali</p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
