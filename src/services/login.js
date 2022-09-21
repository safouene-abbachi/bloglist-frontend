import axios from 'axios';
const baseUrl = '/api/login';
const login = async (credentials) => {
  const result = await axios.post(baseUrl, credentials);
  console.log('🚀 ~ result', result);
  return result.data;
};

export default login;
