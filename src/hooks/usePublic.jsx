import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:3000", // replace with your API base URL
  baseURL: "https://reduan-portfolio.vercel.app", // replace with your API base URL
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;
