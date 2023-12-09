import { LatLngExpression } from 'leaflet';


export type Type_ALLCoordinateObjekt = {
    address: string,
    latLng: number[],
};

export type Type_forControlCLContent = {
    coordinate?: LatLngExpression
};
export type Type_ButtonName = "Your position" | "End of your route" | "Add between a point";
