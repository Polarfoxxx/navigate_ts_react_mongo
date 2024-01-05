import { Type_UserSaveHistoryRouteObjekt } from "../types";
import {
  TypeStartAndEndPoint,
  Type_ArrayAllCoord,
} from "../../../../../Container";

export type Type_UserHistoryDataItem = {
  item: Type_UserSaveHistoryRouteObjekt;
  keyItem: number;
  selectItem?: number;
};

export type Type_UserSaveDataItem = {
  item: Type_saveRoute;
  keyItem: number;
  selectItem?: number;
};

export type Type_saveRoute = {
  startCoord: TypeStartAndEndPoint;
  endCoord: TypeStartAndEndPoint;
  allCoord: Type_ArrayAllCoord;
  routeName: string;
  timeCreate: string;
  officialName: string;
  timeRoute: number;
  distanceRoute: number;
};

export type TypeforSAVE_API = {
  DATA_FOR_SAVEAPI: Type_saveRoute;
};
