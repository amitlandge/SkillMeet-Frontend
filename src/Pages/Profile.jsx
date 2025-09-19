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

const Input = styled("input")({
  display: "none",
});

export default function ProfilePage() {
  const [role, setRole] = useState("learner");

  return (
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
        <Box textAlign="center" mb={4}>
          <label htmlFor="avatar-upload">
            <Input accept="image/*" id="avatar-upload" type="file" />
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
                cursor: "pointer",
                bgcolor: "primary.main",
              }}
            >
              U
            </Avatar>
          </label>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Click avatar to upload photo
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField label="Full Name" variant="outlined" fullWidth required />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            disabled
            value="user@example.com"
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            disabled
          >
            <MenuItem value="learner">Learner</MenuItem>
            <MenuItem value="tutor">Tutor</MenuItem>
          </TextField>

          <TextField label="Phone Number" variant="outlined" fullWidth />

          {/* Extra fields for Learner */}
          {role === "learner" && (
            <>
              <TextField
                label="Learning Goals"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Preferred Subjects"
                variant="outlined"
                fullWidth
              />
            </>
          )}

          {/* Extra fields for Tutor */}
          {role === "tutor" && (
            <>
              <TextField
                label="Bio / About Me"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Skills / Subjects"
                variant="outlined"
                fullWidth
              />
              <TextField label="Hourly Rate ($)" variant="outlined" fullWidth />
              <TextField
                label="Availability (e.g. Mon-Fri, 5-8pm)"
                variant="outlined"
                fullWidth
              />
            </>
          )}
        </Box>

        {/* Save Button */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ px: 6, py: 1.5, borderRadius: "12px" }}
          >
            Save Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
