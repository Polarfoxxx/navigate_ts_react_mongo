
export type Type_CSS_navyButton = {
    navy_ON: React.CSSProperties,
    navy_OFF: React.CSSProperties,
};
export type Type_forGeocoderInput = {
    input_ident: string | number,
    input_value?: string
};

export type Type_State_ControlnputsSearche = {
    query: string,
    results: string[],
    isResultsOpen: boolean,
};

export type Type_Action_ControlnputsSearche =
    | { type: 'SET_QUERY'; payload: string }
    | { type: 'SET_RESULT'; payload: string[] }
    | { type: 'SET_RESULT_OPEN'; payload: boolean };


