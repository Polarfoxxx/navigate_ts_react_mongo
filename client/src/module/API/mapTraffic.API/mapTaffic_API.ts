import axios from "axios";
import { Type_forMAP_Traffic } from "../../IncidentsToMaps";


async function mapTaffic_API(DATA_FOR_MAPTRAFF: Type_forMAP_Traffic): Promise<any> {
    const API_KEY = '5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC';
    const LAT = DATA_FOR_MAPTRAFF.lat;
    const LNG = DATA_FOR_MAPTRAFF.lng;
    const WIDTH = DATA_FOR_MAPTRAFF.width;
    const HEIGHT = DATA_FOR_MAPTRAFF.height;
    const ZOOM = DATA_FOR_MAPTRAFF.zoom


    const URL = `https://www.mapquestapi.com/traffic/v2/flow?&imageType=png&
      mapLat=${LAT}&mapLng=${LNG}&mapHeight=${HEIGHT}&
      mapWidth=${WIDTH}&mapScale=${ZOOM}&key=${API_KEY}`;

    try {
        const RESPO_IMAGE = await axios.get(URL);
        console.log(RESPO_IMAGE);
        
     /*    return RESPO_IMAGE.data.incidents; */

    } catch (error) {
        console.error(error);
        return "";
    }
}



export default mapTaffic_API;