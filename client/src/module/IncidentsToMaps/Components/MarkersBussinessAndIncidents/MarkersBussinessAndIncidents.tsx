import React from "react";
import { Marker } from "react-leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { Type_forMarkersBussinessAndIncidents } from "./type";



function MarkersBussinessAndIncidents<T extends object>({
    type, position, icon, data
}: Type_forMarkersBussinessAndIncidents<T>): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category, incident } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA();
    const timeoutReff = React.useRef<NodeJS.Timeout | null>(null);

    // funkcia ktora sa spusti po mouseover nasledne odosle do data cez context
    // pre popup component aby sa zobrazil 
    const handleMarkerToggle = (stateONmouse: boolean) => {
        if (timeoutReff.current) {
            clearTimeout(timeoutReff.current);
        }

        timeoutReff.current = setTimeout(() => {
            if (type === "incident" || type === "bussines") {
                if (stateONmouse) {
                    const UPDATE_DATA = type === "incident"
                        ? {
                            ...incident,
                            popupStatus: true,
                            dataInc_ForPopup: data,
                        }
                        : {
                            ...mapBussines_Category,
                            popupStatus: true,
                            dataMapBussines_froPopup: data,
                        };
                    updateContext_DATA([
                        { newData: UPDATE_DATA, key: type === "incident" ? "incident" : "mapBussines_Category" },
                        { newData: true, key: "popup_event" },
                    ]);
                }
            }
        }, 1000);
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


