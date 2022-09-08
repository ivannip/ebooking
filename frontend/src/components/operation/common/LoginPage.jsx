import React, { useState, useContext } from "react";
import axios from "axios";
import {Checkbox, Grid, TextField, FormControlLabel, Paper, Button} from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const LoginPage = () => {
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState({ loginId: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleTextChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+"auth/login", JSON.stringify(user), {headers: {"Content-Type": "application/json"}});
      
      setUserContext({success:true, token: res.data.token, details: res.data.details});
      
    } catch (err) {
      ({...err}.response.status === 404)?setErrorMsg("Username or password incorrect!"):setErrorMsg("Other error");
    }
   
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        {errorMsg?errorMsg:""}
        <Grid
          container
          spacing={3}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="loginId"
              value={user.loginId}
              onChange={handleTextChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={"password"}
              name="password"
              value={user.password}
              onChange={handleTextChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={"Keep me logged in"}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleLogin} >
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;