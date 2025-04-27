import React, { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

const RenderBlogs = () => {
  const [blogList, setBlogList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterDesc, setFilterDesc] = useState("");
  const { category } = useParams();

  const fetchBlogData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (category) {
      setFilter(category);
    } else {
      setFilter("");
    }
  }, [category]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      let url =
        "https://www.deeplearning.ai/_next/data/eN48kkBZ29QCuMFwGR4lT/blog.json";
      if (filter) {
        url = `https://www.deeplearning.ai/_next/data/eN48kkBZ29QCuMFwGR4lT/blog/category/${filter}.json?slug=${filter}`;
      }

      const data = await fetchBlogData(url);
      if (data && data.pageProps) {
        if (filter && data.pageProps.category) {
          setBlogList(data.pageProps.category.posts.nodes);
          setFilterDesc(
            data.pageProps.category.description || "No description available"
          );
        } else if (data.pageProps.posts) {
          setBlogList(data.pageProps.posts.nodes);
          setFilterDesc("");
        }
      } else {
        setBlogList([]);
        setFilterDesc("");
      }
    };

    fetchAndSetData();
  }, [filter]);

  const filters = {
    "Breaking Into AI": "breaking-into-ai",
    "Working AI": "working-ai",
    "AI Heroes": "ai-heroes",
    "Ambassador Spotlight": "ambassador-spotlight",
    "News & Events": "news-and-events",
  };

  const filtersName = {
    "breaking-into-ai": "Breaking Into AI",
    "working-ai": "Working AI",
    "ai-heroes": "AI Heroes",
    "ambassador-spotlight": "Ambassador Spotlight",
    "news-and-events": "News & Events",
  };

  console.log(filter);

  const renderBlogList = blogList.map((blog, index) => (
    <NavLink
      key={index}
      to={`/blog/${blog.slug}`}
      className="cursor-pointer col-span-4 md:col-span-6 lg:col-span-4 p-2 "
    >
      <BlogCard blog={blog} />
    </NavLink>
  ));

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Blogs Title (shown only on home) */}
      <div className={`${filter !== "" ? "hidden" : "w-full bg-white py-4"}`}>
        <div className="flex justify-center font-bold items-center text-5xl py-3 mt-50 md:mt-0">
          <span>Blogs</span>
        </div>
      </div>
      {/* Filter NavBar - Always visible, fixed below main NavBar */}
      <div className="hidden lg:block fixed top-16 md:top-24 w-full bg-white z-40 shadow-md pt-4 pb-2">
        <nav className="cursor-pointer">
          <ul className="flex justify-center flex-wrap">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `p-6 inline-block transition-all duration-100 ${
                    isActive
                      ? "text-pink-600 border-b-4 border-pink-600"
                      : "text-gray-500 hover:text-pink-600"
                  }`
                }
                onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </NavLink>
            </li>
            {Object.entries(filters).map(([key, value]) => (
              <li key={value}>
                <NavLink
                  to={`/blog/category/${value}`}
                  className={({ isActive }) =>
                    `p-6 inline-block transition-all duration-100 ${
                      isActive
                        ? "text-pink-600 border-b-4 border-pink-600"
                        : "text-gray-500 hover:text-pink-600"
                    }`
                  }
                  onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {key}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Spacer for filter NavBar */}
      <div className="h-16 md:h-50"></div>
      {/* Filter Name and Description (shown only when filter is active) */}
      <div
        className={`flex flex-col justify-center items-center pt-8 pb-6 ${
          filter === "" ? "hidden" : "block"
        } transition-all duration-300 max-w-screen-xl mx-auto px-4`}
      >
        <h2 className="font-bold text-4xl md:text-5xl text-black mb-4">
          {filtersName[filter] || "Category"}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
          {filterDesc}
        </p>
      </div>
      {/* Blog Content */}
      <div className="flex justify-center items-center">
        <div className="content-center section grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 pt-3 max-w-screen-xl mx-auto px-4">
          {renderBlogList}
        </div>
      </div>
    </div>
  );
};

export default RenderBlogs;
