import React, {useState} from "react";
import SearchPageBackOffice from "./SearchPageBackOffice";
import UpdateSampleExamPage from "./UpdateSampleExamPage";
import ResultPageBackOffice from "./ResultPageBackOffice";
import axios from "axios";

function BackOfficeFunctionPage() {
    const [testRecord, setTestRecord] = useState({});
    const [step, setStep] = useState(0);

    const next = () => {
        setStep((prev) => {
          return prev + 1;
        });
    };

    const back = () => {
        setStep((prev) => {
            return prev - 1
        })
    }

    const fetchTestRecord = async(sampleId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}office/findTestRecord/${sampleId}`);
            const results = res.data;
            if (results.length === 0 || results === undefined) {
                setTestRecord(null);
                return false;
            } else {
                setTestRecord(results[0]);
                return true;
            }
        } catch (err) {
            console.log(err)
        }   
    }

    const stepPages = [
        <SearchPageBackOffice next={next} fetchTestRecord={fetchTestRecord}/>,
        <UpdateSampleExamPage next={next} back={back} testRecord={testRecord}/>,
        <ResultPageBackOffice />
      ];
    
    return <div>{stepPages[step]}</div>;


}

export default BackOfficeFunctionPage;