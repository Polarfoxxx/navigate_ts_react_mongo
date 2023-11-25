import React from "react";
import { Marker } from "react-leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { Type_forMarkersBussinessAndIncidents } from "./type";



function MarkersBussinessAndIncidents<T extends object>({ type, position, icon, data }: Type_forMarkersBussinessAndIncidents<T>): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    let timeout: NodeJS.Timeout | null = null;


    /* toto bude treba rodelit incident alebo bussines */
    const handleMarkerToggle = (stateONmouse: boolean) => {
        const clearAndSetTimeout = (callback: () => void) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(callback, 1000);
        };

        if (type === "incident" || type === "bussines") {
            if (stateONmouse) {
                clearAndSetTimeout(() => {
                    const newData = type === "incident"
                            ? { status: true, dataInc_ForPopup: data }
                            : {
                                ...mapBussines_Category,
                                status: true,
                                dataMapBussines_froPopup: data,
                            };

                    updateContext_DATA([
                        { newData, key: type === "incident" ? "incident" : "mapBussines_Category" },
                        { newData: true, key: "popup_event" },
                    ]);
                });
            } else {
                clearAndSetTimeout(() => {
                    const newData =
                        type === "incident"
                            ? { status: true, dataInc_ForPopup: null }
                            : { ...mapBussines_Category, status: true, dataMapBussines_froPopup: null };

                    updateContext_DATA([
                        { newData: false, key: "popup_event" },
                        { newData, key: type === "incident" ? "incident" : "mapBussines_Category" },
                    ]);
                });
            }
        }
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


