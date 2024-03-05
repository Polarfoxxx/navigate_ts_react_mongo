
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

export const DEFAULT_VALUE_POSITION = {
    address: DEFAULT_VALUE_ADDRESS,
    latLng: [],
}

export const DEFAULT_VALUE_MAP_BUSSINES = {
    typeSearch: "",
    type: "",
    status: false,
    popupStatus: false,
    SIC_Data: null,
    dataMapBussines_froPopup: null,
    allResultDATA: null,
    select_Route_Bussines: {
        select: null,
        typeMAPorList: ""
    }
};

export const DEFAULT_VALUE_MAP_CURRENT_INFO = {
    zoom: 0,
    center: null,
    sizeMap: [],
    mapsRectangle: []
};

export const DEFAULT_VALUE_MAP_INCIDENT = {
    status: false,
    popupStatus: false,
    dataInc_ForPopup: null
};

export const DEFAULT_VALUE_LOCATION_MARKER_POPUP = {
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

export const DEFAULT_VALUE_CHANGE_ROUTE = {
    routeIndex: 0,
    onEvent: ""
}