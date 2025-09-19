import { Box } from '@mui/material';
import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const TutorPrivateRoutes = () => {
const {isAuthenticated,user}=useSelector((state)=>state.userAuth)
  return (
    <Box>
        {user?.role === "tutor" && isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </Box>
  )
}

export default TutorPrivateRoutes