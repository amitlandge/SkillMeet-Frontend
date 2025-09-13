import { Typography, Box, ListItem, List, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        p: 2,
        mb: 2,
        display: "flex",
        // justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          width: "20%",
          marginRight: "auto",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
        >
          SkillMeet
        </Typography>
      </Stack>
      <Box
        sx={{
          width: "45%",
          display: "flex",
        }}
      >
        <ListItem>
          <Link to={"/"}>Home</Link>
        </ListItem>
        <ListItem>
          <Link>Find Courses</Link>
        </ListItem>
        <ListItem>
          <Link>About Us</Link>
        </ListItem>
        <ListItem>
          <Link>Contact Us</Link>
        </ListItem>
        <ListItem>
          <Link to={"/login"}>Login</Link>
        </ListItem>
      </Box>
    </Box>
  );
};

export default Navbar;
