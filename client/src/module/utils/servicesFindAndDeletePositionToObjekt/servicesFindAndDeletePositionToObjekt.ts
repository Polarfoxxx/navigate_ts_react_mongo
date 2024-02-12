import {
    DEFAULT_VALUE_POSITION,
    DEFAULT_VALUE_CHANGE_ROUTE, DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT,
} from "../../Container";
import {
    Type_for_servicesFindAndDeletePositionToObjekt,
    Type_retutned_servicesFindAndDeletePositionToObjekt
} from "./types";


function servicesFindAndDeletePositionToObjekt(
    props: Type_for_servicesFindAndDeletePositionToObjekt
): Type_retutned_servicesFindAndDeletePositionToObjekt {

    if (props.DELETE_POINT === "startPoints") {
        return {
            type: "location_DATA",
            newData: DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT
        }
    } else if (props.DELETE_POINT === "endPoints") {
        return {
            type: "location_DATA",
            newData: {
                ...props.location_DATA,
                endPoints: DEFAULT_VALUE_POSITION,
                intermediatePoints: [],
                main_atl_route: [],
                changeRoutes: DEFAULT_VALUE_CHANGE_ROUTE
            },
        };
    } else if (typeof props.DELETE_POINT === "number") {
        let update_intermediateArr = props.location_DATA.intermediatePoints;
        update_intermediateArr.splice(props.DELETE_POINT - 1, 1);
        return {
            type: "location_DATA",
            newData: {
                ...props.location_DATA,
                intermediatePoints: update_intermediateArr,
            },
        };
    }
    return {
        type: "",
        newData: ""
    }
};

export default servicesFindAndDeletePositionToObjekt;