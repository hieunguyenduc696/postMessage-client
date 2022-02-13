import { FETCH_ALL, FETCH_POST, FETCH_BY_POST, UPDATE, CREATE, DELETE, START_LOADING, END_LOADING } from "../constant/actionTypes";

const posts = (posts = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...posts, isLoading: true };
    case END_LOADING:
      return { ...posts, isLoading: false };
    case FETCH_ALL:
      return {
          ...posts,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
    case FETCH_BY_POST:
      return { ...posts, posts: action.payload }
    case FETCH_POST:
      return { ...posts, post: action.payload }
    case CREATE:
      return { ...posts, posts: [...posts, action.payload] };
    case UPDATE:
      return { ...posts, posts: posts.posts.map((post) => post._id === action.payload._id ? action.payload : post ) };
    case DELETE:
      return { ...posts, posts: posts.posts.filter((post) => post._id !== action.payload) };
    default:
      return posts;
  }
};

export default posts;
