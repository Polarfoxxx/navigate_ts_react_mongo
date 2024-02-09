import React from "react";
import { Container } from "../../../Container";
import { SEARCH_BUSSINES_API } from "../../../API";
import { services_SICcode_bussines, Type_forSearchAPI_Circle, Type_forSearchAPI_Corridor, services_ConnectionOfAllCoord } from "..";
import { Type_SearchRespo_EDITED_DATA } from "../../../Container";
import MarkersBussinessAndIncidents from "../MarkersBussinessAndIncidents/MarkersBussinessAndIncidents";
import L from "leaflet";
import { UseChangeContextDATA } from "../../../hooks";
import { SERVICES_MARKER_ICON } from "../../../RouteMachine";

function MapSearch(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA, { startPoints, main_atl_route } = location_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [allBussines, setAllBussines] = React.useState<Type_SearchRespo_EDITED_DATA[]>([]);

    React.useEffect(() => {
        fetchSearchData()
    }, [JSON.stringify( mapBussines_Category.SIC_Data)]);


    async function fetchSearchData() {
        if (mapBussines_Category.typeSearch === "OnePointBussinessSearche" && mapBussines_Category.SIC_Data && startPoints.latLng) {
            const UPDATE_DATA_CIRCLE_API: Type_forSearchAPI_Circle = {
                coordinate_point: startPoints.latLng,
                area: mapBussines_Category.SIC_Data.area,
                max_matches: mapBussines_Category.SIC_Data.numResult,
                ambiguities: mapBussines_Category.SIC_Data.ambiguities,
                SIC_CODE: services_SICcode_bussines(mapBussines_Category.SIC_Data.type)
            };
            try {
                const DATA_API: Type_SearchRespo_EDITED_DATA[] = await SEARCH_BUSSINES_API.search_API_bussines_Circle(UPDATE_DATA_CIRCLE_API);
                console.log(DATA_API);
                setAllBussines(DATA_API)
                const UPDATE_DATA_FOR_CONTEXT = {
                    ...mapBussines_Category,
                    allResultDATA: DATA_API
                };
                updateContext_DATA([
                    { newData: UPDATE_DATA_FOR_CONTEXT, key: "mapBussines_Category" },
                ]);
            } catch (error) {
                console.error(error);
            };
        } else if (mapBussines_Category.typeSearch === "RouteBussinessSearche" && mapBussines_Category.SIC_Data) {
            const UPDATE_DATA_CORRIDOR_API: Type_forSearchAPI_Corridor = {
                coordinateALLpoints: services_ConnectionOfAllCoord(main_atl_route),
                max_matches: mapBussines_Category.SIC_Data.numResult,
                ambiguities: mapBussines_Category.SIC_Data.ambiguities,
                SIC_CODE: services_SICcode_bussines(mapBussines_Category.SIC_Data.type),
                width: mapBussines_Category.SIC_Data.width,
                buff_width: mapBussines_Category.SIC_Data.bufferedWidth,
            };
            try {
                const DATA_API = await SEARCH_BUSSINES_API.search_API_bussines_Corridor(UPDATE_DATA_CORRIDOR_API)
                console.log(DATA_API);
                setAllBussines(DATA_API)
                const UPDATE_DATA_FOR_CONTEXT = {
                    ...mapBussines_Category,
                    allResultDATA: DATA_API
                };
                updateContext_DATA([
                    { newData: UPDATE_DATA_FOR_CONTEXT, key: "mapBussines_Category" },
                ]);
            } catch (error) {
                console.error(error);
            };

        }
    }

    return (
        <>
            {
                 allBussines.length > 0 && mapBussines_Category.status && allBussines.map((item, key) =>
                    <MarkersBussinessAndIncidents
                        type="bussines"
                        position={item.fields.mqap_geography.latLng}
                        data={item}
                        key={key}
                        icon={SERVICES_MARKER_ICON.bussinesIcon()}
                    />
                )
            };
        </>
    );
};
export default MapSearch;