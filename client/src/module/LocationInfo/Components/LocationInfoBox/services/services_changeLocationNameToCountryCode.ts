import { Type_location_DATA } from "../../../../Container";
import lookup from  'country-code-lookup';

function services_changeLocationNameToCountryCode(location_DATA: Type_location_DATA): lookup.SearchOutput {
    const LOCATION_NAME = location_DATA.endPoints.address || location_DATA.startPoints.address;
    const PARTS = LOCATION_NAME.split(",");
    const COUNTRY_NAME = PARTS[PARTS.length - 1].trim();
    const COUNTRY_INFO = lookup.byCountry(COUNTRY_NAME) 
    
    return COUNTRY_INFO;
};

export default services_changeLocationNameToCountryCode;