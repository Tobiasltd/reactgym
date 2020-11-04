import React, { Fragment, useContext } from "react";
import Blogs from "../blogs/Blogs";
import BlogContext from "../../context/blog/blogContext";

const Blog = () => {
  const blogContext = useContext(BlogContext);
  const { blogview } = blogContext;

  return (
    <div>
      {!blogview && (
        <div className="blogcontainer">
          <img
            src="https://images.unsplash.com/photo-1603233720024-bebea0128645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
            alt=""
          />
          <div className="overlay"></div>
          <div className="centeredtext">
            <h1 className="xxx-large">THE BLOG</h1>
          </div>
        </div>
      )}

      <Fragment>
        <Blogs />
      </Fragment>
    </div>
  );
};

export default Blog;
