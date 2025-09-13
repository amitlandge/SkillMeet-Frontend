import axios from "axios";
import { server } from "../../Constants/api.js";

export async function postDataHandler(prop) {
  const { url, eventData } = prop;
  console.log("Props:", prop);
  console.log(server);
  try {
    const res = await axios.post(`${server}/${url}`, eventData, {
      withCredentials: true,
      headers: prop.headers && prop.headers,
    });
    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    const customError = new Error("An error occurred while creating the data");
    customError.code = error.response?.status || 500;
    customError.info = error.response?.data || null;
    throw customError;
  }
}
