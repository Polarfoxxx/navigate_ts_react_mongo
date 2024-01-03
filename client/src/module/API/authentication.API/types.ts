import { Type_saveRoute } from "../../LocationUserInfo";

export type Type_forLogin_respo_objekt = {
    status: number,
    JWT_token: string,
    user_name: string,
    message: string
};

export type Type_forRespo_objekt = {
    status: number,
    message: ""
};
export type Type_forRespoLoad_objekt = {
    status: number,
    message: string,
    data: Type_saveRoute[],
};



export type Type_forSaveDATA_API = {
    DATA_ROUTE: Type_saveRoute,
    USER_NAME: string,
    USER_JWT_TOKEN: string,
};

export type Type_forLoadDATA_API = {
    USER_NAME: string
    USER_JWT_TOKEN:string

}
