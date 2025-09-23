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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../../Utils/CRUD/getData.js";
import { useSelector } from "react-redux";

const ProfileView = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.userAuth);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => fetchData("api/users/getcompleteprofile"),
  });

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load profile</Typography>;

  const {
    bio,
    profilePic,
    expertise,
    experience,
    qualifications,
    hourlyRate,
    courses,
    learningGoals,
    phone,
    preferredSubjects,

    // level,
  } = data?.profile;
  console.log(data?.profile);

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
      <Card
        sx={{ maxWidth: 800, width: "100%", boxShadow: 4, borderRadius: 3 }}
      >
        <CardContent>
          {/* Avatar + Basic Info */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={profilePic}
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
            {bio && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Bio
                </Typography>
                <Typography variant="body1">{bio}</Typography>
              </Grid>
            )}
          </Grid>

          {/* Tutor Specific */}
          {user?.role === "tutor" && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Tutor Information
              </Typography>
              <Grid container spacing={2}>
                {expertise && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Expertise</Typography>
                    <Typography variant="body1">{expertise}</Typography>
                  </Grid>
                )}
                {experience && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Experience</Typography>
                    <Typography variant="body1">{experience} years</Typography>
                  </Grid>
                )}
                {qualifications && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Qualifications</Typography>
                    <Typography variant="body1">{qualifications}</Typography>
                  </Grid>
                )}
                {hourlyRate && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Hourly Rate</Typography>
                    <Typography variant="body1">${hourlyRate}/hr</Typography>
                  </Grid>
                )}
                {courses?.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Courses Offered</Typography>
                    <ul>
                      {courses.map((course, idx) => (
                        <li key={idx}>
                          <Typography variant="body1">{course}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                )}
              </Grid>
            </>
          )}

          {/* Learner Specific */}
          {user?.role === "learner" && (
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileView;
