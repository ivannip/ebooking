import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Paper, Button, Grid, TextField} from "@mui/material";

function SearchPageBackOffice(props) {

    const {next, fetchTestRecord} = props;

    const validationSchema = Yup.object({
        sampleId: Yup.string().required("Sample ID is requred for searching")
      });
    
      const { handleSubmit, handleChange, errors } = useFormik({
        initialValues: { sampleId: "" },
        validationSchema,
        onSubmit(values) {
          fetchTestRecord(values.sampleId)
          next();
        }
      });
    
      return (
        <Paper>
          {errors.sampleId ? errors.sampleId : null}
          <Grid container spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12}>
              <TextField label="Input Sample ID for search" name="sampleId" onChange={handleChange}></TextField>
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


export default SearchPageBackOffice;