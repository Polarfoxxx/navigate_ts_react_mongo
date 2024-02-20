import { Type_location_DATA } from "../../../Container";


function services_changeLocationForImage(location_DATA: Type_location_DATA): string {
    const Location_Name = location_DATA.endPoints.address.town || location_DATA.startPoints.address.town
    return Location_Name;
};

export default services_changeLocationForImage;