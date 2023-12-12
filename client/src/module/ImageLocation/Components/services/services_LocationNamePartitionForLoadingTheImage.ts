import { Type_location_DATA } from "../../../Container";

function services_LocationNamePartitionForLoadingTheImage(location_DATA: Type_location_DATA): string {

    const LOCATION_NAME = location_DATA.startPoints.address || location_DATA.startPoints.address;
    const PARTS = LOCATION_NAME.split(",");
    const NAME_FOR_IMAGE = PARTS[PARTS.length - 1].trim();

    return NAME_FOR_IMAGE;
};

export default services_LocationNamePartitionForLoadingTheImage;