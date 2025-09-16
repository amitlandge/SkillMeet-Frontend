// src/components/VerticalNavbar.js

import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItem,
} from "@mui/material";
import {
  Home,
  School,
  Info,
  ExpandMore,
  ExpandLess,
  BackHand,
  ArrowRight,
  GroupAdd,
  AccountCircle,
  AdminPanelSettings,
  MoreVert,
  Collections,
  ThumbUp,
  RecordVoiceOver,
  Send,
  Book,
  RecordVoiceOverRounded,
  InfoOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { clearUser } from "../../Store/Reducers/userSlice.js";
import { server } from "../../Constants/api.js";
import { setSideMenu } from "../../Store/Reducers/misc.js";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.userAuth);

  const navigate = useNavigate();

  const [openMoreLinks, setOpenMoreLinks] = useState(false);
  const dispatch = useDispatch();
  const handleMoreLinksToggle = () => {
    setOpenMoreLinks(!openMoreLinks);
  };
  const oncloseMenubar = () => {
    dispatch(setSideMenu(false));
  };
  const logoutHandler = async () => {
    const res = await axios.get(`${server}/api/users/logout`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(clearUser());
      navigate("/login");
      oncloseMenubar();
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Link to={"/"} onClick={oncloseMenubar}>
            Home
          </Link>
        </ListItem>
        {isAuthenticated && (
          <>
            <ListItemButton>
              <ListItemIcon>
                <School />
              </ListItemIcon>

              <Link to={"/enroll"} onClick={oncloseMenubar}>
                Enroll
              </Link>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>

              <Link to={"/profile"} onClick={oncloseMenubar}>
                Profile
              </Link>
            </ListItemButton>
          </>
        )}
        <ListItemButton>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <Link to={"/findcourses"} onClick={oncloseMenubar}>
            Find Courses
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoOutline />
          </ListItemIcon>
          <Link to={"/about"} onClick={oncloseMenubar}>
            About
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Send />
          </ListItemIcon>

          <Link to={"/contact"} onClick={oncloseMenubar}>
            Contact
          </Link>
        </ListItemButton>

        <ListItemButton onClick={handleMoreLinksToggle}>
          <ListItemIcon>
            <MoreVert />
          </ListItemIcon>
          <ListItemText primary="More" />
          {openMoreLinks ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {isAuthenticated ? (
          <ListItemButton>
            <ListItemIcon>
              <BackHand />
            </ListItemIcon>
            <Link onClick={logoutHandler}>Logout</Link>
          </ListItemButton>
        ) : (
          <ListItemButton>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>

            <Link to={"/login"} onClick={oncloseMenubar}>
              Login
            </Link>
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Navbar;
