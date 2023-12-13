import { Type_location_DATA } from "../../../Container";

function services_LocationNamePartitionForLoadingTheImage(location_DATA: Type_location_DATA): string {

    const LOCATION_NAME = location_DATA.endPoints.address || location_DATA.startPoints.address;
    const PARTS = LOCATION_NAME.split(",");
const PARTS_LENGTH = PARTS.length;
if(PARTS_LENGTH > 2) {
    const NAME_FOR_IMAGE = PARTS[PARTS.length - (PARTS_LENGTH - 1)].trim();
        return NAME_FOR_IMAGE;
} return LOCATION_NAME;
};

export default services_LocationNamePartitionForLoadingTheImage;