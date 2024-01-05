import { default_address } from "../../../../../Container";

export const DEFAULT_VALUE_HISTORY_DATA_ITEM = {
    startPoint: {
        address: default_address,
        latLng: [],
    },
    endPoint:  {
        address: default_address,
        latLng: [],
    },
    addPoint: [],
    routeName: "",
    routeTime: 0,
    routeDistance: 0,
    createTime: ""
};
