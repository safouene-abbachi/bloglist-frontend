import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const createNewBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const result = await axios.post(baseUrl, blog, config);
  return result.data;
};

const addLikes = async (blog) => {
  console.log('🚀 ~ blog', blog);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const result = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return result.data;
};

const deleteBlogUser = async (blog) => {
  console.log('🚀 ~ blog', blog);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const result = await axios.delete(`${baseUrl}/${blog.id}`, config);
  console.log('🚀 ~ result', result);
  return result.data;
};
export { getAll, setToken, createNewBlog, addLikes, deleteBlogUser };
