import axios from "axios";
import { Type_MostedCoordinate_Arr } from "../../IncidentsToMaps";
const API_KEY = '5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC';

async function fetchIncidentsForSection<T>(section: Type_MostedCoordinate_Arr): Promise<T[]> {
  const BOUNDING_BOX = `${section.norther_western}, ${section.south_east}`;
   const URL = `https://www.mapquestapi.com/traffic/v2/incidents?key=${API_KEY}&boundingBox=${BOUNDING_BOX}&filters=construction,incidents`;
 
/* https://www.mapquestapi.com/traffic/v2/incidents?key=${API_KEY}&boundingBox=${boundingBox}&filters=construction,incidents */


  try {
    const response = await axios.get(URL);
    console.log(response.data.incidents);

    return response.data.incidents;
    
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function traffic_Incidents_API<T>(sectionsArray: Type_MostedCoordinate_Arr[], delay: number, initialDelay: number): Promise<T[]> {
  const allIncidents: T[] = [];

  // Počiatočné oneskorenie pred prvým volaním
  await new Promise(resolve => setTimeout(resolve, initialDelay));

  for (const section of sectionsArray) {
    const incidents = await fetchIncidentsForSection<T>(section);
    allIncidents.push(...incidents);

    // Pridajte časové oneskorenie medzi požiadavkami (napríklad 1000 ms = 1 sekunda)
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return allIncidents;
}
