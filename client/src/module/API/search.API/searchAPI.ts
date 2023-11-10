import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";


const API_KEY = '5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC';

async function search_API(ALL_INCIDENTS_WIN: Type_MostedCoordinate_Arr[]): Promise<any> {
const URL = `https://www.mapquestapi.com/search/v2/rectangle?key=5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC&boundingBox=49.2180734,16.5646447,49.16274162781145,16.675197393251278&maxMatches=4`

  try {
    const response = await axios.get(URL);
    console.log(response);

    return response.data.incidents;
    
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default search_API

