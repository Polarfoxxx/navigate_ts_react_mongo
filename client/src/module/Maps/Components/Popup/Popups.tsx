import React from "react";
import "./popups.style.css";
import { Popup } from "react-leaflet";
import { Container } from "../../../Container";
import { LatLngExpression } from "leaflet"
import { OnClickMapContent, OnClickIncidentContent, OnClickBussinesSearcheContent } from "../../../Control";

function Popups(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { clickOnMap, popup_event, incident, mapBussines_Category } = sideWays_DATA;
    const [popupPosition, setPopupPosition] = React.useState<LatLngExpression | null>(null)
    const [content, setContent] = React.useState<JSX.Element | null>(null)


    /* spustenie popup pre klik na mapu */
    React.useEffect(() => {
        if (clickOnMap && clickOnMap.latLng) {
            const RETYPINCOORD = clickOnMap.latLng as LatLngExpression;
            setPopupPosition(RETYPINCOORD);
            setContent(<OnClickMapContent />)
        };
    }, [clickOnMap.address]);


    /* spustenie popupu na incidents mararker */
    React.useEffect(() => {
        if (incident.dataInc_ForPopup?.lat) {
            const LOCATION = [incident.dataInc_ForPopup?.lat, incident.dataInc_ForPopup?.lng] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContent(<OnClickIncidentContent />)
        };
    }, [incident.dataInc_ForPopup?.lat]);


    /* zobrazenie pre busssines */
    React.useEffect(() => {
        if (mapBussines_Category.dataMapBussines_froPopup?.fields.mqap_geography.latLng.lat) {
            const LAT = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lat;
            const LNG = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lng;
            const LOCATION = [LAT, LNG] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContent(<OnClickBussinesSearcheContent />)
        };
    }, [mapBussines_Category.dataMapBussines_froPopup?.distance]);



    return (
        <>
            {
                popupPosition && popup_event &&
                <Popup position={popupPosition}>
                    {content}
                </Popup>
            }
        </>
    );
};


export default Popups;