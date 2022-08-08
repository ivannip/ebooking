import React from "react";

function SuccessPage({ inputForm }) {
  return (
    <div>
      <p>
        Name: {inputForm.lastName} {inputForm.firstName}
      </p>
      <p>Contact: {inputForm.mobile} </p>
      <p>Email: {inputForm.email} </p>
      <p>Selected Place: {inputForm.selectedPlace} </p>
      <p>Selected Date: {inputForm.selectedDate} </p>
      <p>Selected Time: {inputForm.selectedTime} </p>
    </div>
  );
}

export default SuccessPage;