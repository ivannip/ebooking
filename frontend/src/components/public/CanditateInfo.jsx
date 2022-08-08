import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function CanditateInfo(props) {
  const { inputForm, next, formUpdate } = props;

  const validationSchema = yup.object({
    firstName: yup.string().required("first name is requred"),
    lastName: yup.string().required("last name  is required"),
    idDocNo: yup.string().required("ID Document No. is required"),
    mobile: yup.string().required("Mobile is required"),
    email: yup.string().required("Email is required"),
    address: yup.string().required("Contact Address is required"),
  });

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues: inputForm,
    
    onSubmit(values) {
      formUpdate(values);
      next();
    }
  });

  return (
    <div >
      <form onSubmit={handleSubmit} className="form-grid">
        First Name:
        <div>
        <input
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        {errors.firstName ? errors.firstName : null}</div>
        Last Name:
        <div><input name="lastName" value={values.lastName} onChange={handleChange}/>
        {errors.lastName ? errors.lastName : null}</div>
        ID Document No:
        <div><input name="idDocNo" value={values.idDocNo} onChange={handleChange}/>
        {errors.idDocNo? errors.idDocNo: null}</div>
        Mobile:
        <div><input name="mobile" value={values.mobile} onChange={handleChange} />
        {errors.mobile ? errors.mobile : null}</div>
        Email:
        <div><input name="email" value={values.email} onChange={handleChange} />
        {errors.email ? errors.email : null}</div>
        Address:
        <div>
          <textarea name="address" value={values.address} onChange={handleChange} />
          {errors.address? errors.address: null}
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default CanditateInfo;