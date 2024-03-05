import axios, { AxiosResponse } from "axios";
import { Type_forMAP_Traffic } from "../../IncidentsToMaps";

async function mapTaffic_API(DATA_FOR_MAPTRAFF: Type_forMAP_Traffic): Promise<ArrayBuffer | undefined> {
  const API_KEY = ""; /* your key */
  const LAT = DATA_FOR_MAPTRAFF.lat;
  const LNG = DATA_FOR_MAPTRAFF.lng;
  const WIDTH = DATA_FOR_MAPTRAFF.width;
  const HEIGHT = DATA_FOR_MAPTRAFF.height;
  const ZOOM = DATA_FOR_MAPTRAFF.zoom;

  try {
    const URL =
      `https://www.mapquestapi.com/traffic/v2/flow?imageType=png&` +
      `mapLat=${LAT}&mapLng=${LNG}&mapHeight=${HEIGHT}&` +
      `mapWidth=${WIDTH}&mapScale=${ZOOM}&key=${API_KEY}`;

    const response: AxiosResponse<ArrayBuffer> = await axios.get(URL, { responseType: "arraybuffer" });
    return response.data;

  } catch (error) {
    console.error(error);
    return undefined;
  };
};

export default mapTaffic_API;
