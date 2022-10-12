import axios from "axios";

const login = async (data) => {
  const response = await axios.post("http://localhost:8000/api/login/", data);
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/register/",
    data
  );
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
