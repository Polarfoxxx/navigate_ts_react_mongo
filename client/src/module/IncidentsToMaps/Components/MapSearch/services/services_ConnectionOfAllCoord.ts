
import { Type_ArrayALLRoute } from "../../../../Container";


function services_ConnectionOfAllCoord(main_atl_route: Type_ArrayALLRoute[]): string {
    const ALL_COORDINATE = main_atl_route.map(item => {
        return item.coordinates
    });
    const FLATTENED_DATA = ALL_COORDINATE.flat().map(point => `${point.lat},${point.lng}`).join(',');
    return FLATTENED_DATA
};

export default services_ConnectionOfAllCoord;