import React, {useState} from "react";
import {Button, Paper, Grid} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function UpdateSampleIdPage(props) {

    const {bookingRecord, next, shwUpdateForm, setShwUpdateForm} = props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = yup.object({
        sampleId: yup.string().required("Sample ID is requred"),
    });

    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {sampleId: ""},
        validationSchema,
        onSubmit(values) {
          setIsSubmitting(true);
          handleUpdate(values);
        }
    });

    const handleUpdate = async (values) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+"center/updateSampleNo", {...bookingRecord, ...values});
            if (res.status === 200) {
                setShwUpdateForm(false);
                next();
            }
            else
                console.log(res.data.message);
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return shwUpdateForm?(
        <Paper>
        <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} direction={"column"}>
            <Grid item xs={8}>
                <Grid container spaceing={4}>
                    <Grid item xs={8}>
                        <p>Name: {bookingRecord.lastName} {bookingRecord.firstName}</p>
                        <p>Contact: {bookingRecord.mobile} </p>
                        <p>Email: {bookingRecord.email} </p>
                        <p>Address: {bookingRecord.address} </p>
                        <p>Center: {bookingRecord.selectedPlace} </p>
                        <p>Scheduled Date: {new Date(bookingRecord.selectedDate).toISOString().split('T')[0]} </p>
                        <p>Scheduled Time: {bookingRecord.selectedTime} </p>
                    </Grid>
                    <Grid item xs={4}>
                        <form  onSubmit={handleSubmit} className="form-grid">
                            <div>SampleNo: <input name="sampleId" value={values.sampleId} onChange={handleChange}/>
                            {errors.sampleNo?errors.sampleNo:null}
                                <Button fullWidth type="submit" disable={isSubmitting}>
                                        {" "}
                                        Update{" "}
                                </Button>
                            </div>        
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        
        </Paper>
    ):"";
}

export default UpdateSampleIdPage;