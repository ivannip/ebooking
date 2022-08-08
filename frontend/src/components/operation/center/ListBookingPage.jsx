import React, {useState} from "react";
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UpdateSampleIdPage from "./UpdateSampleIdPage";

function ListBookingForm(props) {

    const defaultBookingRecord = {
        id: null,
        firstName: "",
        lastName: "",
        idDocNo: "",
        mobile: "",
        email: "",
        address: "",
        selectedPlace: "",
        selectedDate: "",
        selectedTime: "",
        sampleId: "",
    };

    const {bookingRecords, next} = props;
    const [bookingRecord, setBookingRecord] = useState(defaultBookingRecord);
    const [selectionModel, setSelectionModel] = useState([]);
    const [shwUpdateForm, setShwUpdateForm] = useState(false);

    console.log(bookingRecords);

    const columns = [
        {field: "id", headerName: "ID", width:90},
        {field: "firstName", headerName: "First Name", width: 100, editable: false},
        {field: "lastName", headerName: "Last Name", width: 100, editable: false},
        {field: "idDocNo", headerName: "ID Document", width: 100, editable: false},
        {field: "mobile", headerName: "Mobile", width: 150, editable: false},
        {field: "selectedPlace", headerName: "Center", width: 150, editable: false},
        {field: "selectedDate", headerName: "Scheduled Date", width: 150, editable: false},
        {field: "selectedTime", headerName: "Scheduled Time", width: 150, editable: false},
        {field: "sampleId", headerName: "Sample ID", width:100, editable: false}
    ]

    return (
      <div>
        <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={bookingRecords}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                cdisableMultipleSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    const selectedRec = bookingRecords.find( record => record.id === newSelectionModel[0]);
                    if (selectedRec.sampleId === null || selectedRec.sampleId === "") {
                        setBookingRecord(selectedRec);
                        setSelectionModel(newSelectionModel);
                        setShwUpdateForm(true); 
                    } else {
                        setShwUpdateForm(false); 
                    }
                  }}
                selectionModel={selectionModel}
            />
        </Box>
        <UpdateSampleIdPage bookingRecord={bookingRecord} next={next} shwUpdateForm={shwUpdateForm} setShwUpdateForm={setShwUpdateForm} />
</div>
    )
}

export default ListBookingForm;