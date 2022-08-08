import {useFormik} from "formik";
import {Paper, Grid, Button, InputLabel, Select, MenuItem, FormControl} from "@mui/material";
import axios from "axios";

function UpdateSampleExamPage(props) {

    const {testRecord, back, next} = props;

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {result:""},
        onSubmit(values) {
          handleUpdate(values);
        }
    });

    const handleUpdate = async (values) => {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}office/updateTestResult`, {...testRecord, ...values})
        next();
    }

    return testRecord === null?(
    <div>No Record Found 
        <Button fullWidth onClick={back}>
            {" "}Back{" "}
        </Button>  
    </div>):(
        <Paper>
        <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} direction={"column"}>
            <Grid item xs={8}>
                <p>Sample Id: {testRecord.sampleId}</p>
                <p>Name: {testRecord.firstName}</p>
                <p>ID Document No: {testRecord.idDocNo}</p>
                <p>Contact: {testRecord.mobile} </p>   
            </Grid>
            <Grid item xs={4}>
                <form onSubmit={handleSubmit} className="form-grid">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    
                    <InputLabel id="result-label">Test Result</InputLabel>
                    <Select labelId="result-label" name="result" value={values.result} label="Test Result" onChange={handleChange}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={"P"}>Pass</MenuItem>
                    <MenuItem value={"F"}>Fail</MenuItem>
                    </Select>   
                    <Button fullWidth type="submit">
                        {" "}
                        Update{" "}
                    </Button>
                    
                </FormControl>       
                </form>
            </Grid>
        </Grid>
        </Paper>
    )
}

export default UpdateSampleExamPage;