import {
    DEFAULT_VALUE_MAP_BUSSINES,
    DEFAULT_VALUE_MAP_CURRENT_INFO,
    DEFAULT_VALUE_MAP_INCIDENT,
    DEFAULT_VALUE_LOCATION_MARKER_POPUP,
    DEFAULT_VALUE_POSITION
} from "./secondary_default_value";


/* ----------------------------------------------------------- */
export const DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT = {
    startPoints: DEFAULT_VALUE_POSITION,
    endPoints: DEFAULT_VALUE_POSITION,
    intermediatePoints: [],
    main_atl_route: [],
    changeRoutes: {
        routeIndex: 0,
        onEvent: ""
    }
};

export const DEFAULT_VALUE_SIDEWAYS_FOR_PROVIDER_CONTEXT = {
    clickOnMap: DEFAULT_VALUE_POSITION,
    traffic: false,
    popup_event: false,
    markerInTheRoute: null,
    mapsCurrentInfo: DEFAULT_VALUE_MAP_CURRENT_INFO,
    incident: DEFAULT_VALUE_MAP_INCIDENT,
    mapBussines_Category: DEFAULT_VALUE_MAP_BUSSINES,
    location_markerPopupt: DEFAULT_VALUE_LOCATION_MARKER_POPUP
};



