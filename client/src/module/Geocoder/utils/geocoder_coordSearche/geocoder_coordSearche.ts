import axios from "axios";
import {
  Type_fromGeocoderMapClickSearche,
  Type_returning_object,
} from "./types";

 async function geocoder_coordSearche(CLICK_COORD: Type_fromGeocoderMapClickSearche): Promise<Type_returning_object> {
  const PROVIDER_URL = 'https://nominatim.openstreetmap.org/search';
  const FORMAT = 'json';
  const LANGUAGE = 'en';
  const SEARCH_QUERY = `${CLICK_COORD[0]}, ${CLICK_COORD[1]}`;

  try {
    const RESPONSE = await axios(
      `${PROVIDER_URL}?q=${encodeURIComponent(SEARCH_QUERY)}&format=${FORMAT}&accept-language=${LANGUAGE}&addressdetails=1&limit=1`
    );
    if (RESPONSE.data) {
      const RESULT = await RESPONSE.data;

      if (RESULT.length > 0) {
        const FIRST_RESULT = RESULT[0];
        console.log(FIRST_RESULT);

        const UPDATE_DATA: Type_returning_object = {
          address: FIRST_RESULT.display_name,
          latLng: [CLICK_COORD[0], CLICK_COORD[1]],
          type: "clickToMap",
        };

        return UPDATE_DATA;
      } else {
        console.log("Place not found.");
        throw new Error("Place not found.");
      }
    } else {
      console.error('Error fetching data from OpenStreetMap API');
      throw new Error('Error fetching data from OpenStreetMap API');
    }
  } catch (error) {
    console.error('Error geocoding:', error);
    throw error;
  };
};

export default geocoder_coordSearche;
