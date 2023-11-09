import { OpenStreetMapProvider } from "leaflet-geosearch";
import {
  Type_fromGeocoderMapClickSearche,
  Type_returning_object,
} from "./types";

export default async function geocoder_coordSearche(CLICK_COORD: Type_fromGeocoderMapClickSearche): Promise<Type_returning_object> {
  const provider = new OpenStreetMapProvider();
  
  const searchQuery = `${CLICK_COORD[0]}, ${CLICK_COORD[1]}`;

  try {
    const result = await provider.search({ query: searchQuery });

    if (result.length > 0) {
      const firstResult = result[0];

      const update_data: Type_returning_object = {
        address: firstResult.label,
        latLng: [CLICK_COORD[0],CLICK_COORD[1]],     /*  [firstResult.y, firstResult.x]  ak chcem aby sa coord viazali na dom */
        type: "clickToMap"
      };

      return update_data;
    } else {
      console.log("Place not found.");
      throw new Error("Place not found.");
    }
  } catch (error) {
    console.error("Error geocoding:", error);
    throw error;
  }
}
