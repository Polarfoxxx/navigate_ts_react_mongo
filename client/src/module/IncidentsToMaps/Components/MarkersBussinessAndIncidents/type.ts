
export type Type_forMarkersBussinessAndIncidents<T> = {
    type: string;
    position: L.LatLngExpression,
    icon?: L.Icon<L.IconOptions>,
    data: T
};
