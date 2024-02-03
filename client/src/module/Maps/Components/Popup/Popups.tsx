import React from "react";
import "./popups.style.css";
import { Popup, useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { LatLngExpression } from "leaflet"
import { OnClickMapContent, OnClickIncidentContent, OnClickBussinesSearcheContent, OnClickPositionContent } from "../../../Control";
import { UseChangeContextDATA } from "../../../hooks";
import services_typeClose_popup from "./services/services_typeClose_popup";

type Type_forContentAndIdent = {
    content: JSX.Element | undefined,
    identPopName: string
};

function Popups(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { clickOnMap, popup_event, incident, mapBussines_Category, location_markerPopupt } = sideWays_DATA;
    const [popupPosition, setPopupPosition] = React.useState<LatLngExpression | null>(null);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [contentAndIdent, setContentAndIdent] = React.useState<Type_forContentAndIdent>({
        content: undefined,
        identPopName: ""
    });


    /* spustenie popup pre klik na mapu */
    React.useEffect(() => {
        if (clickOnMap && clickOnMap.latLng) {
            const CLICK_COORD = clickOnMap.latLng as LatLngExpression;
            setPopupPosition(CLICK_COORD);
            setContentAndIdent({
                content: <OnClickMapContent />,
                identPopName: "clickOnMap"
            });
        };
    }, [clickOnMap.address]);

    /* spustenie popupu na location mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (location_markerPopupt.location.lat && location_markerPopupt.popupStatus) {
            console.log(location_markerPopupt.data.ident);
            const LOCATION = [location_markerPopupt.location.lat + 0.0001, location_markerPopupt.location.lng] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContentAndIdent({
                content: <OnClickPositionContent />,
                identPopName: "location_markerPopupt"
            });
        };
    }, [location_markerPopupt.location.lat, location_markerPopupt.popupStatus]);

    /* spustenie popupu na incidents mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (incident.dataInc_ForPopup?.lat && incident.popupStatus) {
            const LOCATION = [incident.dataInc_ForPopup?.lat + 0.0001, incident.dataInc_ForPopup?.lng] as L.LatLngExpression
            console.log(LOCATION);
            setPopupPosition(LOCATION);
            setContentAndIdent({
                content: <OnClickIncidentContent />,
                identPopName: "incident"
            });
        };
    }, [incident.popupStatus, incident.dataInc_ForPopup?.lat]);

    /* zobrazenie pre busssines */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (mapBussines_Category.dataMapBussines_froPopup?.fields.mqap_geography.latLng.lat && mapBussines_Category.popupStatus) {
            const LAT = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lat + 0.0001;
            const LNG = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lng;
            const LOCATION = [LAT, LNG] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContentAndIdent({
                content: <OnClickBussinesSearcheContent />,
                identPopName: "mapBussines_Category"
            });
        };
    }, [mapBussines_Category.dataMapBussines_froPopup?.fields.mqap_geography.latLng.lat, mapBussines_Category.popupStatus]);


    /* clear statusu pri zatvoreni popup */
    const handleClosePupup = (e: React.MouseEvent<HTMLButtonElement>) => {
        MAP && MAP.closePopup();
    };

    /* zachytenie aktualneho popup nazvu a pri zatvoreni zmeneni typ objektu */
    React.useEffect(() => {
        const handlePopupClose = () => {
            const TYPE_CLOSE_POPUP = contentAndIdent.identPopName;
            if (TYPE_CLOSE_POPUP) {
                const { type, newData } = services_typeClose_popup({ TYPE_CLOSE_POPUP, incident, location_markerPopupt, mapBussines_Category, clickOnMap })
                type && updateContext_DATA([
                    { newData: newData, key: type },
                ]);
            };
        };
        MAP.on('popupclose', handlePopupClose);
        return () => {
            MAP.off('popupclose', handlePopupClose);
        };
    }, [contentAndIdent.identPopName, incident, location_markerPopupt, mapBussines_Category, clickOnMap ]);


    return (
        <>
            {
                popupPosition && popup_event &&
                <Popup
                    closeButton={false}
                    className={contentAndIdent.identPopName}
                    position={popupPosition}>
                    <div className="popupContent">
                        <div className="pupupButtonBox">
                            <button
                                className={contentAndIdent.identPopName}
                                onClick={(e) => handleClosePupup(e)}>
                                Close
                            </button>
                        </div>
                        <div className="pupupContentBox">
                            {contentAndIdent.content}
                        </div>
                    </div>

                </Popup>
            }
        </>
    );

};


export default Popups;



