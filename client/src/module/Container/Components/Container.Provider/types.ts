import React from "react";
import { LatLngExpression } from "leaflet";

export type Props_Provider = {
  children: JSX.Element | JSX.Element[];
};

export type Type_ALLCoordinateObjekt = {
  identObject?: string | number,
  address: string;
  latLng: number[];
};

export type Type_forRouteChange = {
  routeIndex: number,
  onEvent: string
};

export type TypeStartAndEndPoint = {
  address: string;
  latLng: number[];
};

export type Type_forTraficDATA = {
  zoom: number,
  center: LatLngExpression | null,
  sizeMap: number[],
  mapsRectangle: number[]
};



export type Type_LatLng = {
  lat: number;
  lng: number;
};

export type Type_ArrayAllCoord = Type_ALLCoordinateObjekt[];

export type Type_OnClick_object = {
  address: string;
  latLng: number[] | null;
};

export type Type_IncidentDATA_forMarker = {
  id: string,
  type: number,
  location: LatLngExpression | null,
  icon: L.Icon<L.IconOptions> | null,
  startTime: string,
  endTime: string,
  shortDesc: string,
  fullDesc: string,
  distance: number,
  severity: number,
  impacting: boolean,
  iconURL: string,
  lat: number,
  lng: number
};

export type Type_incident = {
  status: boolean,
  dataInc_ForPopup: Type_IncidentDATA_forMarker | null,
};

/* =========================================================== */
export type Type_MapBussines_Category = {
  typeSearch: string,
  status: boolean,
  POI_Data: null | Type_OnePointBussinesControl & Type_RouteBussinesControl,
};

export type Type_OnePointBussinesControl= {
  type: string,
  area: string,
  numResult: string,
  ambiguities: "Ignore" | "Allow"
};

export type Type_RouteBussinesControl= {
  type: string,
  width: string,
  bufferedWidth: string,
  numResult: string,
  ambiguities: "Ignore" | "Allow"
};
/* =========================================================== */


export type Type_For_Direction = {
  direction: string;
  distance: number;
  exit?: string | undefined;
  index: number;
  mode: string;
  modifier: string;
  road: string;
  text: string;
  time: number;
  type: string;
};

export type Type_ArrayALLRoute = {
  nameRoutes: string;
  totalDistance: number;
  totalTime: number;
  coordinates: Type_LatLng[];
  instructions: Type_For_Direction[];
};

export type Type_location_DATA = {
  startPoints: TypeStartAndEndPoint;
  endPoints: TypeStartAndEndPoint;
  arrayALL_coordinate: Type_ArrayAllCoord;
  main_atl_route: Type_ArrayALLRoute[];
  changeRoutes: Type_forRouteChange
};

export type Type_sideWays_DATA = {
  clickOnMap: Type_OnClick_object;
  navi_Machine: boolean;
  traffic: boolean,
  popup_clickToMap_status: boolean;
  markerInTheRoute: L.LatLngExpression | null,
  mapsCurrentInfo: Type_forTraficDATA,
  incident: Type_incident,
  mapBussines_Category: Type_MapBussines_Category
};

export type Type_Provider_Context = {
  location_DATA: Type_location_DATA;
  setLocation_DATA: React.Dispatch<React.SetStateAction<Type_location_DATA>>;
  sideWays_DATA: Type_sideWays_DATA,
  setSideWays_DATA: React.Dispatch<React.SetStateAction<Type_sideWays_DATA>>;
};
