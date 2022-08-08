import React, { useState } from "react";

const TimeSlot = ({ timeSlot, formUpdate }) => {
  const [dynColor, setDynColor] = useState("#FFF");

  const handleSelectTime = (e) => {
    setDynColor((prev) => {
      return prev === "#FFF" ? "#FAA" : "#FFF";
    });
    formUpdate({ [e.target.name]: e.target.value });
  };

  return (
    <input
      className="timeSlot"
      name="selectedTime"
      style={{ background: `${dynColor}` }}
      onClick={handleSelectTime}
      value={timeSlot}
      readOnly
    />
  );
};

export default TimeSlot;