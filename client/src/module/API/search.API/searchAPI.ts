import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";
import { Type_forSearchAPI_Circle } from "../../IncidentsToMaps";

const API_KEY = "5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC";


const SEARCH_BUSSINES_API = {
  search_API_bussines_Circle,
  search_API_bussines_Corridor
}
export default SEARCH_BUSSINES_API;



async function search_API_bussines_Circle<T>(searchCircleBussines: Type_forSearchAPI_Circle): Promise<any> {
const COORDINATE_POINT = searchCircleBussines.coordinate_point;
const AREA = searchCircleBussines.area;
const MAX_MATCHES = searchCircleBussines.max_matches;
const AMBIGUITIES = searchCircleBussines.ambiguities;
const POI_CODE = searchCircleBussines.POI_code;

const URL = `https://www.mapquestapi.com/search/v2/radius?origin=${COORDINATE_POINT[0]}+${COORDINATE_POINT[1]}&radius=${AREA}&maxMatches=${MAX_MATCHES}&ambiguities=${AMBIGUITIES}&hostedData=mqap.ntpois|group_sic_code=?|${POI_CODE}&outFormat=json&key=${API_KEY}` 

  try {
    const response = await axios.get(URL);
console.log(response)
;



let respo_array_data = [];

   /*  const RESPONSE_OBJEKT = {
      distanceUnit: string;
      distance: number;
      name: string;
      sourceName: string;
      resultNumber: number;
      fields: {
          mqap_id: string;
          country: string;
          address: string;
          lng: number;
          city: string;
          group_sic_code_name_ext: string;
          group_sic_code: string;
          side_of_street: string;
          disp_lng: number;
          phone: string;
          group_sic_code_ext: string;
          group_sic_code_name: string;
          name: string;
          disp_lat: number;
          state: string;
          id: string;
          postal_code: string;
          mqap_geography: {
              latLng: {
                  lng: number;
                  lat: number;
              }
          }
      }
    } */

   /*  respo_array_data.push(RESPONSE_OBJEKT); */
    return 

  } catch (error) {
    console.error(error);
    return [];
  }
}

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

