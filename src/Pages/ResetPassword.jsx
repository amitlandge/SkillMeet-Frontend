import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import resetPasswordSchema from "../Features/ValidationSchema/resetPasswordSchema.js";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../Utils/CRUD/postData.js";
import { toast } from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { putDataHandler } from "../Utils/CRUD/putData.js";
// ✅ Yup Validation Schema

const ResetPassword = () => {
  const { token } = useParams(); // extract token from URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });
  const { mutate, isPending, data } = useMutation({
    mutationFn: putDataHandler,
    onSuccess: (data) => {
      toast("Password Reset Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
    },
  });
  // ✅ Submit Handler
  const onSubmit = async (data) => {
    console.log(data)
    mutate({ url: `api/users/resetpassword/${token}`, eventData: data });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Reset Password
        </Typography>

        

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 2,gap:2, display:"flex", flexDirection:"column" }}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
