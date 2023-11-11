import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";

const API_KEY = "5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC";

enum POI_Category_Code {
  Restaurants = 581208,
  Pubs = 581305,
  ShoppingCenters = 651201,
  Cafes = 581214,
  Bars = 581301,
};




async function search_API(ALL_INCIDENTS_WIN: Type_MostedCoordinate_Arr[]): Promise<any> {
  console.log(ALL_INCIDENTS_WIN);


  const NORTHER_WESTERN = `${ALL_INCIDENTS_WIN[0].norther_western}`;
  const SOUTH_EAST = `${ALL_INCIDENTS_WIN[0].south_east}`;



  const URL = `https://www.mapquestapi.com/search/v2/rectangle?maxMatches=100&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|${POI_Category_Code.Restaurants}&locations=${NORTHER_WESTERN}&locations=${SOUTH_EAST}&outFormat=json&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default search_API;
