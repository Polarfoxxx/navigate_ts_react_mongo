import { Type_IntermediatePoints } from "../../../../Container";
import { TypeStartAndEndPoint } from "../../../../Container";

export type Type_UserSaveHistoryRouteObjekt = {
    startPoint: TypeStartAndEndPoint,
    endPoint: TypeStartAndEndPoint,
    addPoint: Type_IntermediatePoints,
    routeName: string,
    routeTime: number,
    routeDistance: number,
    createTime: string
};


