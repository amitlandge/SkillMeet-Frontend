import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfileView = () => {
  const { user } = useSelector((state) => state.userAuth);
  const { profileStatus, profile } = useSelector((state) => state.profile);

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
      <Card
        sx={{ maxWidth: 800, width: "100%", boxShadow: 4, borderRadius: 3 }}
      >
        <CardContent>
          {/* Avatar + Basic Info */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={profile?.profilePic}
              alt={user?.name}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {user?.name}
            </Typography>
            <Chip
              label={user?.role === "tutor" ? "Tutor" : "Learner"}
              color={user?.role === "tutor" ? "primary" : "secondary"}
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Common Info */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Grid>
          </Grid>

          {/* Tutor Specific */}
          {user?.role === "tutor" && profileStatus && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Tutor Information
              </Typography>
              <Box>
                {profile?.bio && (
                  <Box>
                    <Typography variant="subtitle2">Bio</Typography>
                    <Typography variant="body1">{profile?.bio}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                {profile?.phone && (
                  <Box>
                    <Typography variant="subtitle2">Phone Number</Typography>
                    <Typography variant="body1">{profile?.phone}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />

                {profile?.skills && (
                  <Box item lg={12}>
                    <Typography variant="subtitle2">Skills</Typography>
                    <Typography variant="body1">{profile?.skills}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />

                {profile?.hourlyRate && (
                  <Box item xs={12} sm={6}>
                    <Typography variant="subtitle2">Hourly Rate</Typography>
                    <Typography variant="body1">
                      Rs {profile?.hourlyRate}/hr
                    </Typography>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}></Grid>
            </>
          )}

          {/* Learner Specific */}
          {/* {user?.role === "learner" && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Learner Information
              </Typography>
              <Grid container spacing={2}>
                {learningGoals && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Learning Goals</Typography>
                    <Typography variant="body1">{learningGoals}</Typography>
                  </Grid>
                )}
                {phone && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Phone Number</Typography>
                    <Typography variant="body1">{phone}</Typography>
                  </Grid>
                )}
                {preferredSubjects && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Preferred Subjects
                    </Typography>
                    <Typography variant="body1">{preferredSubjects}</Typography>
                  </Grid>
                )}
              </Grid>
            </>
          )} */}
        </CardContent>
        {/* //button for create profile */}
        <Box textAlign="center" mb={3}>
          <Button variant="contained" color="primary">
            <Link
              to={profileStatus ? "/edit-profile" : "/create-profile"}
              style={{ color: "white", textDecoration: "none" }}
            >
              {profileStatus ? "Edit Profile" : "Create Profile"}
            </Link>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileView;
