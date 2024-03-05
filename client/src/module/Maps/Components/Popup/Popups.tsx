import React from "react";
import "./popups.style.css";
import { Popup, useMap } from "react-leaflet";
import { Container } from "../../../Container";
import { LatLngExpression } from "leaflet"
import { OnClickMapContent, OnClickIncidentContent, OnClickBussinesSearcheContent, OnClickPositionContent } from "../../../Control";
import { UseChangeContextDATA } from "../../../hooks";
import services_typeClose_popup from "./services/services_typeClose_popup";
import { Type_forPopupLoc_Cont_Ident } from "./types";


function Popups(): JSX.Element {
    const MAP = useMap();
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { clickOnMap, popup_event, incident, mapBussines_Category, location_markerPopupt } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA();
    const [popupLoc_Cont_Ident, setPopupLoc_Cont_Ident] = React.useState<Type_forPopupLoc_Cont_Ident>({
        content: undefined,
        identPopName: "",
        location: null
    });


    /* spustenie popup pre klik na mapu */
    React.useEffect(() => {
        if (clickOnMap.address.label && clickOnMap.latLng) {
            const CLICK_COORD = clickOnMap.latLng as LatLngExpression;
            setPopupLoc_Cont_Ident({
                content: <OnClickMapContent />,
                identPopName: "clickOnMap",
                location: CLICK_COORD
            });
        };
    }, [clickOnMap.address]);

    /* spustenie popupu na location mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (location_markerPopupt.location.lat && location_markerPopupt.popupStatus) {
            const LOCATION = [location_markerPopupt.location.lat + 0.0001, location_markerPopupt.location.lng] as L.LatLngExpression
            setPopupLoc_Cont_Ident({
                content: <OnClickPositionContent />,
                identPopName: "location_markerPopupt",
                location: LOCATION
            });
        };
    }, [location_markerPopupt.location.lat, location_markerPopupt.popupStatus]);

    /* spustenie popupu na incidents mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (incident.dataInc_ForPopup?.lat && incident.popupStatus) {
            const LOCATION = [incident.dataInc_ForPopup?.lat + 0.0001, incident.dataInc_ForPopup?.lng] as L.LatLngExpression
            setPopupLoc_Cont_Ident({
                content: <OnClickIncidentContent />,
                identPopName: "incident",
                location: LOCATION
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
            setPopupLoc_Cont_Ident({
                content: <OnClickBussinesSearcheContent />,
                identPopName: "mapBussines_Category",
                location: LOCATION
            });
        };
    }, [mapBussines_Category.dataMapBussines_froPopup?.fields.lat, mapBussines_Category.popupStatus]);


    /* clear statusu pri zatvoreni popup */
    const handleClosePupup = (e: React.MouseEvent<HTMLButtonElement>) => {
        MAP && MAP.closePopup();
    };

    /* zachytenie aktualneho popup nazvu a pri zatvoreni zmeneni typ objektu */
    React.useEffect(() => {
        const popupClose = () => {
            const TYPE_CLOSE_POPUP = popupLoc_Cont_Ident.identPopName;

            if (TYPE_CLOSE_POPUP) {
                const { type, newData } = services_typeClose_popup({ TYPE_CLOSE_POPUP, incident, location_markerPopupt, mapBussines_Category, clickOnMap })
                type && updateContext_DATA([
                    { newData: newData, key: type },
                ]);
            };
        };
        MAP.on('popupclose', popupClose);
        return () => {
            MAP.off('popupclose', popupClose);
        };
    }, [popupLoc_Cont_Ident.identPopName, incident, location_markerPopupt, mapBussines_Category, clickOnMap]);


    return (
        <>
            {
                popupLoc_Cont_Ident.location && popup_event &&
                <Popup
                    closeButton={false}
                    position={popupLoc_Cont_Ident.location}>
                    <div className="popupContent">
                        <div className="pupupButtonBox">
                            <button
                                className={popupLoc_Cont_Ident.identPopName}
                                onClick={(e) => handleClosePupup(e)}>
                                Close
                            </button>
                        </div>
                        <div className="pupupContentBox">
                            {popupLoc_Cont_Ident.content}
                        </div>
                    </div>

                </Popup>
            }
        </>
    );

};


export default Popups;



