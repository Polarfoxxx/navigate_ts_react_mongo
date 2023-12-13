// GeocoderService.ts
import axios from "axios";

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

  async getCoordinatesForAddress(address: string): Promise<{ lat: number; lon: number } | null> {
    try {
      const RESPONSE = await axios.get(
        `${PROVIDER_URL}?format=${FORMAT}&q=${address}&accept-language=${LANGUAGE}&addressdetails=1&limit=1`
      );
      console.log(RESPONSE);

      if (RESPONSE.data.length > 0) {
        const COORDINATES = {
          lat: parseFloat(RESPONSE.data[0].lat),
          lon: parseFloat(RESPONSE.data[0].lon),
        };
        return COORDINATES;
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
