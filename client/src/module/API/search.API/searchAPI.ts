import axios from "axios";
import { Type_forSearchAPI_Circle, Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";
import { Type_SearchRespo_clearDATA_Circle } from "../../Container";
import { Type_RAW_OnePoint_response_bussiness } from "..";
import { services_setResponseDATA } from "..";

const SEARCH_BUSSINES_API = {
  search_API_bussines_Circle,
  search_API_bussines_Corridor
}
export default SEARCH_BUSSINES_API;

const API_KEY = "5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC";

async function search_API_bussines_Circle(searchCircleBussines: Type_forSearchAPI_Circle): Promise<Type_SearchRespo_clearDATA_Circle[]> {
  const KEY_REQUIRED: (keyof Type_RAW_OnePoint_response_bussiness)[] = ["fields", "distance", "distanceUnit", "name", "resultNumber"]
  const COORDINATE_POINT = searchCircleBussines.coordinate_point;
  const AREA = searchCircleBussines.area;
  const MAX_MATCHES = searchCircleBussines.max_matches;
  const AMBIGUITIES = searchCircleBussines.ambiguities;
  const POI_CODE = searchCircleBussines.POI_code;

  const URL = `https://www.mapquestapi.com/search/v2/radius?` +
    `origin=${COORDINATE_POINT[0]},+${COORDINATE_POINT[1]}&` +
    `radius=${+AREA * 0.6213}&maxMatches=${MAX_MATCHES}&units=k&ambiguities=${AMBIGUITIES}&` +
    `hostedData=mqap.ntpois|group_sic_code=?|${POI_CODE}&outFormat=json&` +
    `key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const RESPO_RAW_DATA: Type_RAW_OnePoint_response_bussiness[] = response.data.searchResults;

    /* uprava vyslednych dat pomocou services, vybranie iba niektorych klucov */
    const CIRCLE_RESPO_ARR: Type_SearchRespo_clearDATA_Circle[] = services_setResponseDATA({ KEY_REQUIRED: KEY_REQUIRED, RESPO_RAW_DATA: RESPO_RAW_DATA });
    return CIRCLE_RESPO_ARR

  } catch (error) {
    console.error(error);
    return [];
  };
};













async function search_API_bussines_Corridor(ALL_INCIDENTS_WIN: Type_MostedCoordinate_Arr[]): Promise<any> {
  console.log(ALL_INCIDENTS_WIN);
  const NORTHER_WESTERN = `${ALL_INCIDENTS_WIN[0].norther_western}`;
  const SOUTH_EAST = `${ALL_INCIDENTS_WIN[0].south_east}`;
  const URL = ``;

  try {
    const response = await axios.get(URL);

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

