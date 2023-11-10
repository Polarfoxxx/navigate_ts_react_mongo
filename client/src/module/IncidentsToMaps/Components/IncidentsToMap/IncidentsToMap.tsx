import React from "react";
import "./incidentToMap.style.css";
import { traffic_Incidents_API } from "../../../API";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet"
import { Type_for_TraficIncidents, Type_IncidentDATA_forMarker } from "./types";
import services_highestCoordInhTeAreasOf from "./services/services_highestCoordInTheAreasOf";
import { UseChangeContextDATA } from "../../../hooks";
import services_dataManagForIncapi from "./services/services_dataManagForIncapi";
import { Container } from "../../../Container";


function IncidentsToMap() {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, incident } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [incidentDATA, setIncidentDATA] = React.useState<Type_IncidentDATA_forMarker[]>()


    React.useEffect(() => {
        fetchData();
    }, [incident.status]);


    async function fetchData() {
        if (incident.status) {
            const MINI_SECTION = services_highestCoordInhTeAreasOf(location_DATA);
            const ALL_INCIDENTS_WIN = services_dataManagForIncapi(mapsCurrentInfo.mapsRectangle);
            const SECTION = location_DATA.endPoints.address ? MINI_SECTION : ALL_INCIDENTS_WIN
            console.log(SECTION);

            try {
                const API_DATA = await traffic_Incidents_API<Type_for_TraficIncidents>(SECTION, 1000, 1000);
                const INCIDENT_LOCATION = API_DATA.map(incident => {
                    return {
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
                    };
                });

                setIncidentDATA(INCIDENT_LOCATION)
            } catch (error) {
                console.error(error);
            };
        };
    };

    /* zobrazovac markerov pre incidety */
    const handleMarkerToggle = async (incident: Type_IncidentDATA_forMarker, state: boolean) => {
        if (state) {
            const UPDATE_DATA = {
                status: true,
                dataInc: {
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
                { newData: true, key: "popupStatus" },
            ]);
        } else {
            updateContext_DATA([
                { newData: false, key: "popupStatus" },
            ]);
        };
    };

    return (
        <>
            {
               incident.status && incidentDATA && incidentDATA.map((incident: Type_IncidentDATA_forMarker, key: number) =>
                    <Marker
                        position={incident.location}
                        icon={incident.icon}
                        key={key}
                        eventHandlers={{
                            mouseover: () => handleMarkerToggle(incident, true),
                            mouseout: () => handleMarkerToggle(incident, false),
                        }}>
                    </Marker>
                )
            };

        </>


    )
};

export default IncidentsToMap