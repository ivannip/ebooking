import React from "react";
import TimeSlot from "./TimeSlot";
//import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00"
];

function BookingForm(props) {
  const { inputForm, next, back, formUpdate } = props;

  return (
    <div className="booking-grid">
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={new Date(inputForm.selectedDate)}
            onChange={(newDate) => {
              formUpdate({
                selectedDate: newDate.toDateString()
              });
            }}
          />
        </LocalizationProvider>
      </div>
      <div>
        {timeSlots.map((slot, index) => {
          return (
            <TimeSlot timeSlot={slot} key={index} formUpdate={formUpdate} />
          );
        })}
      </div>

      <div>
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default BookingForm;