import { Type_location_DATA, Type_sideWays_DATA, TypeStartAndEndPoint } from "../../Container";


export type TypeFor_services_SetStart_End_Add_positionToObjekt = {
    location_DATA: Type_location_DATA,
    sideWays_DATA: Type_sideWays_DATA,
    GEO_DATA?: TypeStartAndEndPoint,
    input_ident?: number| string
};