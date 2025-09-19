import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const LearnerPrivateRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userAuth);
  return (
    <Box>
      {user?.role === "learner" && isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </Box>
  );
};

export default LearnerPrivateRoutes;
