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

const blogReducer = (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };
    case EDIT_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        loading: false,
      };
    case VIEW_BLOG:
      return {
        ...state,
        blogview: action.payload,
        loading: false,
      };
    case CLEAR_VIEW:
      return {
        ...state,
        blogview: null,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default blogReducer;
