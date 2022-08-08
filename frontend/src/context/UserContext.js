import React, {useState} from "react";

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = (props) => {
    const [userState, setUserState] = useState({});
    //userState is in a format {success: boolean, token: string, userId: number, userInfo: {}}

    return (
        <UserContext.Provider value={[userState, setUserState]}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};