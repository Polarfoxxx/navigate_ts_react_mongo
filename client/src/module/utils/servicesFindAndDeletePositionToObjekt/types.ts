import { Type_location_DATA } from "../../Container";

export type Type_for_servicesFindAndDeletePositionToObjekt = {
    DELETE_POINT: string,
    location_DATA: Type_location_DATA
};

export type Type_retutned_servicesFindAndDeletePositionToObjekt = {
    type: string,
    newData: string | Type_location_DATA
}
