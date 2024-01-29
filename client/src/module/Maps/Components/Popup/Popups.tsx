import React from "react";
import "./popups.style.css";
import { Popup } from "react-leaflet";
import { Container } from "../../../Container";
import { LatLngExpression } from "leaflet"
import { OnClickMapContent, OnClickIncidentContent, OnClickBussinesSearcheContent } from "../../../Control";
import { useMapEvents } from 'react-leaflet';
import { UseChangeContextDATA } from "../../../hooks";
import { useMap } from "react-leaflet";

function Popups(): JSX.Element {
    const MAP = useMap();
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { clickOnMap, popup_event, incident, mapBussines_Category, location_markerPopupt } = sideWays_DATA;
    const [popupPosition, setPopupPosition] = React.useState<LatLngExpression | null>(null);
    const [content, setContent] = React.useState<JSX.Element | null>(null);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    /* spustenie popup pre klik na mapu */
    React.useEffect(() => {
        if (clickOnMap && clickOnMap.latLng) {
            const CLICK_COORD = clickOnMap.latLng as LatLngExpression;
            setPopupPosition(CLICK_COORD);
            setContent(<OnClickMapContent />)
        };
    }, [clickOnMap.address]);

    /* spustenie popupu na location mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (location_markerPopupt && location_markerPopupt.location.lat) {
            console.log(location_markerPopupt);
            const LOCATION = [location_markerPopupt.location.lat + 0.0001, location_markerPopupt.location.lng] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContent(<OnClickMapContent />)

        };
    }, [location_markerPopupt.status]);


    /* spustenie popupu na incidents mararker */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (incident.dataInc_ForPopup?.lat) {
            const LOCATION = [incident.dataInc_ForPopup?.lat + 0.0001, incident.dataInc_ForPopup?.lng] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContent(<OnClickIncidentContent />)
        };
    }, [incident.dataInc_ForPopup?.lat]);


    /* zobrazenie pre busssines */
    /* navisenie 0.0001 je pre posunutie popup mimo marker  */
    React.useEffect(() => {
        if (mapBussines_Category.dataMapBussines_froPopup?.fields.mqap_geography.latLng.lat) {
            const LAT = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lat + 0.0001;
            const LNG = mapBussines_Category.dataMapBussines_froPopup.fields.mqap_geography.latLng.lng;
            const LOCATION = [LAT, LNG] as L.LatLngExpression
            setPopupPosition(LOCATION);
            setContent(<OnClickBussinesSearcheContent />)
        };
    }, [mapBussines_Category.dataMapBussines_froPopup?.distance]);




    React.useEffect(() => {
        const handlePopupClose = () => {
            console.log("close");
            
            const UPDATE_DATA = {
                status: false,
                location: {
                    lat: null,
                    lng: null
                }
            };
            updateContext_DATA([
                { newData: UPDATE_DATA, key: "location_markerPopupt" },
            ]);
        };

        MAP.on('popupclose', handlePopupClose);
        return () => {
            MAP.off('popupclose', handlePopupClose); // Odmazanie event listeneru pri odmontovaní komponentu
        };
    }, []);



    return (
        <>
            {
                popupPosition && popup_event &&
                <Popup
                    className={`my pop`}
                    position={popupPosition}>
                    {content}
                </Popup>
            }
        </>
    );
};


export default Popups;