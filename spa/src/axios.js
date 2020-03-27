import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 2000
});

export default Axios;
