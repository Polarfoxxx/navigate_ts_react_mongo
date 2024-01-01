import { Type_ArrayAllCoord } from "../../../../Container";
import { TypeStartAndEndPoint } from "../../../../Container";

export type Type_UserSaveHistoryRouteObjekt = {
    startPoint: TypeStartAndEndPoint,
    endPoint: TypeStartAndEndPoint,
    addPoint: Type_ArrayAllCoord,
    routeName: string,
    routeTime: number,
    routeDistance: number,
    createTime: string
};


