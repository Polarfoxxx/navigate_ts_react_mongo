import {
    TypeStartAndEndPoint,
    Type_forRouteChange,
    Type_OnClick_object,
    Type_forTraficDATA,
    Type_incident,
    Type_MapBussines_Category,
    Type_forLocation_markerPopupt
} from "../../Container";


export type Type_updateContext_DATA = {
    newData: any,
    key: string
}

export type Type_ForUseChangeContextDATA_returning = {
    updateContext_DATA: (data: Type_updateContext_DATA[]) => void,
};

export type Type_for_KEY_MAP =
    TypeStartAndEndPoint |
    Type_forRouteChange |
    [] |
    Type_OnClick_object |
    boolean |
    L.LatLngExpression |
    null |
    Type_forTraficDATA |
    Type_incident |
    Type_MapBussines_Category |
    Type_forLocation_markerPopupt
