import axios from "axios";

const login = async (data) => {
  const response = await axios.post("/api/login/", data);
  return response.data;
};

const register = async (data) => {
  const response = await axios.post("/api/register/", data);
  return response.data;
};

const fetchUsers = async (data) => {
  const { token } = data;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get("/api/users/", config);
  return response.data;
};

const authService = {
  login,
  register,
  fetchUsers,
};

export default authService;
