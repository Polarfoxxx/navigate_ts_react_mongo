import { Type_forServices_typeClose_popup } from "./types";


function services_typeClose_popup<T, K, A, X>({
    TYPE_CLOSE_POPUP,
    incident,
    location_markerPopupt,
    mapBussines_Category,
    clickOnMap
}: Type_forServices_typeClose_popup<T, K, A, X>): { type: string, newData: T | K | A | X | undefined } {

    switch (TYPE_CLOSE_POPUP) {
        case "clickOnMap":
            return {
                type: "",
                newData: {
                    ...clickOnMap,
                    latLng: undefined
                }
            };
        case "incident":
            return {
                type: "incident",
                newData: {
                    ...incident,
                    popupStatus: false
                }
            };
        case "location_markerPopupt":
            return {
                type: "location_markerPopupt",
                newData: {
                    ...location_markerPopupt,
                    popupStatus: false
                }
            };
        case "mapBussines_Category":
            return {
                type: "mapBussines_Category",
                newData: {
                    ...mapBussines_Category,
                    popupStatus: false
                }
            };
        default:
            return {
                type: "",
                newData: undefined
            };
    };
};


export default services_typeClose_popup;