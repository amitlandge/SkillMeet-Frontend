import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../Store/Reducers/userSlice";
import { server } from "../Constants/api.js";

const useUser = () => {
  const dispatch = useDispatch();
  const loadUser = async () => {
    try {
      const res = await axios.get(`${server}/api/users/me`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        dispatch(setUser(res.data?.user));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went Wrong");
      dispatch(isNotAuthenticated());
    }
  };
  return [loadUser];
};
export default useUser;
