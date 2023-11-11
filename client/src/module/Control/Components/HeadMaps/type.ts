
export type Type_typePOI_category = {
    typePOI: string,
    Restaur: boolean,
    Pubs: boolean,
    Shopping: boolean,
    Cafes: boolean,
    Bars: boolean,
};

export type Type_forStyle_startAndEnd_point = {
    on: React.CSSProperties,
    off: React.CSSProperties
};
export type Type_State_HeadMaps = {
    start_point: string;
    end_point: string;
    typePOI_category: Type_typePOI_category
};

export type Type_Action_HeadMaps =
    | { type: 'START_POINTS_NAME', payload: string } // Přidáno payload
    | { type: 'END_POINTS_NAME', payload: string } // Přidáno payload
    | { type: 'POI_CATEGORY', payload: Type_typePOI_category }; // Přidáno payload

