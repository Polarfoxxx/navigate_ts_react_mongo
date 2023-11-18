import React, { useRef } from "react";
import { Container } from "../../../Container";
import { useMap } from "react-leaflet";
import { LeafletMouseEvent, LatLngExpression } from "leaflet";
import { geocoder_coordSearche } from "../../../Geocoder";
import { UseChangeContextDATA } from "../../../hooks";

function MapHandler(): null {
  const MAP = useMap();
  const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
  const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
  const popupLocationRef = useRef<LatLngExpression | undefined>();
  const centerMAP_zoomMAP_Ref = React.useRef({
    mapCenter: MAP.getCenter(),
    mapZoom: MAP.getZoom()
  });

  
  /* kliknutie n amapu */
  React.useEffect(() => {
    MAP.on("click", (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      popupLocationRef.current = [lat, lng];
      geocoder_coordSearche([lat, lng])
        .then(data => {
          /* test custtom hooks */
          updateContext_DATA([
            { newData: data, key: "clickOnMap" },
            { newData: true, key: "popup_clickToMap_status" }
          ]);
        });
    }, []);
  }, []);


  /* event pohyb mapi */
  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const handleMapMove = () => {
      const MAP_CENTER = MAP.getCenter();
      centerMAP_zoomMAP_Ref.current = {
        ...centerMAP_zoomMAP_Ref.current,
        mapCenter: MAP_CENTER,
      };
      // Zrušte predchádzajúci časovač, ak existuje
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setMoveFunction();
      }, 300);
    };
    // Pripojte udalosť "move" s obslužnou funkciou
    MAP.on("move", handleMapMove);
    // Odpojte udalosť "move" pri ukončení účinku
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      MAP.off("move", handleMapMove);
    };
  }, [MAP]);


  /* zachitenie zoom */
  MAP.on("zoomend", (e) => {
    const MAP_ZOOM = MAP.getZoom();
    centerMAP_zoomMAP_Ref.current = {
      ...centerMAP_zoomMAP_Ref.current,
      mapZoom: MAP_ZOOM
    };
  }, []);

  React.useEffect(() => {
    setMoveFunction()
  }, [])

  function setMoveFunction() {
    if (MAP) {
      // Získání rozměrů mapy v pixelech
      const mapElement = MAP.getContainer();
      const { width, height } = mapElement.getBoundingClientRect();

      // Získání odkazu na váš kontejner/mapový div

      const mapBounds = MAP.getBounds();
      const leftTopCoordinates = mapBounds.getNorthWest();
      const rightBottomCoordinates = mapBounds.getSouthEast();

      const UPDATE_DATA = {
        zoom: centerMAP_zoomMAP_Ref.current.mapZoom,
        center: centerMAP_zoomMAP_Ref.current.mapCenter,
        sizeMap: [width, height],
        mapsRectangle: [leftTopCoordinates.lat, leftTopCoordinates.lng, rightBottomCoordinates.lat, rightBottomCoordinates.lng]
      }
      updateContext_DATA([
        { newData: UPDATE_DATA, key: "mapsCurrentInfo" },
      ]);
    };
  };

  return null
};

export default MapHandler;