import React from "react";
import { useNavigate } from "react-router-dom";
import { servicesJWTdecodeAndValidity } from "../../../utils";
import {
    Props_Provider,
    Type_Provider_Context,
    Type_location_DATA,
    Type_sideWays_DATA,
    Type_userDATA
} from "./types";

import {
    defaultValue_address_for_Provider_Context,
    defaultValue_sideways_for_Provider_Context,
    default_UserDATA_for_Provider_Context
} from "./default_value";


const Context = React.createContext<Type_Provider_Context>({
    location_DATA: defaultValue_address_for_Provider_Context,
    setLocation_DATA: () => { },
    sideWays_DATA: defaultValue_sideways_for_Provider_Context,
    setSideWays_DATA: () => { },
    user_DATA: default_UserDATA_for_Provider_Context,
    setUser_DATA: () => { },
});


function Provider({ children }: Props_Provider): JSX.Element {
    const [location_DATA, setLocation_DATA] = React.useState<Type_location_DATA>(defaultValue_address_for_Provider_Context);
    const [sideWays_DATA, setSideWays_DATA] = React.useState<Type_sideWays_DATA>(defaultValue_sideways_for_Provider_Context);
    const [user_DATA, setUser_DATA] = React.useState<Type_userDATA>(default_UserDATA_for_Provider_Context);
    const NAVIGATE = useNavigate();

    React.useEffect(() => {
        const JWT_FROM_STORAGE =  localStorage.getItem('JWT_token');
        if(JWT_FROM_STORAGE === null) {
            NAVIGATE("/LoginPage");
        }else {
            !servicesJWTdecodeAndValidity(JWT_FROM_STORAGE) && NAVIGATE("/LoginPage")
        };
    });
    

    return (
        <Context.Provider value={{ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA, user_DATA, setUser_DATA }}>
            {children}
        </Context.Provider>
    )
}
const Container = {
    Provider,
    Context
}

export default Container