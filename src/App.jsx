import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import BlogCard from "./components/BlogCard";
import RenderBlogs from "./RenderBlogs";
import BlogPost from "./components/BlogPost";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-gray-100 font-display">
          <NavBar
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
            navItems={[
              "Explore Courses",
              "AI Newsletter",
              "Community",
              "Resources",
              "Company",
            ]}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className=" overflow-hidden">
                <RenderBlogs />
              </div>
            }
          />
          <Route path="/blog/category/:category" element={<RenderBlogs />} />
          {/* Route for individual blog posts */}
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
