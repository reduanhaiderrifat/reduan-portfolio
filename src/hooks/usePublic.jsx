import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://reduan-portfolio.vercel.app",
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;
