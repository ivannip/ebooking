import React, { useState, useEffect } from "react";
import {useFormik} from "formik"
import axios from "axios";
import * as yup from "yup";


function SelectCenter(props) {
  const { inputForm, next, back, formUpdate } = props;
  const [showAddress, setShowAddress] = useState("");
  const [places, setPlaces] = useState([]);

  const handleSelectChange = (e) => {
    const place = places.find((place) => place.name === e.target.value);
    if (place !== undefined) setShowAddress(place.address);
  };

  const validationSchema = yup.object({
    selectedPlace: yup.string().required("Please select a center"),
  });

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues: inputForm,
    validationSchema,
    onSubmit(values) {
      formUpdate(values);
      next();
    }
  });

  useEffect( () => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}public/allplace`);
        setPlaces(res.data);
      } catch (err) {
        console.log(err);
      }     
    }; 
    fetch();
    //console.log(process.env.REACT_APP_API_ENDPOINT);
  }, [])

  return (
    <div>
      <div>{errors.selectedPlace ? errors.selectedPlace : null}</div>
      <form onSubmit={handleSubmit} onChange={handleSelectChange}>
        <select name="selectedPlace" onChange={handleChange} value={values.selectedPlace}>
          <option>Select a center</option>
          {places.map((place, index) => {
            return (<option value={place.name} key={index}>{place.name}</option>)
          })}
        </select>
        <button onClick={back}>Back</button>
        <button type="submit">Next</button>   
      </form>
      {showAddress}
    </div>
  );
}

export default SelectCenter;