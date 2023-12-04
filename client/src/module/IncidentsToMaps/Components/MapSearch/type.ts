
/* typ posielany do API */
export type Type_forSearchAPI_Circle = {
    coordinate_point: number[],
    area: string,
    max_matches: string,
    ambiguities: "Ignore" | "Allow",
    SIC_CODE: number
};


export type Type_forSearchAPI_Corridor = {
    coordinateALLpoints: string;
    max_matches: string;
    ambiguities: "Ignore" | "Allow";
    SIC_CODE: number;
    width: string;
    buff_width: string;
};

