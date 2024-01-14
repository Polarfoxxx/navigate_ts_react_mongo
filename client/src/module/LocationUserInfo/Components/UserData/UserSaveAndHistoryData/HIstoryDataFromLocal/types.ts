import { Type_UserSaveHistoryRouteObjekt } from "../types";
import {
  TypeStartAndEndPoint,
  Type_ArrayAllCoord,
} from "../../../../../Container";
import React from "react";

export type Type_UserHistoryDataItem = {
  item: Type_UserSaveHistoryRouteObjekt;
  keyItem: number;
  selectItem?: number;
};

export type Type_UserSaveDataItem = {
  item: Type_saveRoute;
  keyItem: number;
  setDeleteNameRoute: React.Dispatch<React.SetStateAction<string>>
  setSelectRoute: React.Dispatch<React.SetStateAction<number | undefined>>

  
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
