import React, {useState} from "react";
import { useFormik } from "formik";
import axios from "axios";

function Preview(props) {
  const { inputForm, next, back} = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveBooking = async (values) => {
    const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}public/saveBooking`, values);
    console.log(res);
    next();
  }

  const { handleSubmit } = useFormik({
    initialValues: inputForm,
    onSubmit(values) {
        setIsSubmitting(true)
        saveBooking(values);
        setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Name: {inputForm.lastName} {inputForm.firstName}
      </p>
      <p>ID Document: {inputForm.idDocNo}</p>
      <p>Contact: {inputForm.mobile} </p>
      <p>Email: {inputForm.email} </p>
      <p>Contact Address: {inputForm.address}</p>
      <p>Selected Place: {inputForm.selectedPlace} </p>
      <p>Selected Date: {inputForm.selectedDate} </p>
      <p>Selected Time: {inputForm.selectedTime} </p>
      <button onClick={back}>Back</button>
      <button type="submit" disabled={isSubmitting}>Confirm</button>
    </form>
  );
}

export default Preview;