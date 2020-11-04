import React, { useContext } from "react";
import BlogContext from "../../context/blog/blogContext";
import PropTypes from "prop-types";

const BlogItem = ({ blog }) => {
  const { title, imgheader, writtenby, topic } = blog;
  const blogContext = useContext(BlogContext);
  const { viewBlog } = blogContext;

  let btnclass;
  switch (topic) {
    case "Workouts":
      btnclass = "btn btn-secondary";
      break;
    case "Food":
      btnclass = "btn btn-primary";
      break;
    case "Gear":
      btnclass = "btn btn-offcolor";
      break;
    default:
      btnclass = "btn btn-primary";
      break;
  }

  const onClick = () => {
    window.scrollTo(0, 0);
    viewBlog(blog);
  };

  return (
    <div onClick={onClick} className="card text-center pointer mx-1">
      <img alt="" src={imgheader}></img>
      <button className={btnclass}>{topic}</button>
      <h2>{title}</h2>
      <h4>By {writtenby}</h4>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogItem;
