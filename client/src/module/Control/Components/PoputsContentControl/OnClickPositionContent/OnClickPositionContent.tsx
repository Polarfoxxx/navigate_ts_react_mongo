import React from "react";
import "./onClickPositionContent.style.css";
import { Container, DEFAULT_VALUE_ADDRESS } from "../../../../Container";
import { UseChangeContextDATA } from "../../../../hooks";
import { Type_forPositon_data } from "./types";
import { servicesFindAndDeletePositionToObjekt } from "../../../../utils";

function OnClickPositionContent(): JSX.Element {
    const { location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA();
    const { location_markerPopupt } = sideWays_DATA
    const [positon_data, setPosition_data] = React.useState<Type_forPositon_data>({
        ident: "",
        address: DEFAULT_VALUE_ADDRESS,
        coordinate: []
    })

    /* nastavenie novych dat pre hover lokal point */
    React.useEffect(() => {
        if (location_markerPopupt.location.lat && location_markerPopupt.location.lng) {
            const UPDATE_DATA = {
                ident: location_markerPopupt.data.ident,
                address: location_markerPopupt.data.address,
                coordinate: [location_markerPopupt.location.lat, location_markerPopupt.location.lng]
            };
            setPosition_data(UPDATE_DATA)
        }
    }, [location_markerPopupt.data.ident])


    /* odstranenie bodu */
    const handleRemovePoint = (e: React.MouseEvent<HTMLButtonElement>, ident: string) => {
        e.stopPropagation()
        const DELETE_POINT = ident;
        const { type, newData } = servicesFindAndDeletePositionToObjekt({ DELETE_POINT, location_DATA });
        if (type) {
            updateContext_DATA([
                { newData: newData, key: type },
                { newData: false, key: "popup_event" },
            ]);
        };
    };

    return (
        <div className="onclickPositionContent">
            <div className="onclickCoordinate">
                <div className="onClickCoordLagLog">
                    <div className="onClickCoordLagLogName">
                        <h3>Latitude:</h3>
                    </div>
                    <div className="onClickCoordLagLogValueBox">
                        {positon_data.coordinate[0]}
                    </div>
                </div>
                <div className="onClickCoordLagLog">
                    <div className="onClickCoordLagLogName">
                        <h3>Longitude:</h3>
                    </div>
                    <div className="onClickCoordLagLogValueBox">
                        {positon_data.coordinate[1]}
                    </div>
                </div>
            </div>
            <div className="onclickPosName">
                <h3>{positon_data.address.label}</h3>
            </div>
            <div className="onclickPosButton">
                <button onClick={(e) => handleRemovePoint(e, positon_data.ident)}>Remove point</button>
            </div>
        </div>
    );
};

export default OnClickPositionContent;