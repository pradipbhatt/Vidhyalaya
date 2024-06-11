// src/api/blog.js

import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createBlog = async (token, blogData) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const deleteBlog = async (token, blogId) => {
  const response = await axios.delete(`${API_URL}/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
