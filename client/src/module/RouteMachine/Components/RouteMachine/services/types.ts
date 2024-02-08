import { Type_location_DATA,TypeStartAndEndPoint } from "../../../../Container";

export type Type_forServices_addressForMarker = {
    allLocation: Type_location_DATA,
    markerIdent: string | number
};

export type Type_forIdentMarker_keyOf = {
    startPoints: TypeStartAndEndPoint;
    endPoints: TypeStartAndEndPoint;
};
