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
}

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
  icon: any,
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
  type: string,
  dataInc: Type_IncidentDATA_forMarker | null,
};

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
  route: Type_ArrayALLRoute[];
  onClick: boolean,
  changeRoutes: Type_forRouteChange
};

export type Type_sideWays_DATA = {
  clickOnMap: Type_OnClick_object;
  navi_Machine: boolean;
  incident: Type_incident,
  traffic: boolean,
  popupStatus: boolean;
  markerInTheRoute: L.LatLngExpression | null,
  trafficDATA: Type_forTraficDATA
};

export type Type_Provider_Context = {
  location_DATA: Type_location_DATA;
  setLocation_DATA: React.Dispatch<React.SetStateAction<Type_location_DATA>>;
  sideWays_DATA: Type_sideWays_DATA,
  setSideWays_DATA: React.Dispatch<React.SetStateAction<Type_sideWays_DATA>>;
};
