import { TypeStartAndEndPoint, Type_ArrayAllCoord } from "../../Container";


export type Type_forLogin_respo_objekt = {
    status: number,
    JWT_token: string,
    user_name: string,
    message: string
};

export type Type_forRegister_respo_objekt = {
    status: number,
    message: ""
};

export type Type_forSaveDATA_API = {
    USER_NAME: string,
    USER_JWT_TOKEN: string,
    ROUTE_NAME: string,
    START_COORD: TypeStartAndEndPoint, 
     END_COORD: TypeStartAndEndPoint,
     ALL_COORD: Type_ArrayAllCoord
};