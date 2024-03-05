import { Type_Addrress } from "../../../../Container";
import { Type_forServices_addressForMarker, Type_forIdentMarker_keyOf } from "./types";

function services_addressForMarker(props: Type_forServices_addressForMarker): Type_Addrress | undefined {

    if (typeof props.markerIdent === "string") {
        const IDENT_MARKER = props.markerIdent as keyof Type_forIdentMarker_keyOf;
        return props.allLocation[IDENT_MARKER].address;
    } else {
        const INTERMEDIATE_POINTS = props.allLocation.intermediatePoints;
        const RESULT_ROUTE = INTERMEDIATE_POINTS[props.markerIdent - 1];
        return (RESULT_ROUTE.address);
    }
};

export default services_addressForMarker;