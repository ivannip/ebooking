import React from "react";
//import {Box, AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import {Box, AppBar, Toolbar, IconButton, Typography, Button} from "@mui/material";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuIcon from "@mui/icons-material/Menu";

function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <Button onClick={props.logout} color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;