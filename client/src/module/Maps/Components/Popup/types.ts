import { LatLngExpression } from "leaflet";

export type Type_PopupComponent = {
    location?: LatLngExpression
};

export type Type_forPopupLoc_Cont_Ident = {
    content: JSX.Element | undefined,
    identPopName: string,
    location: LatLngExpression | null
};
