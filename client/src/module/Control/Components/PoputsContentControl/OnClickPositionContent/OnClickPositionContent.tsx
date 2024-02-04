import React from "react";
import { Container, DEFAULT_VALUE_ADDRESS } from "../../../../Container";
import { UseChangeContextDATA } from "../../../../hooks";
import { Type_forPositon_data } from "./types";

function OnClickPositionContent(): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const { location_markerPopupt } = sideWays_DATA;
    const [positon_data, setPosition_data] = React.useState<Type_forPositon_data>({
        ident: "",
        address: DEFAULT_VALUE_ADDRESS
    })

    /* nastavenie novych dat pre hover lokal point */
    React.useEffect(() => {
        const UPDATE_DATA = {
            ident: location_markerPopupt.data.ident,
            address: location_markerPopupt.data.address
        };
        setPosition_data(UPDATE_DATA)
    }, [location_markerPopupt.data.ident])

    /* odstranenie bodu */
    const handleRemovePoint = (ident: string) => {
        console.log(ident);
    };




    return (
        <div className="onclickPositionContent">
            <div className="onclickPosName">
                <h3>{positon_data.address.label}</h3>
            </div>
            <div className="onclickPosButton">
                <button onClick={() => handleRemovePoint(positon_data.ident)}>Remove point</button>
            </div>
        </div>
    );
};

export default OnClickPositionContent;