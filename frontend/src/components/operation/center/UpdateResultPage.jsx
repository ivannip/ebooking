import React from "react";
// import { Paper, Grid, TextField, Button } from "@material-ui/core";
import { Paper, Grid, TextField, Button } from "@mui/material";

function UpdateResultPage(props) {
  const { next, bookingRecord } = props;

  return (
    <Paper>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <TextField
            label="First Name"
            name="firstName"
            defaultValue={bookingRecord.firstName}
            InputProps={{
              readOnly: true
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            name="lastName"
            defaultValue={bookingRecord.lastName}
            InputProps={{
              readOnly: true
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mobile"
            name="mobile"
            defaultValue={bookingRecord.mobile}
            InputProps={{
              readOnly: true
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            defaultValue={bookingRecord.email}
            InputProps={{
              readOnly: true
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Selected Center"
            name="selectedPlace"
            defaultValue={bookingRecord.selectedPlace}
            InputProps={{
              readOnly: true
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={next}>
            {" "}
            Update{" "}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UpdateResultPage;