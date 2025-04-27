import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  //   const data = {
  //     id: "cG9zdDozNjMzNg==",
  //     title: "Python for Data Analysis: Key Stats and Trends",
  //     categories: {
  //       nodes: [
  //         {
  //           slug: "news-and-events",
  //           name: "News & Events",
  //         },
  //       ],
  //     },
  //     date: "2025-04-09T09:31:54",
  //     excerpt:
  //       "<p>Neeraj Kumar is driven by a passion for exploring the intersection of artificial intelligence (AI) and robotics. </p>\n",
  //     featuredImage: {
  //       node: {
  //         altText: "",
  //         sourceUrl:
  //           "https://home-wordpress.deeplearning.ai/wp-content/uploads/2025/03/The-Batch-ads-and-exclusive-banners-2025-03-26T170306.194.png",
  //         mediaDetails: {
  //           width: 1890,
  //           height: 1063,
  //         },
  //       },
  //     },
  //     slug: "python-for-data-analysis-key-stats-and-trends",
  //     desiredSlug: null,
  //   };

  const data = props.blog;
  console.log(data);
  console.log(parse(data.excerpt));
  if (data === undefined) return <div> Blogs not found</div>;
  return (
    <div className="transition-transform duration-300 bg-white ease-in-out scale-90 hover:scale-100 hover:shadow-2xl hover:shadowshadow-2xl mx-auto">
      <img
        className="w-200 h-auto object-cover rounded-t-lg"
        src={data.featuredImage.node.sourceUrl}
      ></img>

      <span className="m-3 p-2 text-1xl text-gray-900 bg-gray-200">
        {data.categories.nodes[0].name}
      </span>

      <div className="section  p-5 pb-5">
        <div className="text-xl text-wrap font-semibold">
          <span>{` ${data.title.substring(0, 55)} ${
            data.title.length > 55 ? "..." : ""
          }`}</span>
        </div>
        <div className="pt-5 pb-3 text-s text-wrap text-gray-600">
          <span>{` ${parse(data.excerpt)[0].props.children.substring(0, 200)} ${
            parse(data.excerpt)[0].props.children.length > 200 ? "..." : ""
          }`}</span>
        </div>
        <div className="text-l pb-5 text-gray-500">
          {new Date(data.date).toDateString().substring(4)}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
