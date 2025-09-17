import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../Store/Reducers/userSlice";
import { server } from "../Constants/api.js";
import { toast } from "react-toastify";

const useUser = () => {
  const dispatch = useDispatch();
  const loadUser = async () => {
    try {
      const res = await axios.get(`${server}/api/users/me`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(res.data?.user));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went Wrong");
      dispatch(clearUser());
    }
  };
  return [loadUser];
};
export default useUser;
