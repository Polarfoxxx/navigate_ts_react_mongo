import React from "react";
import "./incidentToMap.style.css";
import { traffic_Incidents_API } from "../../../API";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet"
import { Type_for_TraficIncidents, Type_IncidentDATA_forMarker } from "./types";
import services_highestCoordInhTeAreasOf from "./services/services_highestCoordInTheAreasOf";
import { UseChangeContextDATA } from "../../../hooks";
import { services_rectagleCoord_WinMap } from "../";
import { Container } from "../../../Container";
import MarkersBussinessAndIncidents from "../MarkersBussinessAndIncidents/MarkersBussinessAndIncidents";


function IncidentsToMap() {
    const { location_DATA, sideWays_DATA,  } = React.useContext(Container.Context);
    const { mapsCurrentInfo, incident } = sideWays_DATA;
    const [incidentDATA, setIncidentDATA] = React.useState<Type_IncidentDATA_forMarker[]>()
  

    React.useEffect(() => {
        if (incident.status && mapsCurrentInfo.zoom > 13) {
            fetchData();
        }
    }, [incident.status, mapsCurrentInfo.center]);


    async function fetchData() {
        /* rozdelovac ak sa jedna o inceidety na trase alebo incidenty v celom okne */
        const MINI_SECTION = services_highestCoordInhTeAreasOf(location_DATA);
        const ALL_INCIDENTS_WIN = services_rectagleCoord_WinMap(mapsCurrentInfo.mapsRectangle);
        const SECTION = location_DATA.endPoints.address ? MINI_SECTION : ALL_INCIDENTS_WIN

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

    return (
        <>
            {
                incident.status && incidentDATA && incidentDATA.map((incidents: Type_IncidentDATA_forMarker, key: number) =>
                    <MarkersBussinessAndIncidents
                        position={incidents.location}
                        icon={incidents.icon}
                        incidents={incidents}
                        key={key}
                    />
                )
            };

        </>


    )
};

export default IncidentsToMap