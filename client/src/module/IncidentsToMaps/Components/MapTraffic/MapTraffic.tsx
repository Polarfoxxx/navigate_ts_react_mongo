import React from "react";
import services_zoomLevel from "./services/services_zoomLevel";
import { useMap } from "react-leaflet";
import L from "leaflet"
import { Container } from "../../../Container";
import { mapTaffic_API } from "../../../API";
import { Type_forMAP_Traffic } from "./types";

function MapTraffic(): null {
    const MAP = useMap();
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, traffic } = sideWays_DATA;
    const [imageLayer, setImageLayer] = React.useState<L.ImageOverlay | null>(null);

    /*spustenie a nastavenie dat pre funkciu  */
    React.useEffect(() => {
        if (MAP && traffic && mapsCurrentInfo.center && mapsCurrentInfo.zoom > 13) {
            const DATA_FOR_MAPTRAFF: Type_forMAP_Traffic = {
                lat: Object.values(mapsCurrentInfo.center)[0],
                lng: Object.values(mapsCurrentInfo.center)[1],
                width: mapsCurrentInfo.sizeMap[0],
                height: mapsCurrentInfo.sizeMap[1],
                zoom: services_zoomLevel(mapsCurrentInfo.zoom)
            };
            /* asynchronna funkcia */
            fetchImageLayer(DATA_FOR_MAPTRAFF)
        } else {
            if (imageLayer) {
                MAP.removeLayer(imageLayer);
            };
        }
    }, [traffic, mapsCurrentInfo.center]);



    /* funkcia pre stahovanie dat */
    async function fetchImageLayer(DATA_FOR_MAPTRAFF: any) {
        try {
            const FETCH_DATA = await mapTaffic_API(DATA_FOR_MAPTRAFF);
            const IMAGE_LAYER = FETCH_DATA;
            const NEW_IMAGE_LAYER = L.imageOverlay(IMAGE_LAYER, MAP.getBounds());

            if (imageLayer) {
                MAP.removeLayer(imageLayer);
            };

            NEW_IMAGE_LAYER.addTo(MAP);
            setImageLayer(NEW_IMAGE_LAYER);

        } catch (error) {
            console.error(error);
        };
    };

    return null;
};

export default MapTraffic




