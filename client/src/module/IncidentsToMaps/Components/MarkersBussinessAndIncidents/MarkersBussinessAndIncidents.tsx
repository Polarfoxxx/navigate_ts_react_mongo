import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";


type Type_forMarkersBussinessAndIncidents<T> = {
    type: string;
    position: L.LatLngExpression,
    icon?: L.Icon<L.IconOptions>,
    data: T
};


function MarkersBussinessAndIncidents<T extends object>({ type, position, icon, data }: Type_forMarkersBussinessAndIncidents<T>): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });


    /* toto bude treba rodelit incident alebo bussines */
    const handleMarkerToggle = (stateONmouse: boolean) => {
        if (type === "incident") {
            if (stateONmouse) {
                updateContext_DATA([
                    { newData: { status: true, dataInc_ForPopup: data }, key: "incident" },
                    { newData: true, key: "popup_event" },
                ]);
            } else {
                updateContext_DATA([{ newData: false, key: "popup_event" }]);
            }
        } else if (type === "bussines") {
            if (stateONmouse) {
                const UPDATE_DATA = {
                    ...mapBussines_Category,
                    status: true,
                    dataMapBussines_froPopup: data
                };
                updateContext_DATA([
                    { newData: UPDATE_DATA, key: "mapBussines_Category" },
                    { newData: true, key: "popup_event" },
                ]);
            } else {
                updateContext_DATA([{ newData: false, key: "popup_event" }]);
            };
        };
    };

    return (
        <>
            {
                <Marker
                    icon={icon}
                    position={position}
                    eventHandlers={{
                        mouseover: () => handleMarkerToggle(true),
                        mouseout: () => handleMarkerToggle(false),
                    }}>
                </Marker>
            }
        </>
    );
};

export default MarkersBussinessAndIncidents;


