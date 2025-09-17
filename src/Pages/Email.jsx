import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { postDataHandler } from "../Utils/CRUD/postData";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending, data } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: (data) => {
      toast("Email Send Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
    },
  });
  const sendEmailHandler = () => {
    mutate({ url: `api/users/forgotpassword`, eventData: { email: email } });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { xs: "90%", md: "40%" },
        margin: "auto",
        mt: 5,
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button variant="contained" onClick={sendEmailHandler}>
        Send Reset Link
      </Button>
    </Box>
  );
};

export default Email;
