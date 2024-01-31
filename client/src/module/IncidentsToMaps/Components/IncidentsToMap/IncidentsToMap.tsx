import React from "react";
import "./incidentToMap.style.css";
import { traffic_Incidents_API } from "../../../API";
import L from "leaflet"
import { Type_IncidentDATA_forMarker } from "../../../Container";
import services_highestCoordInhTeAreasOf from "./services/services_highestCoordInTheAreasOf";
import { services_rectagleCoord_WinMap } from "../";
import { Container } from "../../../Container";
import MarkersBussinessAndIncidents from "../MarkersBussinessAndIncidents/MarkersBussinessAndIncidents";


function IncidentsToMap() {
    const { location_DATA, sideWays_DATA, } = React.useContext(Container.Context);
    const { mapBussines_Category, mapsCurrentInfo, incident } = sideWays_DATA;
    const [incidentDATA, setIncidentDATA] = React.useState<Type_IncidentDATA_forMarker[]>()

    React.useEffect(() => {
        if (incident.status && mapsCurrentInfo.zoom > 13) {
            fetchData();
        }
    }, [incident.status, mapsCurrentInfo.center]);


    async function fetchData() {
        /* rozdelovac ak sa jedna o inceidety na trase alebo incidenty v celom okne */
       //  const MINI_SECTION = services_highestCoordInhTeAreasOf(location_DATA);
        const ALL_INCIDENTS_WIN = services_rectagleCoord_WinMap(mapsCurrentInfo.mapsRectangle);
        const SECTION = /* location_DATA.endPoints.address.label ? MINI_SECTION : */ ALL_INCIDENTS_WIN    /* funkcia rozdelenia trasy nieje stabilna pri velkej vzdialenosti */

        try {
            const DATA_API: Type_IncidentDATA_forMarker[] = await traffic_Incidents_API(SECTION, 1000, 1000);
            setIncidentDATA(DATA_API)

        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            {
                incident.status && incidentDATA && incidentDATA.map((incidents: Type_IncidentDATA_forMarker, key: number) =>
                    <MarkersBussinessAndIncidents
                        type="incident"
                        position={[incidents.lat, incidents.lng]}
                        icon={L.icon({
                            iconUrl: incidents.iconURL,
                            iconSize: [45, 45],
                            iconAnchor: [25, 25]
                        })}
                        data={incidents}
                        key={key}
                    />
                )
            }

        </>


    )
};

export default IncidentsToMap;

