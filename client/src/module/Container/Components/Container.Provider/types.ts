import React from "react";
import { LatLngExpression } from "leaflet";


/* =========================================================== */
/* =========================================================== */
export type Props_Provider = {
  children: JSX.Element | JSX.Element[];
};
/* =========================================================== */
/* =========================================================== */
export type Type_IncidentDATA_forMarker = {
  id: string,
  type: number,
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
  popupStatus: boolean,
  dataInc_ForPopup: Type_IncidentDATA_forMarker | null,
};
/* =========================================================== */
/* =========================================================== */
export type Type_MapBussines_Category = {
  typeSearch: string,
  status: boolean,
  popupStatus: boolean,
  SIC_Data: null | Type_OnePointBussinesControl & Type_RouteBussinesControl,
  dataMapBussines_froPopup: null | Type_SearchRespo_EDITED_DATA,
  allResultDATA: null | Type_SearchRespo_EDITED_DATA[],
  select_Route_Bussines: TypeSelect_Route_Bussines
};

export type TypeSelect_Route_Bussines = {
  select: number | null,
  typeMAPorList: string
}

export type Type_OnePointBussinesControl = {
  type: string,
  area: string,
  numResult: string,
  ambiguities: "Ignore" | "Allow"
};

export type Type_RouteBussinesControl = {
  type: string,
  width: string,
  bufferedWidth: string,
  numResult: string,
  ambiguities: "Ignore" | "Allow"
};

/* typ upraveny z RAW odpovade */
export type Type_SearchRespo_EDITED_DATA = {
  distance: number;
  name: string;
  resultNumber: number;
  fields: {
    mqap_id: string;
    country: string;
    address: string;
    lng: number;
    lat: number;
    city: string;
    mqap_geography: { latLng: { lng: number; lat: number; }; };
    group_sic_code_name_ext: string;
    group_sic_code: string;
    side_of_street: string;
    disp_lng: number;
    phone: string;
    group_sic_code_ext: string;
    group_sic_code_name: string;
    name: string;
    disp_lat: number;
    state: string;
    id: string;
    postal_code: string;
  };
};

/* =========================================================== */
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

export type Type_LatLng = {
  lat: number;
  lng: number;
};
export type Type_LatLngOrNull = {
  lat: number | null;
  lng: number | null;
};
export type Type_ArrayALLRoute = {
  nameRoutes: string;
  totalDistance: number;
  totalTime: number;
  coordinates: Type_LatLng[];
  instructions: Type_For_Direction[];
};
/* =========================================================== */
/* =========================================================== */
export type Type_Type_IntermediatePoints_Objekt = {
  identObject?: string | number,
  address: Type_Addrress;
  latLng: number[];
};
export type Type_IntermediatePoints = Type_Type_IntermediatePoints_Objekt[];
/* =========================================================== */
/* =========================================================== */
export type Type_Addrress = {
  label: string;
  country: string;
  country_code: string;
  county: string;
  postcode: string;
  region: string;
  state: string;
  town: string;
};

export type TypeStartAndEndPoint = {
  address: Type_Addrress;
  latLng: number[];
};
/* =========================================================== */
/* =========================================================== */
export type Type_OnClick_object = {
  address: Type_Addrress;
  latLng: number[];
};
/* =========================================================== */
/* =========================================================== */
export type Type_forTraficDATA = {
  zoom: number,
  center: LatLngExpression | null,
  sizeMap: number[],
  mapsRectangle: number[]
};
/* =========================================================== */
/* =========================================================== */
export type type_forLocation_markerPopupt_data = {
  ident: string,
  address: Type_Addrress
}

export type Type_forLocation_markerPopupt = {
  popupStatus: boolean,
  data: type_forLocation_markerPopupt_data,
  location: Type_LatLngOrNull,
}

/* =========================================================== */
/* =========================================================== */

export type Type_forRouteChange = {
  routeIndex: number,
  onEvent: string
};
/* =========================================================== */
/* =========================================================== */
export type Type_location_DATA = {
  startPoints: TypeStartAndEndPoint;
  endPoints: TypeStartAndEndPoint;
  intermediatePoints: Type_IntermediatePoints;
  main_atl_route: Type_ArrayALLRoute[];
  changeRoutes: Type_forRouteChange
};
export type Type_sideWays_DATA = {
  clickOnMap: Type_OnClick_object;
  traffic: boolean,
  popup_event: boolean;
  markerInTheRoute: L.LatLngExpression | null,
  mapsCurrentInfo: Type_forTraficDATA,
  incident: Type_incident,
  mapBussines_Category: Type_MapBussines_Category,
  location_markerPopupt: Type_forLocation_markerPopupt
};

export type Type_Provider_Context = {
  location_DATA: Type_location_DATA;
  setLocation_DATA: React.Dispatch<React.SetStateAction<Type_location_DATA>>;
  sideWays_DATA: Type_sideWays_DATA,
  setSideWays_DATA: React.Dispatch<React.SetStateAction<Type_sideWays_DATA>>;
};
/* =========================================================== */
/* =========================================================== */
