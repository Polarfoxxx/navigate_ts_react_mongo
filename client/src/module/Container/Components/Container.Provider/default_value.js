


export const DEFAULT_VALUE_ADDRESS = {
    label: "",
    country: "",
    country_code: "",
    county: "",
    postcode: "",
    region: "",
    state: "",
    town: ""
};

/* ----------------------------------------------------------- */
export const DEFAULT_VALUE_ADDRESS_FOR_PROVIDER_CONTEXT = {
    startPoints: {
        address: DEFAULT_VALUE_ADDRESS,
        latLng: [],
    },
    endPoints: {
        address: DEFAULT_VALUE_ADDRESS,
        latLng: [],
    },
    intermediatePoints: [],
    main_atl_route: [],

    /* nepouiva sa */
    changeRoutes: {
        routeIndex: 0,
        onEvent: ""
    }
};

export const DEFAULT_VALUE_SIDEWAYS_FOR_PROVIDER_CONTEXT = {
    clickOnMap: {
        address: DEFAULT_VALUE_ADDRESS,
        latLng: undefined,
    },
    navi_Machine: false,/* nepoziva sa */

    traffic: false,
    popup_event: false,
    markerInTheRoute: null,
    mapsCurrentInfo: {
        zoom: 0,
        center: null,
        sizeMap: [],
        mapsRectangle: []
    },
    incident: {
        status: false,
        popupStatus: false,
        dataInc_ForPopup: null
    },
    mapBussines_Category: {
        typeSearch: "",
        type: "",
        popupStatus: false,
        SIC_Data: null,
        dataMapBussines_froPopup: null,
        allResultDATA: null,
        select_Route_Bussines: {
            select: null,
            typeMAPorList: ""
        }
    },
    location_markerPopupt: {
        popupStatus: false,
        data: {
            ident: "",
            address: DEFAULT_VALUE_ADDRESS
        },
        location: {
            lat: null,
            lng: null
        }
    }
};
export const DEFAULT_USERDATA_FOR_PROVIDER_CONTEXT = {
    loginName: ""
};
/* ----------------------------------------------------------- */



