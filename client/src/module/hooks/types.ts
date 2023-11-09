import { Type_location_DATA, Type_sideWays_DATA } from "../Container";


export type Type_updateContext_DATA = {
    newData: any,
    key: string
}

export type Type_ForUseChangeContextDATA_returning = {
    updateContext_DATA: (data: Type_updateContext_DATA[]) => void,
};

export type Type_ForUseChangeContextDATA = {
    location_DATA?: Type_location_DATA,
    setLocation_DATA?: React.Dispatch<React.SetStateAction<Type_location_DATA>>,
    sideWays_DATA?: Type_sideWays_DATA,
    setSideWays_DATA?: React.Dispatch<React.SetStateAction<Type_sideWays_DATA>>
};