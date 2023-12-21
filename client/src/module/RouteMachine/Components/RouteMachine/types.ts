import L from "leaflet";
import { Type_location_DATA } from "../../../Container";

export type Type_RoutesFoundEvent = {
  routes: L.Routing.IRoute[];
};
export type Type_RoutingControlType = L.Routing.Control;

export type Type_DetailRoutes_Arr = {
  nameRoutes: string;
  totalDistance: number;
  totalTime: number;
  coordinates: L.LatLng[] | [];
  instructions: L.Routing.IInstruction[] | [];
}[];

export type Type_properties_RoutesDetail = {
  isSimplified: boolean;
};

export type Type_summary_RoutesDetail = {
  totalDistance: number;
  totalTime: number;
};

export type Type_leafletRoutesDetail = {
  coordinates: [];
  inputWaypoints: [];
  name: string;
  properties: Type_properties_RoutesDetail;
  routesIndex: number;
  summary: Type_summary_RoutesDetail;
  waypointIndices: [];
  waypoints: any[];
}[];

export type Type_PropsforMovieMarker = {
  location_DATA: Type_location_DATA;
  markerIdent: string | number
  currentLatLng: L.LatLng
};
