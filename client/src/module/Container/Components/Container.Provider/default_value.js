

const default_address = {
    label:"",
    country: "",
    country_code: "",
    county: "",
    postcode: "",
    region: "",
    state: "",
    town: ""
};

/* ----------------------------------------------------------- */
export const defaultValue_address_for_Provider_Context = {
    startPoints: {
        address: default_address,
        latLng: [],
    },
    endPoints: {
        address:default_address,
        latLng: [],
    },
    arrayALL_coordinate: [],
    main_atl_route: [],

    /* nepouiva sa */
    changeRoutes: {
        routeIndex: 0,
        onEvent: ""
    }
};

export const defaultValue_sideways_for_Provider_Context = {
    clickOnMap: {
        address: default_address,
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
        dataInc_ForPopup: null
    },
    mapBussines_Category: {
        typeSearch: "",
        type: "",
        status: false,
        SIC_Data: null,
        dataMapBussines_froPopup: null,
        allResultDATA: null,
        select_Route_Bussines: {
            select: null,
            typeMAPorList: ""
        }
    }
};
/* ----------------------------------------------------------- */



