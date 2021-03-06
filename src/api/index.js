import axios from "axios";

const API = axios.create({ baseURL: 'https://hieu-memories-prod.herokuapp.com/' })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})
// const url = "https://post-message-project.herokuapp.com/posts";

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searhQuery) => API.get(`/posts/search?searchQuery=${searhQuery.search || 'none'}&tags=${searhQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/comment`, { value })

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)