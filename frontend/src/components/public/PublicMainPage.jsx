
import React, { useState } from "react";
import CanditateInfo from "./CanditateInfo";
import Preview from "./Preview";
import SuccessPage from "./SuccessPage";
import BookingForm from "./BookingForm";
import SelectCenter from "./SelectCenter"
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


function PublicMainPage() {
    const defaultForm = {
        firstName: "",
        lastName: "",
        idDocNo: "",
        mobile: "",
        email: "",
        address: "",
        selectedPlace: "",
        selectedDate: new Date().toDateString(),
        selectedTime: "",
      };
    
      const steps = [
        "Personal Information",
        "Select Center",
        "Select booking slot",
        "Preview",
        "Complete"
      ];
    
      const [inputForm, setInputForm] = useState(defaultForm);
      const [step, setStep] = useState(0);
      
      const formUpdate = (values) => {
        setInputForm((prev) => {
          return { ...prev, ...values };
        });
        // console.log(inputForm);
      };
    
      const next = () => {
        setStep((prev) => prev + 1);
      };
    
      const back = () => {
        setStep((prev) => prev - 1);
      };
    
      const stepForms = [
        <CanditateInfo inputForm={inputForm} next={next} formUpdate={formUpdate} />,
        <SelectCenter
          inputForm={inputForm}
          next={next}
          back={back}
          formUpdate={formUpdate}
        />,
        <BookingForm
          inputForm={inputForm}
          next={next}
          back={back}
          formUpdate={formUpdate}
        />,
        <Preview
          inputForm={inputForm}
          next={next}
          back={back}
          formUpdate={formUpdate}
        />,
        <SuccessPage inputForm={inputForm} />
      ];
    
      return (
        <div>
          <Container maxWidth="md">
            <div className="stepper">
              <Stepper activeStep={step}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={index} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            <div className="formArea">{stepForms[step]}</div>
          </Container>
        </div>
      );
}

export default PublicMainPage;