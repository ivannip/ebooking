import React from "react";
import { Paper, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function SearchPage(props) {
  const { next, fetchBooking } = props;

  const validationSchema = Yup.object({
    mobile: Yup.string().required("Mobile is requred for searching")
  });

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: { mobile: "" },
    validationSchema,
    onSubmit(values) {
      fetchBooking(values.mobile);
      next();
    }
  });

  return (
    <Paper>
      {errors.mobile ? errors.mobile : null}
      <Grid container spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12}>
          <TextField label="Input mobile for search" name="mobile" onChange={handleChange}></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={handleSubmit}>
            {" "}
            Search{" "}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SearchPage;