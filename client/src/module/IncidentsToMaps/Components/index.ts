
export { default as IncidentsToMap } from "./IncidentsToMap/IncidentsToMap";
export { default as MapTraffic } from "./MapTraffic/MapTraffic";

/* services */
export {default as services_dataManagForIncapi} from "./IncidentsToMap/services/services_dataManagForIncapi";
export {default as services_highestCoordInTheAreasOf} from "./IncidentsToMap/services/services_highestCoordInTheAreasOf";
export {default as services_zoomLevel} from "./MapTraffic/services/services_zoomLevel";


/* type */
export type {
    Type_IncidentDATA_forMarker,
    Type_for_TraficIncidents,
    Type_CoordAllRoads_LatLng,
    Type_MostedCoordinate_Arr
} from "./IncidentsToMap/types";

