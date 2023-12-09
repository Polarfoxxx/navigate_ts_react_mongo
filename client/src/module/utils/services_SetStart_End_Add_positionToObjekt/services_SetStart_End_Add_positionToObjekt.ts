import { Type_location_DATA } from "../../Container";
import { TypeFor_services_SetStart_End_Add_positionToObjekt } from "./types";


function services_SetStart_End_Add_positionToObjekt({
    location_DATA,
    sideWays_DATA,
    GEO_DATA,
    input_ident
}: TypeFor_services_SetStart_End_Add_positionToObjekt): Type_location_DATA {

    if (!location_DATA.startPoints.address) {
        const UPDATE_OBJECT_NEW_LOCATION = {
            ...location_DATA,
            startPoints: {
                address: GEO_DATA && GEO_DATA.address ? GEO_DATA.address : sideWays_DATA.clickOnMap.address,
                latLng: GEO_DATA && GEO_DATA.latLng ? GEO_DATA.latLng : sideWays_DATA.clickOnMap.latLng ? sideWays_DATA.clickOnMap.latLng : []
            },
        };
        return UPDATE_OBJECT_NEW_LOCATION;

    } else if (!location_DATA.endPoints.address) {
        const UPDATE_OBJECT_NEW_LOCATION = {
            ...location_DATA,
            endPoints: {
                address: GEO_DATA && GEO_DATA.address ? GEO_DATA.address : sideWays_DATA.clickOnMap.address,
                latLng: GEO_DATA && GEO_DATA.latLng ? GEO_DATA.latLng : sideWays_DATA.clickOnMap.latLng ? sideWays_DATA.clickOnMap.latLng : []
            },
        };
        return UPDATE_OBJECT_NEW_LOCATION;

    } else {

        const COORDINATE_AND_ADDRESS = {
            identObject: input_ident !== undefined ? input_ident : location_DATA.arrayALL_coordinate.length,  //pridanie kluca ident pre priradenie objektu ku inputu.("nuitne pre prepis")
            address: GEO_DATA && GEO_DATA.address ? GEO_DATA.address : sideWays_DATA.clickOnMap.address,
            latLng: GEO_DATA && GEO_DATA.latLng ? GEO_DATA.latLng : sideWays_DATA.clickOnMap.latLng ? sideWays_DATA.clickOnMap.latLng : []
        };
        console.log(COORDINATE_AND_ADDRESS);

        // Zistíme, či objekt už existuje v poli
        const index = location_DATA.arrayALL_coordinate.findIndex(item => {
            return (
                item.identObject === COORDINATE_AND_ADDRESS.identObject ||
                item.address === COORDINATE_AND_ADDRESS.address ||
                item.latLng[0] === COORDINATE_AND_ADDRESS.latLng[0] ||
                item.latLng[1] === COORDINATE_AND_ADDRESS.latLng[1]
            );
        });
        // Ak objekt neexistuje, pridáme ho do poľa
        if (index === -1) {
            const newArrayALLCoordinate = [
                ...location_DATA.arrayALL_coordinate,
                COORDINATE_AND_ADDRESS
            ];
            return { ...location_DATA, arrayALL_coordinate: newArrayALLCoordinate };
        } else {
            // Ak objekt existuje, nahradíme ho novým objektom na rovnakom mieste
            const newArrayALLCoordinate = [...location_DATA.arrayALL_coordinate];
            newArrayALLCoordinate[index] = COORDINATE_AND_ADDRESS;
            console.log(location_DATA.arrayALL_coordinate);

            return { ...location_DATA, arrayALL_coordinate: newArrayALLCoordinate };
        }

    }
};

export default services_SetStart_End_Add_positionToObjekt;


