import axios from "axios";

const API = "http://127.0.0.1:8000";

export const loginDoctor = async (username, password) => {

  const res = await axios.post(`${API}/login`, {
    username,
    password
  });

  return res.data;
};