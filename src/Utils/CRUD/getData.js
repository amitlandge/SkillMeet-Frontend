import axios from "axios";
import { server } from "../../Constants/api.js";

const fetchData = async (url) => {
  try {
    console.log("Fetching from URL:", `${server}/${url}`);
    const res = await axios.get(`${server}/${url}`, {
      withCredentials: true, // send cookies (if using JWT in cookies)
    });
    console.log("Response:", res.data);
    return res.data; // return only data
  } catch (error) {
    console.error("Error fetching:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export default fetchData;
