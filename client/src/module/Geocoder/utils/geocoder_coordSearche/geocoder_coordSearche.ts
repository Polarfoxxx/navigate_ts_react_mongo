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
    const RESPONSE = await axios.get(
      `${PROVIDER_URL}?q=${encodeURIComponent(SEARCH_QUERY)}&format=${FORMAT}&accept-language=${LANGUAGE}&addressdetails=1&limit=1`
    );
    console.log(RESPONSE);

    if (RESPONSE.data) {
      const ADDRESS_DATA = {
        label: RESPONSE.data[0].display_name,
        country: RESPONSE.data[0].address.country,
        country_code: RESPONSE.data[0].address.country_code,
        county: RESPONSE.data[0].address.country,
        postcode: RESPONSE.data[0].address.postcode,
        region: RESPONSE.data[0].address.region,
        state: RESPONSE.data[0].address.state,
        town: RESPONSE.data[0].address.town || RESPONSE.data[0].address.suburb || RESPONSE.data[0].address.city,
      };

      const UPDATE_DATA: Type_returning_object = {
        address: ADDRESS_DATA,
        latLng: [CLICK_COORD[0], CLICK_COORD[1]],
        type: "clickToMap",
      };

      return UPDATE_DATA;
    } else {
      console.log("Place not found.");
      throw new Error("Place not found.");
    }
  } catch (error) {
    console.error('Error geocoding:', error);
    throw error;
  };
};

export default geocoder_coordSearche;
