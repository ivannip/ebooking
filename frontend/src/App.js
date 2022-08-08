import "./styles.css";
import { useState } from "react";
import CommonMainPage from "./components/operation/common/CommonMainPage";
import PublicMainPage from "./components/public/PublicMainPage";
//import { Box, Tab } from "@material-ui/core";
import {Box, Tab} from "@mui/material";
//import { TabContext, TabPanel, TabList } from "@material-ui/lab";
import { TabContext, TabPanel, TabList } from "@mui/lab";

export default function App() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Public User for Exam Slot Reservation" value="2" />
            <Tab label="Operation User for Handling Exam" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1"><CommonMainPage /></TabPanel>
        <TabPanel value="2"><PublicMainPage /></TabPanel>
        
      </TabContext>
    </Box>
  );

}
