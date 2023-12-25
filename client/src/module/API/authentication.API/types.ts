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
    USER_JWT_TOKEN: string
    DATA: string,
};