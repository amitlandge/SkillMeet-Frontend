import React, { use, useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Person } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../Features/ValidationSchema/userLoginSchema.js";
import { registerSchema } from "../../Features/ValidationSchema/userRegisterSchema.js";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../Store/Reducers/userSlice.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { postDataHandler } from "../../Utils/CRUD/postData.js";
export default function Login() {
  const [loginTab, setLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userAuth);
  const { mutate, isPending, data } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setUser(data?.user));
      toast("Login Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
      dispatch(clearUser());
    },
  });
  const handleChange = () => {
    setLoginTab(!loginTab);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginTab ? loginSchema : registerSchema),
  });
  const onLoginHandler = (data) => {
    console.log(data);
    if (loginTab) {
      // Handle login logic here
      mutate({ url: "api/users/login", eventData: data });

      console.log("Login Data:", data);
    } else {
      mutate({ url: "api/users/register", eventData: data });
      console.log("Registration Data:", data);
    }
  };
  useEffect(() => {
    reset();
  }, [loginTab, reset]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "30%",
        }}
      >
        <Box
          sx={{ width: "100%", maxWidth: 800, borderRadius: 3, boxShadow: 4 }}
        >
          <CardContent
            component={"form"}
            onSubmit={handleSubmit(onLoginHandler)}
          >
            {/* Tabs */}
            <Tabs
              value={loginTab ? 0 : 1}
              onChange={handleChange}
              variant="fullWidth"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold">
                {loginTab === true ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {loginTab === true
                  ? "Sign in to your account to continue"
                  : "Sign up to start your learning journey"}
              </Typography>
            </Box>

            {/* Social Buttons */}
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ textTransform: "none", color: "gray" }}
              >
                Continue with Google
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                OR
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Email & Password */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {!loginTab && (
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      label="User Full Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.fullName}
                      helperText={
                        errors.fullName ? errors.fullName.message : ""
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

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

              {!loginTab && (
                <>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.confirmPassword}
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword.message
                            : ""
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="role"
                    control={control}
                    defaultValue="learner" // 👈 Learner pre-selected
                    render={({ field }) => (
                      <FormControl component="fieldset" error={!!errors.role}>
                        <FormLabel id="role-label">Role</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="role-label"
                          {...field} // ✅ connect RadioGroup with RHF
                        >
                          <FormControlLabel
                            value="learner"
                            control={<Radio />}
                            label="Learner"
                          />
                          <FormControlLabel
                            value="tutor"
                            control={<Radio />}
                            label="Tutor"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </>
              )}
            </Box>

            {/* Forgot Password */}
            {loginTab === true && (
              <Typography
                component={Link}
                to={"/sendtoemail"}
                variant="body2"
                color="primary"
                sx={{
                  mt: 1,
                  display: "block",
                  cursor: "pointer",
                  textAlign: "right",
                }}
              >
                Forgot password?
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                fontWeight: "bold",
                bgcolor: "var(--primary-800)",
              }}
            >
              {loginTab === true ? "Sign In" : "Sign Up"}
            </Button>

            {/* Footer Links */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {loginTab === true
                ? `Don't have an account? `
                : `Already have an account? `}
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setLoginTab(loginTab === true ? false : true)}
              >
                {loginTab === true ? "Sign up here" : "Sign in here"}
              </Typography>
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
}
