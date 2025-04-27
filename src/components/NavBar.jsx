import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ navItems, className }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 ${className}`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <NavLink to={"/"}>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://learn.deeplearning.ai/assets/dlai-logo.png"
              className="h-10 md:h-20"
              alt="DeepLearning.AI Logo"
            />
          </div>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-pink-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-700"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:block lg:w-auto">
          <ul className="flex space-x-8 font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-500 text-lg hover:text-pink-600"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slide-in Mobile Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          toggle ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <span className="text-lg text-gray-500 font-semibold">
            DeepLearning.AI
          </span>
          <button onClick={() => setToggle(false)} className="text-gray-600">
            ✕
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="block text-gray-700 hover:text-pink-600"
                onClick={() => setToggle(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {toggle && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden"
          onClick={() => setToggle(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
