// GeocoderService.ts
import axios from "axios";
import { Type_respo_geocoderForAddress } from "./types";


const PROVIDER_URL = 'https://nominatim.openstreetmap.org/search';
const FORMAT = 'json';
const LANGUAGE = 'en';

class GeocoderInputSearche {
  async autoComplete(query: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `${PROVIDER_URL}?format=${FORMAT}&q=${query}&accept-language=${LANGUAGE}`
      );
      const autoResults: string[] = response.data.map(
        (result: { display_name: string }) => result.display_name
      );
      return autoResults;
    } catch (error) {
      console.error("Auto-complete error:", error);
      return [];
    };
  };


  async getCoordinatesForAddress(address: string): Promise<Type_respo_geocoderForAddress | null> {
    try {
      const RESPONSE = await axios.get(
        `${PROVIDER_URL}?format=${FORMAT}&q=${address}&accept-language=${LANGUAGE}&addressdetails=1&limit=1`
      );
      console.log(RESPONSE);

      if (RESPONSE.data.length > 0) {
        const COORDINATES_AND_ADDRESS = {
          label: RESPONSE.data[0].display_name,
          country: RESPONSE.data[0].address.country,
          country_code: RESPONSE.data[0].address.country_code,
          county: RESPONSE.data[0].address.country,
          postcode: RESPONSE.data[0].address.postcode,
          region: RESPONSE.data[0].address.region,
          state: RESPONSE.data[0].address.state,
          town:  RESPONSE.data[0].address.town || RESPONSE.data[0].address.suburb || RESPONSE.data[0].address.city,
          lat: parseFloat(RESPONSE.data[0].lat),
          lon: parseFloat(RESPONSE.data[0].lon),
        };
        return COORDINATES_AND_ADDRESS;
      } else {
        return null;
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    };
  };
};

export default GeocoderInputSearche;
