import { Type_location_DATA } from "../../../Container";
import { TypeFor_services_setALL_location } from "../types";


export default function services_setALL_location({
    location_DATA,
    GEO_DATA,
    input_ident
}: TypeFor_services_setALL_location): Type_location_DATA {

    if (input_ident === "start_point") {
        const UPDATE_OBJECT_NEW_LOCATION = {
            ...location_DATA,
            startPoints: {
                address: GEO_DATA.address,
                latLng: GEO_DATA.latLng
            },
        };
        return UPDATE_OBJECT_NEW_LOCATION;

    } else if (input_ident === "end_point") {
        const UPDATE_OBJECT_NEW_LOCATION = {
            ...location_DATA,
            endPoints: {
                address: GEO_DATA.address,
                latLng: GEO_DATA.latLng
            },
        };
        return UPDATE_OBJECT_NEW_LOCATION;
    } else {


        const COORDINATE_AND_ADDRESS = {
            address: GEO_DATA.address,
            latLng: GEO_DATA.latLng
        };
        console.log(location_DATA.arrayALL_coordinate);
        
        // Zistíme, či objekt už existuje v poli
        const index = location_DATA.arrayALL_coordinate.findIndex(item => {
            return (
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
        
            return { ...location_DATA, arrayALL_coordinate: newArrayALLCoordinate };
        }
    }
};



