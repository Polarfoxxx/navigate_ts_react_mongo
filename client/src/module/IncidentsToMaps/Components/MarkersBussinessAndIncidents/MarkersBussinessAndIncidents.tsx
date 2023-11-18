import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { Type_IncidentDATA_forMarker } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";


type Type_forMarkersBussinessAndIncidents = {
    position: L.LatLngExpression,
    icon?: L.Icon<L.IconOptions>,
    incidents: Type_IncidentDATA_forMarker

};


function MarkersBussinessAndIncidents({ position, icon, incidents }: Type_forMarkersBussinessAndIncidents): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });

    /* zobrazovac markerov mauseover pre incidety */
    const handleMarkerToggle = async (incident: Type_IncidentDATA_forMarker, state: boolean) => {
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


    return (
        <>
            <Marker
                position={position}
                icon={icon}
                eventHandlers={{
                    mouseover: () => handleMarkerToggle(incidents, true),
                    mouseout: () => handleMarkerToggle(incidents, false),
                }}>
            </Marker>
        </>
    );
};

export default MarkersBussinessAndIncidents;