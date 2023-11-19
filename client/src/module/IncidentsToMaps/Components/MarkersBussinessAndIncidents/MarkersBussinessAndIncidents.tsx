import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";


type Type_forMarkersBussinessAndIncidents<T> = {
    KEY_REQUIRED: (keyof T)[],
    position: L.LatLngExpression,
    icon?: L.Icon<L.IconOptions>,
    data: T
};


function MarkersBussinessAndIncidents<T extends object>({KEY_REQUIRED, position, icon, data }: Type_forMarkersBussinessAndIncidents<T>): JSX.Element {

    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });

    let result = {} as T;
    for (const key of KEY_REQUIRED) {
      if (key in data) {
        result[key] = data[key];
      }
    }

console.log(result);



    /* zobrazovac markerov mauseover pre incidety */
/*     const handleMarkerToggle = (incident: T, state: boolean) => {
        if (state) {
            const UPDATE_DATA = {
                status: true,
                dataInc_ForPopup: {
                    id: incident.id,
                    type: incident.type,
                    location: L.latLng(incident.lat, incident.lng),
                    icon: L.icon({
                        iconUrl: incident.iconURL,
                        iconSize: [30, 30],
                        iconAnchor: [25, 25]
                    }),
                    startTime: incident.startTime,
                    endTime: incident.endTime,
                    shortDesc: incident.shortDesc,
                    fullDesc: incident.fullDesc,
                    distance: incident.distance,
                    severity: incident.severity,
                    impacting: incident.impacting,
                    iconURL: incident.iconURL,
                    lat: incident.lat,
                    lng: incident.lng
                }
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
    };
 */

    return (
        <>
            <Marker
                position={position}
              
                eventHandlers={{
                   /*  mouseover: () => handleMarkerToggle(data, true),
                    mouseout: () => handleMarkerToggle(data, false), */
                }}>
            </Marker>
        </>
    );
};

export default MarkersBussinessAndIncidents;