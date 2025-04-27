import axios from "axios";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="pt-16 px-4 bg-gray-100 min-h-screen font-inter">
    <div className="container justify-items-center mx-auto max-w-4xl">
      <div className="h-10 w-3/4 bg-gray-300 animate-pulse mb-4"></div>
      <div className="h-6 w-1/4 bg-gray-300 animate-pulse mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-4/5 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  </div>
);

// PostContent component with memoization
const PostContent = React.memo(({ postData }) => {
  if (typeof postData.content !== "string" || postData.content.trim() === "") {
    return (
      <div className="text-gray-500 italic font-inter">
        Invalid or no content
      </div>
    );
  }

  try {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(
      postData.content,
      "text/html"
    );
    if (parsedDocument.querySelector("parsererror")) {
      return (
        <div className="text-red-500 italic font-inter">
          Error parsing content
        </div>
      );
    }

    console.log(parsedDocument.documentElement);

    const sanitizedHTML = DOMPurify.sanitize(postData.content, {
      USE_PROFILES: { html: true },
    });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  } catch (error) {
    console.error("Error processing content:", error);
    return (
      <div className="text-red-500 italic font-inter">
        Error processing content
      </div>
    );
  }
});

const BlogPost = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache for API responses
  const cache = useMemo(() => new Map(), []);

  useEffect(() => {
    let isMounted = true;

    const fetchPostData = async () => {
      if (cache.has(slug)) {
        if (isMounted) {
          setPostData(cache.get(slug));
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.deeplearning.ai/_next/data/eN48kkBZ29QCuMFwGR4lT/blog/${slug}.json?slug=${slug}`,
          { timeout: 5000 }
        );

        if (isMounted) {
          const post = response.data?.pageProps?.post;
          if (post) {
            cache.set(slug, post);
            setPostData(post);
          } else {
            throw new Error("Post data not found in response");
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching post data:", err);
          setError(err.message || "Failed to fetch post data");
          setLoading(false);
        }
      }
    };

    fetchPostData();

    return () => {
      isMounted = false;
    };
  }, [slug, cache]);

  // Render based on state
  if (loading) {
    return (
      <Suspense
        fallback={
          <div className="text-center pt-50 font-inter">Loading...</div>
        }
      >
        <SkeletonLoader />
      </Suspense>
    );
  }
  if (error)
    return (
      <div className="text-center pt-16 text-red-500 font-inter">
        Error: {error}
      </div>
    );
  if (!postData)
    return (
      <div className="text-center pt-16 text-gray-500 font-inter">
        No post data available
      </div>
    );

  return (
    <div className="pt-40 px-4  min-h-screen font-inter">
      <style>{`p {color:black; padding-top:1rem;}   figure { 
    display: block;
  margin: auto;
  width: 50%;
  padding-top:2rem
;}
.size-large {width: 90%;}
.is-style-h3 {font-size:2rem; font-color:pink}`}</style>
      <div className="container justify-items-center mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:text-4xl">
          {postData.title || "Blog Post Title"}
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Published on {postData.date || "April 26, 2025"}
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Suspense
            fallback={
              <div className="text-gray-500 font-inter">Loading content...</div>
            }
          >
            <PostContent postData={postData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
