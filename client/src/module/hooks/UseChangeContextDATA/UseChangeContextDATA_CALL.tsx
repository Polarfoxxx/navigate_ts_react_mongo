import { Container } from "../../Container";
import React from "react";
import UseChangeContextDATA from "./UseChangeContextDATA";
import { Type_updateContext_DATA } from "./types";

function UseChangeContextDATA_CALL():  (data: Type_updateContext_DATA[]) => void {
    const { location_DATA, sideWays_DATA, setLocation_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });

    return updateContext_DATA;
};

export default UseChangeContextDATA_CALL