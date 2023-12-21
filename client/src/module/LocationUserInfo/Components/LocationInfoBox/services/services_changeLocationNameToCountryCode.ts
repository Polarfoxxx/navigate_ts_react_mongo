import { Type_location_DATA } from '../../../../Container';
import lookup from  'country-code-lookup';

function services_changeLocationNameToCountryCode(location_DATA: Type_location_DATA): lookup.SearchOutput {
    const LOCATION_NAME = location_DATA.endPoints.address.county || location_DATA.startPoints.address.country;
    const COUNTRY_INFO = lookup.byCountry(LOCATION_NAME) 
    return COUNTRY_INFO;
};

export default services_changeLocationNameToCountryCode;