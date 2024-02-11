import React from "react";
import { useNavigate } from "react-router-dom";
import { servicesJWTdecodeAndValidity } from "../../../utils";
import {
    Props_Provider,
    Type_Provider_Context,
    Type_location_DATA,
    Type_sideWays_DATA,
} from "./types";

import {
    DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT,
    DEFAULT_VALUE_SIDEWAYS_FOR_PROVIDER_CONTEXT,
} from "./defaultValue/primary_default_value";


const Context = React.createContext<Type_Provider_Context>({
    location_DATA: DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT,
    setLocation_DATA: () => { },
    sideWays_DATA: DEFAULT_VALUE_SIDEWAYS_FOR_PROVIDER_CONTEXT,
    setSideWays_DATA: () => { },
   
});


function Provider({ children }: Props_Provider): JSX.Element {
    const [location_DATA, setLocation_DATA] = React.useState<Type_location_DATA>(DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT);
    const [sideWays_DATA, setSideWays_DATA] = React.useState<Type_sideWays_DATA>(DEFAULT_VALUE_SIDEWAYS_FOR_PROVIDER_CONTEXT);
    const NAVIGATE = useNavigate();

    React.useEffect(() => {
        const JWT_FROM_STORAGE = localStorage.getItem('JWT_token');
        if (JWT_FROM_STORAGE === null) {
            NAVIGATE("/LoginPage");
        } else {
            !servicesJWTdecodeAndValidity(JWT_FROM_STORAGE) && NAVIGATE("/LoginPage")
        };
    },[JSON.stringify([location_DATA,sideWays_DATA])]);


    return (
        <Context.Provider value={{ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA }}>
            {children}
        </Context.Provider>
    )
}
const Container = {
    Provider,
    Context
}

export default Container