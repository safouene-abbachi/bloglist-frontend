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
export { getAll, setToken, createNewBlog };
