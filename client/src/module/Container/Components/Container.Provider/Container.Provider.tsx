import React from "react";
import { Props_Provider, Type_Provider_Context, Type_location_DATA, Type_sideWays_DATA } from "./types";
import { defaultValue_address_for_Provider_Context, defaultValue_sideways_for_Provider_Context } from "./default_value";


const Context = React.createContext<Type_Provider_Context>({
    location_DATA: defaultValue_address_for_Provider_Context,
    setLocation_DATA: () => { },
    sideWays_DATA: defaultValue_sideways_for_Provider_Context,
    setSideWays_DATA: () => { }
});


function Provider({ children }: Props_Provider): JSX.Element {
    const [location_DATA, setLocation_DATA] = React.useState<Type_location_DATA>(defaultValue_address_for_Provider_Context);
    const [sideWays_DATA, setSideWays_DATA] = React.useState<Type_sideWays_DATA>(defaultValue_sideways_for_Provider_Context);


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