import React, { useContext, useEffect, useCallback } from "react";
import LoginPage from "./LoginPage";
import CenterFunctionPage from "../center/CenterFunctionPage";
import BackOfficeFunctionPage from "../backoffice/BackOfficeFunctionPage";
import Header from "./Header";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

function CommonMainPage() {
  const [userContext, setUserContext] = useContext(UserContext);

  const logout = async () => {
    const res = await axios.get(process.env.REACT_APP_API_ENDPOINT+"auth/logout");
    console.log(res);
    setUserContext({});
  };

  const verifyLogin = useCallback( async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_ENDPOINT+"auth/verifyLogin");
      const data = res.data;
      if (res.status === 200 && data !== undefined && data !== null) 
        setUserContext( (prev) => {
          return {...prev, success: true, token: data.token, details: data.details}
        })
      else
        setUserContext({});
    } catch (err) {
        console.log(err);
        setUserContext({});
    }
  }, [setUserContext])

  useEffect(() => {
    verifyLogin();
  }, [verifyLogin])


  return userContext.token === null || userContext.token === undefined ? (
    <LoginPage />
  ) : (userContext.details.role === "admin"?
    (
    <div>
      <Header logout={logout} title="Exam Center Booking"/>
      <CenterFunctionPage />
    </div>
    ):(<div>
        <Header logout={logout} title="Sample Result Update"/>
        <BackOfficeFunctionPage />
      </div>)
  );
}

export default CommonMainPage;