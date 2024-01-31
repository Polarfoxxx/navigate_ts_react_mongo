import React from "react";
import { Marker } from "react-leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { Type_forMarkersBussinessAndIncidents } from "./type";



function MarkersBussinessAndIncidents<T extends object>({ type, position, icon, data }: Type_forMarkersBussinessAndIncidents<T>): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category, incident } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const timeoutReff = React.useRef<NodeJS.Timeout | null>(null);


    // funkcia ktora sa spusti po mouseover nasledne odosle do data cez context
    // pre popup component aby sa zobrazil 
    const handleMarkerToggle = (stateONmouse: boolean) => {
        const clearAndSetTimeout = (callback: () => void) => {
            if (timeoutReff.current) {
                clearTimeout(timeoutReff.current);
            }
            timeoutReff.current = setTimeout(callback, 700); // Změna na 5000 ms (5 sekund)
        };
        if (type === "incident" || type === "bussines") {
            if (stateONmouse) {
                clearAndSetTimeout(() => {
                    let update_data = type === "incident"
                            ? {
                                status: true,
                                dataInc_ForPopup: data,
                                popupStatus: true
                            } : {
                                ...mapBussines_Category,
                                status: true,
                                dataMapBussines_froPopup: data,
                            };

                    updateContext_DATA([
                        { newData: update_data, key: type === "incident" ? "incident" : "mapBussines_Category" },
                        { newData: true, key: "popup_event" },
                    ]);
                });
            } else {
                if (timeoutReff.current) {
                    clearTimeout(timeoutReff.current);
                };
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


