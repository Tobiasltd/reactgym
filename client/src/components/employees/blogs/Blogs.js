import React, { useContext, useEffect } from "react";
import BlogItem from "./BlogItem";
import BlogView from "./BlogView";
import BlogContext from "../../../context/blog/blogContext";
import Spinner from "../../layout/Spinner";

const Blogs = () => {
  const blogContext = useContext(BlogContext);
  const { blogs, getBlogs, loading, blogview } = blogContext;

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  let bg = "bg-white";
  if (blogview) {
    bg = "";
  }

  return (
    <div className={bg}>
      {blogs !== null && !loading && !blogview ? (
        <div className="grid-2 ">
          {blogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </div>
      ) : blogview ? (
        <BlogView key={blogview._id} blog={blogview} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Blogs;
