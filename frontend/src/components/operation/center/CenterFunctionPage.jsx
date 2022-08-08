import React, { useState } from "react";
import SearchPage from "./SearchPage";
import ListBookingPage from "./ListBookingPage";
//import UpdateResultPage from "./UpdateResultPage";
import ResultPage from "./ResultPage";
import axios from "axios";

function CenterFunctionPage() {
  const [step, setStep] = useState(0);
  const [bookingRecords, setBookingRecords] = useState([]);
  
  const next = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };

  const fetchBooking = async (_mobile) => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+"center/bookingByMobile", {mobile: _mobile});
      setBookingRecords(res.data);
    } catch (err) {
      console.log(err)
    } 
  };

  const stepPages = [
    <SearchPage next={next} fetchBooking={fetchBooking} />,
    <ListBookingPage next={next} bookingRecords={bookingRecords} />,
    <ResultPage />
  ];
  return <div>{stepPages[step]}</div>;
}

export default CenterFunctionPage;