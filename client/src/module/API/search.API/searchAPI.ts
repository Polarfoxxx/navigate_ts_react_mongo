import axios from "axios";
import { Type_forSearchAPI_Circle, Type_forSearchAPI_Corridor } from "../../IncidentsToMaps";
import { Type_SearchRespo_EDITED_DATA } from "../../Container";
import { Type_RAW_DATA_response_bussiness } from "..";
import { services_setResponseDATA } from "..";
import convert from "convert";

const SEARCH_BUSSINES_API = {
  search_API_bussines_Circle,
  search_API_bussines_Corridor
}
export default SEARCH_BUSSINES_API;

const API_KEY = "5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC";

async function search_API_bussines_Circle(searchCircleBussines: Type_forSearchAPI_Circle): Promise<Type_SearchRespo_EDITED_DATA[]> {
  const KEY_REQUIRED: (keyof Type_RAW_DATA_response_bussiness)[] = ["fields", "distance", "distanceUnit", "name", "resultNumber"]
  const COORDINATE_POINT = searchCircleBussines.coordinate_point;
  const AREA = convert(+searchCircleBussines.area, 'km').to('miles');
  const MAX_MATCHES = searchCircleBussines.max_matches;
  const AMBIGUITIES = searchCircleBussines.ambiguities;
  const SIC_CODE = searchCircleBussines.SIC_CODE;

  const URL = `https://www.mapquestapi.com/search/v2/radius?` +
    `origin=${COORDINATE_POINT[0]},+${COORDINATE_POINT[1]}&` +
    `radius=${AREA}&maxMatches=${MAX_MATCHES}&units=k&ambiguities=${AMBIGUITIES}&` +
    `hostedData=mqap.ntpois|group_sic_code=?|${SIC_CODE}&outFormat=json&` +
    `key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const RESPO_RAW_DATA: Type_RAW_DATA_response_bussiness[] = response.data.searchResults;

    /* uprava vyslednych dat pomocou services, vybranie iba niektorych klucov */
    const RESPO_EDITED_DATA: Type_SearchRespo_EDITED_DATA[] = services_setResponseDATA({ KEY_REQUIRED: KEY_REQUIRED, RESPO_RAW_DATA: RESPO_RAW_DATA });
    return RESPO_EDITED_DATA

  } catch (error) {
    console.error(error);
    return [];
  };
};





async function search_API_bussines_Corridor(searchCorridorBussines: Type_forSearchAPI_Corridor): Promise<Type_SearchRespo_EDITED_DATA[]> {
  const KEY_REQUIRED: (keyof Type_RAW_DATA_response_bussiness)[] = ["fields", "distance", "distanceUnit", "name", "resultNumber"]
  const COORDINATE_POINT = searchCorridorBussines.coordinateALLpoints;
  const MAX_MATCHES = searchCorridorBussines.max_matches;
  const AMBIGUITIES = searchCorridorBussines.ambiguities;
  const SIC_CODE = searchCorridorBussines.SIC_CODE;
  const WIDTH = convert(+searchCorridorBussines.width, 'km').to('miles');
  const BUFF_WIDTH = convert(+searchCorridorBussines.buff_width, 'km').to('miles');
  
  const URL = `https://www.mapquestapi.com/search/v2/corridor?` +
  `line=${COORDINATE_POINT}&width=${WIDTH}&bufferedWidth=${BUFF_WIDTH}&` +
  `maxMatches=${MAX_MATCHES}&ambiguities=${AMBIGUITIES}&` +
  `hostedData=mqap.ntpois|group_sic_code=?|${SIC_CODE}&outFormat=json&` +
  `key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const RESPO_RAW_DATA: Type_RAW_DATA_response_bussiness[] = response.data.searchResults;
console.log(RESPO_RAW_DATA);

    /* uprava vyslednych dat pomocou services, vybranie iba niektorych klucov */
    const RESPO_EDITED_DATA: Type_SearchRespo_EDITED_DATA[] = services_setResponseDATA({ KEY_REQUIRED: KEY_REQUIRED, RESPO_RAW_DATA: RESPO_RAW_DATA });
    return RESPO_EDITED_DATA

  } catch (error) {
    console.error(error);
    return [];
  };
};
