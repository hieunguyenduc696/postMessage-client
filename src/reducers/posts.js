import { FETCH_ALL, FETCH_BY_POST, UPDATE, CREATE, DELETE } from "../constant/actionTypes";

const posts = (posts = [], action) => {
  switch (action.type) {
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return {
        ...posts,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_POST:
      return {
        ...posts,
        posts: action.payload,
      };
    case CREATE:
      return [...posts, action.payload];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default posts;
