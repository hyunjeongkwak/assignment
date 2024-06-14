import axios from 'axios';

export const register = async ({ id, password, nickname }) => {
  try {
    const response = await axios.post('https://moneyfulpublicpolicy.co.kr/register', {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
    console.error('Error=> ', error);
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await axios.post('https://moneyfulpublicpolicy.co.kr/login', {
      id,
      password,
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
    console.error(error?.response?.data?.message);
  }
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const response = await axios.get('https://moneyfulpublicpolicy.co.kr/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error(error?.response?.data?.message);
    }
  }
};
