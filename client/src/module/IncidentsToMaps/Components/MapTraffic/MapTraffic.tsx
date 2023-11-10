import React from "react";
import services_zoomLevel from "./services/services_zoomLevel";
import { useMap } from "react-leaflet";
import L from "leaflet"
import { Container } from "../../../Container";
import { search_API } from "../../../API";


function MapTraffic() {
    const MAP = useMap();
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, traffic } = sideWays_DATA;
    const [imageLayer, setImageLayer] = React.useState<L.ImageOverlay | null>(null);



React.useEffect(() =>{
    if (MAP && traffic && mapsCurrentInfo.center && mapsCurrentInfo.zoom > 10) {
   /*  search_API() */

            const LAT = Object.values(mapsCurrentInfo.center)[0];
            const LNG = Object.values(mapsCurrentInfo.center)[1];
            const WIDTH = mapsCurrentInfo.sizeMap[0];
            const HEIGHT = mapsCurrentInfo.sizeMap[1]
            const ZOOM = services_zoomLevel(mapsCurrentInfo.zoom)

    
            const trafficLayerUrl = ` https://www.mapquestapi.com/traffic/v2/flow?&imageType=png&mapLat=${LAT}&mapLng=${LNG}&mapHeight=${HEIGHT}&mapWidth=${WIDTH}&mapScale=${ZOOM}&key=5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC`;
            const imageUrl = trafficLayerUrl;
            const newImageLayer = L.imageOverlay(imageUrl, MAP.getBounds());
            
            if (imageLayer) {
                MAP.removeLayer(imageLayer);
            };
            newImageLayer.addTo(MAP);
            setImageLayer( newImageLayer);
    
        } else{
               if (imageLayer) {
                MAP.removeLayer(imageLayer);
            };
        };

},[traffic, mapsCurrentInfo.center])
 


    return null
}

export default MapTraffic




