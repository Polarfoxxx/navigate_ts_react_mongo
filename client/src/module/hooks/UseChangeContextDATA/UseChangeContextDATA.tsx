import React from "react";
import {
    Type_ForUseChangeContextDATA_returning,
    Type_updateContext_DATA
} from "./types";
import {
    Type_forLocation_markerPopupt,
    Type_MapBussines_Category,
    Type_incident,
    Type_sideWays_DATA,
    Type_forTraficDATA,
    TypeStartAndEndPoint, Type_forRouteChange,
    Type_location_DATA,
    Type_OnClick_object,
    Container,
    DEFAULT_VALUE_MAP_BUSSINES,
    DEFAULT_VALUE_MAP_CURRENT_INFO,
    DEFAULT_VALUE_MAP_INCIDENT,
    DEFAULT_VALUE_LOCATION_MARKER_POPUP,
    DEFAULT_VALUE_POSITION,
    DEFAULT_VALUE_CHANGE_ROUTE,
} from "../../Container";

type Type_for_KEY_MAP =
    TypeStartAndEndPoint |
    Type_forRouteChange |
     [] | 
     Type_OnClick_object |
    boolean |
    L.LatLngExpression |
    null |
    Type_forTraficDATA |
    Type_incident |
    Type_MapBussines_Category |
    Type_forLocation_markerPopupt


function UseChangeContextDATA(): Type_ForUseChangeContextDATA_returning {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);


    function updateContext_DATA(props: Type_updateContext_DATA[]): void {

        props.forEach((item: Type_updateContext_DATA) => {
            if (item.newData !== "default") {
                /* kompletne prepisanie celych objektov */
                if (location_DATA && setLocation_DATA && item.key === "location_DATA") {
                    setLocation_DATA(item.newData);
                    return
                } else if (sideWays_DATA && setSideWays_DATA && item.key === "sideWays_DATA") {
                    setSideWays_DATA(item.newData);
                    return
                }
                /* jednotlive kluce  */
                if (location_DATA && setLocation_DATA && item.key in location_DATA) {
                    setLocation_DATA(prew => ({
                        ...prew,
                        [item.key]: item.newData
                    }));
                } else if (sideWays_DATA && setSideWays_DATA && item.key in sideWays_DATA) {
                    setSideWays_DATA(prew => ({
                        ...prew,
                        [item.key]: item.newData
                    }))
                } else
                    alert(`key is not exiting ${item.key}`);



            } else if (item.newData === "default") {

                const KEY_MAP: Partial<Record<keyof Type_location_DATA & keyof Type_sideWays_DATA, Type_for_KEY_MAP>> = {
                    "startPoints": DEFAULT_VALUE_POSITION,
                    "endPoints": DEFAULT_VALUE_POSITION,
                    "intermediatePoints": [],
                    "main_atl_route": [],
                    "changeRoutes": DEFAULT_VALUE_CHANGE_ROUTE,
                    "clickOnMap": DEFAULT_VALUE_POSITION,
                    "traffic": false,
                    "popup_event": false,
                    "markerInTheRoute": null,
                    "mapsCurrentInfo": DEFAULT_VALUE_MAP_CURRENT_INFO,
                    "incident": DEFAULT_VALUE_MAP_INCIDENT,
                    "mapBussines_Category": DEFAULT_VALUE_MAP_BUSSINES,
                    "location_markerPopupt": DEFAULT_VALUE_LOCATION_MARKER_POPUP
                };

                if (location_DATA && setLocation_DATA && item.key in location_DATA) {
                    const KEY = item.key as keyof typeof KEY_MAP; // type assertion
                    setLocation_DATA({
                        ...location_DATA,
                        [KEY]: KEY_MAP[KEY]
                    });
                } else if (sideWays_DATA && setSideWays_DATA && item.key in sideWays_DATA) {
                    const KEY = item.key as keyof typeof KEY_MAP; // type assertion
                    setSideWays_DATA({
                        ...sideWays_DATA,
                        [KEY]: KEY_MAP[KEY]
                    });
                };
            };
        });
    };

    return {
        updateContext_DATA
    };
};


export default UseChangeContextDATA;
