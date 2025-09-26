import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const CompleteProfilePrivate = () => {
  const { profileStatus } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.userAuth);
  return (
    <Box>
      {!profileStatus && isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </Box>
  );
};

export default CompleteProfilePrivate;
