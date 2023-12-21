import L from "leaflet";
import { Type_DetailRoutes_Arr, Type_leafletRoutesDetail } from "../types";

export default function services_routeDetail(
  routes: Type_leafletRoutesDetail
): Type_DetailRoutes_Arr {

  const ALL_ROUTE_ARR: Type_DetailRoutes_Arr = [];

  routes.forEach((route: L.Routing.IRoute) => {
    const NEW_ROUTE = {
      nameRoutes: route.name ? route.name : "",
      totalDistance: route.summary ? route.summary.totalDistance : 0,
      totalTime: route.summary ? route.summary.totalTime : 0,
      coordinates: route.coordinates ? route.coordinates : [],
      instructions: route.instructions ? route.instructions : [],
    };
    ALL_ROUTE_ARR.push(NEW_ROUTE);
  });

  return ALL_ROUTE_ARR;
}
