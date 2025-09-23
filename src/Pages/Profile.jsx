import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import userSlice from "../Store/Reducers/userSlice";
import { useSelector } from "react-redux";
import { learnerProfileSchema } from "../Features/ValidationSchema/learnerSchema.js";
import { tutorProfileSchema } from "../Features/ValidationSchema/tutorSchema.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { postDataHandler } from "../Utils/CRUD/postData.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import fetchData from "../Utils/CRUD/getData.js";
import ProfileView from "./Home/ProfileView.jsx";
const Input = styled("input")({
  display: "none",
});

export default function ProfilePage() {
  const { data,isSuccess } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => fetchData("api/users/getcompleteprofile"),
    
  });
  console.log(isSuccess,data)
  const [role, setRole] = useState("learner");
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState = { errors },
  } = useForm({
    resolver: yupResolver(
      user.role === "learner" ? learnerProfileSchema : tutorProfileSchema
    ),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setUser(data?.user));
      toast("Profile Completed Successfully");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
      dispatch(clearUser());
    },
  });
  const onSubmitDataHandler = (data) => {
    const formData = new FormData();

    // Append text fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append image if selected
    if (file) {
      formData.append("profilePic", file); // 👈 must match multer field name
    }
    mutate({ url: "api/users/createprofile", eventData: formData });
  };
  return (
    <>
      {isSuccess && <ProfileView />}
      {!isSuccess && (
        <Container maxWidth="sm" sx={{ py: 6 }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: "20px" }}>
            {/* Header */}
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Complete Your Profile
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Fill in your details to unlock full features of SkillMeet 🚀
            </Typography>

            {/* Avatar Upload */}
            <Box component="form" onSubmit={handleSubmit(onSubmitDataHandler)}>
              <Box textAlign="center" mb={4}>
                <label htmlFor="avatar-upload">
                  <Controller
                    name="profilePic"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        accept="image/*"
                        id="avatar-upload"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            console.log(reader.result);
                            field.onChange(reader.result);
                          };
                        }}
                      />
                    )}
                  />

                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "auto",
                      cursor: "pointer",
                      bgcolor: "primary.main",
                    }}
                    src={file && URL.createObjectURL(file)}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </Avatar>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Click avatar to upload photo
                </Typography>
              </Box>

              {/* Form Fields */}
              <Box display="flex" flexDirection="column" gap={3}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={user.name || ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      error={!!formState.errors.name}
                      helperText={formState.errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email || ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  defaultValue={user.phone || ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      error={!!formState.errors.phone}
                      helperText={formState.errors.phone?.message}
                    />
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  defaultValue={user.role || "learner"}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="I am a"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        field.onChange(e);
                        setRole(e.target.value);
                      }}
                      error={!!formState.errors.role}
                      helperText={formState.errors.role?.message}
                    >
                      <MenuItem value="learner">Learner</MenuItem>
                      <MenuItem value="tutor">Tutor</MenuItem>
                    </TextField>
                  )}
                />
                {role === "learner" && (
                  <>
                    <Controller
                      name="learningGoals"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Learning Goals"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!formState.errors.learningGoals}
                          helperText={formState.errors.learningGoals?.message}
                        />
                      )}
                    />
                    <Controller
                      name="preferredSubjects"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Preferred Subjects"
                          variant="outlined"
                          fullWidth
                          error={!!formState.errors.preferredSubjects}
                          helperText={
                            formState.errors.preferredSubjects?.message
                          }
                        />
                      )}
                    />
                  </>
                )}

                {/* Extra fields for Tutor */}
                {role === "tutor" && (
                  <>
                    <Controller
                      name="bio"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Bio"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!formState.errors.bio}
                          helperText={formState.errors.bio?.message}
                        />
                      )}
                    />
                    <Controller
                      name="skills"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Skills (comma separated)"
                          variant="outlined"
                          fullWidth
                          error={!!formState.errors.skills}
                          helperText={formState.errors.skills?.message}
                        />
                      )}
                    />
                    <Controller
                      name="hourlyRate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          type="number"
                          {...field}
                          label="Hourly Rate ($)"
                          variant="outlined"
                          fullWidth
                          error={!!formState.errors.hourlyRate}
                          helperText={formState.errors.hourlyRate?.message}
                        />
                      )}
                    />
                    <Controller
                      name="availability"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Availability"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={2}
                          error={!!formState.errors.availability}
                          helperText={formState.errors.availability?.message}
                        />
                      )}
                    />
                  </>
                )}
              </Box>

              {/* Save Button */}
              <Box textAlign="center" mt={5}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{ px: 6, py: 1.5, borderRadius: "12px" }}
                >
                  Save Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
