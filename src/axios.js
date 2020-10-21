import axios from "axios";
const instance = axios.create({
  // baseURL: "https://seg-server.herokuapp.com",
  baseURL: "http://192.168.1.6:8080",
});

export default instance;
