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
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });







    /* toto bude treba rodelit incident alebo bussines */
    const handleMarkerToggle = (state: boolean) => {
    if (type === "incident") {
        /* zobrazovac markerov mauseover pre incidety */
            if (state) {
                const UPDATE_DATA = {
                    status: true,
                    dataInc_ForPopup: data
                };

                updateContext_DATA([
                    { newData: UPDATE_DATA, key: "incident" },
                    { newData: true, key: "popup_clickToMap_status" },
                ]);
            } else {
                updateContext_DATA([
                    { newData: false, key: "popup_clickToMap_status" },
                ]);
            };
        } else if(type === "bussines") {
            
        }
    }

    return (
        <>
            <Marker
                icon={icon}
                position={position}
                eventHandlers={{
                    mouseover: () => handleMarkerToggle(true),
                    mouseout: () => handleMarkerToggle(false),
                }}>
            </Marker>
        </>
    );
};

export default MarkersBussinessAndIncidents;


