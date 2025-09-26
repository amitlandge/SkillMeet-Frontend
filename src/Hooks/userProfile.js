import axios from "axios";
import { useDispatch } from "react-redux";

import { server } from "../Constants/api.js";
import { toast } from "react-toastify";
import { clearProfile, setProfile } from "../Store/Reducers/profileSlice.js";

const useProfile = () => {
  const dispatch = useDispatch();
  const loadProfile = async () => {
    try {
      const res = await axios.get(`${server}/api/users/getcompleteprofile`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        if (res.data?.profile === null) {
          console.log(res.data.profile);
          dispatch(clearProfile());
        } else {
          dispatch(setProfile(res.data?.profile));
        }
      } else {
        dispatch(clearProfile());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went Wrong");
      dispatch(clearProfile());
    }
  };
  return [loadProfile];
};
export default useProfile;
