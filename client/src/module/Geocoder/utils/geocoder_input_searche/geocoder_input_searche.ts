// GeocoderService.ts
import axios from "axios";

class GeocoderInputSearche {
  async autoComplete(query: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const autoResults: string[] = response.data.map(
        (result: { display_name: string }) => result.display_name
      );
      return autoResults;
    } catch (error) {
      console.error("Auto-complete error:", error);
      return [];
    }
  }

  async getCoordinatesForAddress(address: string): Promise<{ lat: number; lon: number } | null> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      if (response.data.length > 0) {
        const coordinates = {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
        return coordinates;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }
}

export default GeocoderInputSearche;
