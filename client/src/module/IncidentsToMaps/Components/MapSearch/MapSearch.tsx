import React from "react";
import { Container } from "../../../Container";
import { useMap } from "react-leaflet";
import { SEARCH_BUSSINES_API } from "../../../API";
import { services_POIcode_bussines, Type_forSearchAPI_Circle } from "..";
import { Type_SearchRespo_clearDATA_Circle } from "../../../Container";
import MarkersBussinessAndIncidents from "../MarkersBussinessAndIncidents/MarkersBussinessAndIncidents";
import L from "leaflet";

function MapSearch(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA, { startPoints } = location_DATA;
    const [allBussines, setBussines] = React.useState<Type_SearchRespo_clearDATA_Circle[]>([]);


    React.useEffect(() => {
        fetchSearchData()
    }, [mapBussines_Category.POI_Data?.type]);


    async function fetchSearchData() {
        if (mapBussines_Category.typeSearch === "OnePointBussinessSearche" && mapBussines_Category.POI_Data) {
            const UPDATE_DATA: Type_forSearchAPI_Circle = {
                coordinate_point: startPoints.latLng,
                area: mapBussines_Category.POI_Data.area,
                max_matches: mapBussines_Category.POI_Data.numResult,
                ambiguities: mapBussines_Category.POI_Data.ambiguities,
                POI_code: services_POIcode_bussines(mapBussines_Category.POI_Data.type)
            };
            try {
                const DATA_API: Type_SearchRespo_clearDATA_Circle[] = await SEARCH_BUSSINES_API.search_API_bussines_Circle(UPDATE_DATA);
                console.log(DATA_API);
                setBussines(DATA_API)
            } catch (error) {
                console.error(error);
            };

        } else if (mapBussines_Category.typeSearch === "RouteBussinessSearche") {
            try {
                /*  const DATA_API = await SEARCH_BUSSINES_API.search_API_bussines_Corridor()
                 console.log(DATA_API);
  */
            } catch (error) {
                console.error(error);
            };
        };
    };
    
 
/*     React.useEffect(() => {
        if (mapBussines_Category.POI_Data?.area) {
            cicrcele(mapBussines_Category.POI_Data?.area)
        }
        function cicrcele(area: string) {
            L.circle([startPoints.latLng[0], startPoints.latLng[1]], {
                color: 'rgb(106, 255, 0)',
                fillColor: 'black',
                fillOpacity: 0.3,
                radius: (+area * 1000)
            }).addTo(MAP);
        }
    }, [allBussines])
 */


    return (
        <>
            {
                mapBussines_Category.status && allBussines.length > 0 && mapBussines_Category.status &&
                allBussines.map((item, key) =>
                    <MarkersBussinessAndIncidents
                        type="bussines"
                        position={item.fields.mqap_geography.latLng}
                        data={item}
                        key={key}
                        icon={L.icon({
                            iconUrl: `https://assets.mapquestapi.com/icon/v2/marker-000000-sm.png`,
                            iconSize: [38, 45],
                            iconAnchor: [19, 35],
                        })}
                    />
                )
            };
        </>
    );
};
export default MapSearch;