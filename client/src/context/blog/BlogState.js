import React, { useReducer } from "react";
import axios from "axios";
import BlogContext from "./blogContext";
import blogReducer from "./blogReducer";
import {
  GET_BLOGS,
  ADD_BLOG,
  EDIT_BLOG,
  DELETE_BLOG,
  VIEW_BLOG,
  CLEAR_VIEW,
  SET_LOADING,
  BLOG_ERROR,
} from "../types";

const BlogState = (props) => {
  const initialState = {
    blogs: null,
    loading: false,
    blogview: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Get blogs
  const getBlogs = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/blogs", {});
      dispatch({
        type: GET_BLOGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add a blog
  const addBlog = async (blog) => {
    try {
      setLoading();
      const res = await axios.post("/api/blogs", {});
      dispatch({
        type: ADD_BLOG,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // edit a blog
  const editBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading();
      const res = await axios.put(`/api/blogs/${blog._id}`, blog, config);
      dispatch({ type: EDIT_BLOG, payload: res.data });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete a blog
  const deleteBlog = async (blog) => {
    try {
      setLoading();
      await axios.delete(`/api/blogs/${blog._id}`);
      dispatch({ type: DELETE_BLOG, payload: blog._id });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  // View blog
  const viewBlog = (blogview) => {
    setLoading();
    dispatch({ type: VIEW_BLOG, payload: blogview });
  };

  const clearView = () => {
    dispatch({
      type: CLEAR_VIEW,
    });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        blogview: state.blogview,
        loading: state.loading,
        getBlogs,
        addBlog,
        editBlog,
        deleteBlog,
        viewBlog,
        clearView,
        setLoading,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
