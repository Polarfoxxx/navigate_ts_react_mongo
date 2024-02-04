import { Type_Addrress } from "../../../../Container";
import { Type_forServices_addressForMarker } from "./types";

function services_addressForMarker(props: Type_forServices_addressForMarker): Type_Addrress | undefined {
    console.log(props.markerIdent);
    if (props.markerIdent === "start_points") {
        return (props.allLocation.startPoints.address);
    } else if (props.markerIdent === "end_points") {
        return (props.allLocation.endPoints.address);
    } else if (typeof props.markerIdent === "number") {
        const INTERMEDIATE_POINTS = props.allLocation.intermediatePoints;
        const RESULT_ROUTE = INTERMEDIATE_POINTS[props.markerIdent - 1];
        return (RESULT_ROUTE.address);
    }
    return undefined;
};

export default services_addressForMarker;