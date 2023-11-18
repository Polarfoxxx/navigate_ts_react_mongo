
import { Type_RAW_OnePoint_response_bussiness, Type_RAW_route_response_bussiness } from "../types";

type TypeConnection_ROUTE_ONEPOINT = Type_RAW_OnePoint_response_bussiness & Type_RAW_route_response_bussiness
type Type_for_services_setResponseDATA<T> = {
    RESPO_DATA: T[]
};

function services_setResponseDATA<T extends TypeConnection_ROUTE_ONEPOINT, K>({ RESPO_DATA }: Type_for_services_setResponseDATA<T>): K[] {

    const RESPO_CIRLCLE_DATA = RESPO_DATA.map((item) => {
        return {
            distanceUnit: item.distanceUnit,
            distance: item.distance,
            name: item.name,
            resultNumber: item.resultNumber,
            fields: {
                mqap_id: item.fields.mqap_id,
                country: item.fields.country,
                address: item.fields.address,
                lng: item.fields.lng,
                lat: item.fields.lat,
                city: item.fields.city,
                group_sic_code_name_ext: item.fields.group_sic_code_name_ext,
                group_sic_code: item.fields.group_sic_code,
                side_of_street: item.fields.side_of_street,
                disp_lng: item.fields.disp_lng,
                phone: item.fields.phone,
                group_sic_code_ext: item.fields.group_sic_code_ext,
                group_sic_code_name: item.fields.group_sic_code_name,
                name: item.fields.name,
                disp_lat: item.fields.disp_lat,
                state: item.fields.state,
                id: item.fields.id,
                postal_code: item.fields.postal_code,
            },
        };
    }) as K[];

    return RESPO_CIRLCLE_DATA

}

export default services_setResponseDATA;