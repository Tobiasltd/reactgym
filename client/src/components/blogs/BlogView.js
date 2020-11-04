import React, { useContext } from "react";
import PropTypes from "prop-types";
import BlogContext from "../../context/blog/blogContext";

const BlogView = ({ blog }) => {
  const {
    title,
    imgheader,
    writtenby,
    text,
    text2,
    text3,
    topic,
    subtitle,
  } = blog;
  const blogContext = useContext(BlogContext);

  const { clearView } = blogContext;

  const clear = () => {
    clearView();
  };

  return (
    <div className="text-center pointer">
      <div className="blogcontainer">
        <img alt="" src={imgheader}></img>
        <div className="overlay"></div>
        <div className="centeredtext">
          <h1 className="x-large">{title}</h1>
        </div>
      </div>
      <h4 className="mt-2 d-inline">in {topic} - </h4>
      <h4 className="d-inline"> By {writtenby}</h4>
      <div className="p-5 text-left">
        <p className="bold">
          {subtitle} <br /> <br />
        </p>
        <p>
          {text}
          <br />
          <br />
        </p>
        <p>
          {text2}
          <br />
          <br />
        </p>
        <p>{text3}</p>
      </div>
      <div className="text-right">
        <button onClick={clear} className="btn btn-primary mb-2 mr-3">
          Return
        </button>
      </div>
    </div>
  );
};

BlogView.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogView;
