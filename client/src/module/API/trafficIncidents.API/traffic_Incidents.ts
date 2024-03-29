import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";
import services_setResponseDATA from "../utils/services_setResponseDATA";
import { Type_IncidentDATA_forMarker } from "../../Container";
import { Type_RAW_Incidents_response } from "./types";

const API_KEY = ''; /* your key */

async function fetchIncidentsForSection(section: Type_MostedCoordinate_Arr): Promise<Type_RAW_Incidents_response[]> {
  const BOUNDING_BOX = `${section.norther_western}, ${section.south_east}`;
  const URL = `https://www.mapquestapi.com/traffic/v2/incidents?key=${API_KEY}&boundingBox=${BOUNDING_BOX}&filters=construction,incidents`;
  try {
    const response = await axios.get(URL);
    return response.data.incidents;

  } catch (error) {
    console.error(error);
    return [];
  };
};

export default async function traffic_Incidents_API(sectionsArray: Type_MostedCoordinate_Arr[], delay: number, initialDelay: number): Promise<Type_IncidentDATA_forMarker[]> {
  const ALL_INCIDENTS: Type_RAW_Incidents_response[] = [];
  const KEY_REQUIRED: (keyof Type_RAW_Incidents_response)[] = ['id', 'type', 'startTime', 'endTime', 'shortDesc', 'fullDesc', 'distance', 'severity', 'impacting', 'iconURL', 'lat', 'lng'];
  await new Promise(resolve => setTimeout(resolve, initialDelay));

  for (const section of sectionsArray) {
    const incidents = await fetchIncidentsForSection(section);
    ALL_INCIDENTS.push(...incidents);
    await new Promise(resolve => setTimeout(resolve, delay));
  };
  const INCIDETS_RESPO_ARR: Type_IncidentDATA_forMarker[] = services_setResponseDATA({ KEY_REQUIRED: KEY_REQUIRED, RESPO_RAW_DATA: ALL_INCIDENTS })
  return INCIDETS_RESPO_ARR;
}
