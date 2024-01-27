import React from "react";
import services_zoomLevel from "./services/services_zoomLevel";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Container } from "../../../Container";
import { mapTaffic_API } from "../../../API";
import { Type_forMAP_Traffic } from "./types";

function MapTraffic(): null {
  const MAP = useMap();
  const { sideWays_DATA } = React.useContext(Container.Context);
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
  async function fetchImageLayer(DATA_FOR_MAPTRAFF: Type_forMAP_Traffic) {
    try {
      const FETCH_DATA = await mapTaffic_API(DATA_FOR_MAPTRAFF);
      if (FETCH_DATA !== undefined) {
        /* prevod ArrayBuffer na base64 retazec */
        const BASE_64_STRING = arrayBufferToBase64(FETCH_DATA);
        /* vytvorenie URL pre obrazok */
        const IMAGE_LAYER = `data:image/png;base64,${BASE_64_STRING}`;
        if (imageLayer && MAP) {
          MAP.removeLayer(imageLayer);
        };
        const NEW_IMAGE_LAYER = L.imageOverlay(IMAGE_LAYER, MAP.getBounds());
        // Ověřte, že `MAP` a `setImageLayer` jsou definovány
        if (MAP) {
          NEW_IMAGE_LAYER.addTo(MAP);
          setImageLayer(NEW_IMAGE_LAYER);
        } else {
          console.error("MAP not available");
        };
      } else {
        console.error("Data not available");
      };
    } catch (error) {
      console.error(error);
    };
  };

  /* funkcia na prevod bn binar na retazec */
  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const BINARY_ARR = new Uint8Array(buffer);
    const BINARY = Array.from(BINARY_ARR);
    return btoa(BINARY.map((num) => String.fromCharCode(num)).join(''));
  };

  return null;
};

export default MapTraffic;




