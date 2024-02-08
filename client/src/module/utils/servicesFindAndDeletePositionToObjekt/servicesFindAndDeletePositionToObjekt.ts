import { DEFAULT_VALUE_ADDRESS } from "../../Container";

type Type_forServicesFindAndDeletePositionToObjekt<T, A, X> = {
    startPoints: T
    endPoints: A
    intermediatePoints: X[]
    DELETE_POINT: string
};

function servicesFindAndDeletePositionToObjekt<T, A, X>(
    props: Type_forServicesFindAndDeletePositionToObjekt<T, A, X>
): { type: string, newData: T | A | X[] } {

    const IDENT_POINT = props.DELETE_POINT;

    if (typeof IDENT_POINT === "string") {
        return {
            type: IDENT_POINT,
            newData: {
                ...props.startPoints || props.endPoints,
                address: DEFAULT_VALUE_ADDRESS,
                latLng: [],
            }
        }
    } else {
        const INERMEDIATE_ARRAY = props.intermediatePoints;
        INERMEDIATE_ARRAY.splice(IDENT_POINT - 1, 1);
        return {
            type: "",
            newData: [...INERMEDIATE_ARRAY]
        }
    };
};

export default servicesFindAndDeletePositionToObjekt;