
export type Type_forSearchAPI_Circle = {
    coordinate_point: number[],
    area: string,
    max_matches: string,
    ambiguities: "Ignore" | "Allow",
    POI_code: number
};

export type Type_SearchResponse_Circle = {
    distanceUnit: string;
    distance: number;
    name: string;

    resultNumber: number;
    fields: {
        mqap_id: string;
        country: string;
        address: string;
        lng: number;
        lat: number;
        city: string;
        group_sic_code_name_ext: string;
        group_sic_code: string;
        side_of_street: string;
        disp_lng: number;
        phone: string;
        group_sic_code_ext: string;
        group_sic_code_name: string;
        name: string;
        disp_lat: number;
        state: string;
        id: string;
        postal_code: string;
    
    };
};

