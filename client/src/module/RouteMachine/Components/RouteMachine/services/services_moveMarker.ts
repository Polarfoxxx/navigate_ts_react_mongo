import { Type_PropsforMovieMarker } from "../types";
import { geocoder_coordSearche } from "../../../../Geocoder";

export default async function services_moveMarker({
  location_DATA,
  markerIdent,
  currentLatLng,
}: Type_PropsforMovieMarker) {

  if (markerIdent && currentLatLng.lat && currentLatLng.lng) {
    const LAT = currentLatLng.lat;
    const LNG = currentLatLng.lng;

    try {
      const GEOCODER_DATA = await geocoder_coordSearche([LAT, LNG]);
      if (GEOCODER_DATA) {
        const UPDATED_ARRAY = [...location_DATA.intermediatePoints];
        if (typeof markerIdent === "number") {
         /*  UPDATED_ARRAY[markerIdent - 1] = GEOCODER_DATA.address; */
        };
        if (markerIdent === "start_points") {
          return {
            ...location_DATA,
            startPoints: GEOCODER_DATA.address,
          };
        } else if (markerIdent === "end_points") {
          return {
            ...location_DATA,
            endPoints: GEOCODER_DATA.address,
          };
        } else if (typeof (markerIdent) === "number") {
          return {
            ...location_DATA,
            intermediatePoints: UPDATED_ARRAY,
          };
        };
      };

    } catch (error) {
      console.error("Chyba při geokódování:", error);
    };
  };

  return location_DATA;
};
