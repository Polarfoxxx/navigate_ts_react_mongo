import React from "react";
import { useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { SEARCH_BUSSINES_API } from "../../../API";
import { services_POIcode_bussines, Type_forSearchAPI_Circle, Type_SearchResponse_Circle } from "..";
import MarkersBussinessAndIncidents from "../MarkersBussinessAndIncidents/MarkersBussinessAndIncidents";

function MapSearch(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { mapsCurrentInfo, mapBussines_Category } = sideWays_DATA, { startPoints } = location_DATA;
    const [allBussines, setBussines] = React.useState<Type_SearchResponse_Circle[]>([]);
    const KEY_REQUIRED: (keyof Type_SearchResponse_Circle)[] = ["fields", "distance", "name", "resultNumber"];

    React.useEffect(() => {
        fetchSearchData()
    }, [mapBussines_Category.status]);


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
                const DATA_API: Type_SearchResponse_Circle[] = await SEARCH_BUSSINES_API.search_API_bussines_Circle(UPDATE_DATA);
                console.log(DATA_API);
                /* setBussines(DATA_API) */
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
        }
    }

    /* 
    if(mapBussines_Category.POI_Data?.area) {
        cicrcele(mapBussines_Category.POI_Data?.area)
    }
     
    function cicrcele(area: string) {
        var circle = L.circle([startPoints.latLng[0], startPoints.latLng[1]], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: +area   
        }).addTo(MAP);
    }
    
     */


    return (
        <>
            {
                mapBussines_Category.status && allBussines.length > 0 &&
                allBussines.map((item, key) =>
                    <MarkersBussinessAndIncidents
                        KEY_REQUIRED={KEY_REQUIRED}
                        position={item.fields.mqap_geography.latLng}
                        data={item}
                        key={key}
                    />

                )
            }
        </>
    );
};
export default MapSearch;