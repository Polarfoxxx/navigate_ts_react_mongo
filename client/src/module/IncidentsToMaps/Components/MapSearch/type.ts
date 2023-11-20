/* typ posielany do API */
export type Type_forSearchAPI_Circle = {
    coordinate_point: number[],
    area: string,
    max_matches: string,
    ambiguities: "Ignore" | "Allow",
    POI_code: number
};

