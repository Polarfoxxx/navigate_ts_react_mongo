import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";

const API_KEY = "5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC";

async function search_API(
  ALL_INCIDENTS_WIN: Type_MostedCoordinate_Arr[]
): Promise<any> {

    const BOUNDING_BOX = `${ALL_INCIDENTS_WIN[0].norther_western}, ${ALL_INCIDENTS_WIN[0].south_east}`;
  const URL = `https://www.mapquestapi.com/search/v2/rectangle?key=5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC&boundingBox=${BOUNDING_BOX}&maxMatches=100`;

  try {
    const response = await axios.get(URL);

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default search_API;
