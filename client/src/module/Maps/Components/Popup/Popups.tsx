import React from "react";
import "./popups.style.css";
import { Popup } from "react-leaflet";
import { Container } from "../../../Container";
import { LatLngExpression } from "leaflet"
import { OnClickMapContent, OnClickIncidentContent } from "../../../Control";

function Popups(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { clickOnMap, popupStatus, incident } = sideWays_DATA;
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
        if (incident.dataInc?.location) {
            setPopupPosition(incident.dataInc?.location);
            setContent(<OnClickIncidentContent />)
        };
    }, [incident.dataInc?.location]);

    return (
        <>
            {
                popupPosition && popupStatus &&
                <Popup position={popupPosition}>
                    {content}
                </Popup>
            }
        </>
    );
};


export default Popups;