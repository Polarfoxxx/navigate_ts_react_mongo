
import { Type_incident, Type_forLocation_markerPopupt, Type_MapBussines_Category, Type_OnClick_object } from "../../../../Container";


type Type_forServices_typeClose_popup = {
    TYPE_CLOSE_POPUP: string
    incident: Type_incident,
    location_markerPopupt: Type_forLocation_markerPopupt
    mapBussines_Category: Type_MapBussines_Category;
    clickOnMap: Type_OnClick_object
};


function services_typeClose_popup({
    TYPE_CLOSE_POPUP,
    incident,
    location_markerPopupt,
    mapBussines_Category,
    clickOnMap
}: Type_forServices_typeClose_popup): { type: string, newData: any } {

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
                    status: true,
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
                newData: null
            };
    };
};


export default services_typeClose_popup;