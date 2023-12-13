import React from "react";
import "./onClickIncidentContent.style.css";
import { Container, Type_IncidentDATA_forMarker } from "../../../../Container";
import { geocoder_coordSearche } from "../../../../Geocoder";
import { Type_returning_object } from "../../../../Geocoder/utils/geocoder_coordSearche/types";
import { DEFAULT_VALUE_FOR_INC_DATA, DEFAULT_VALUE_FOR_GEOCODER } from "./defaultValue";
import { Rating } from 'react-simple-star-rating'



function OnClickIncidentContent(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { incident } = sideWays_DATA;
    const [geocoder, setGeocoder] = React.useState<Type_returning_object>(DEFAULT_VALUE_FOR_GEOCODER);
    const [inc_DATA, setInc_DATA] = React.useState<Type_IncidentDATA_forMarker>(DEFAULT_VALUE_FOR_INC_DATA);

    React.useEffect(() => {
        if (incident.dataInc_ForPopup) {
            setInc_DATA(incident.dataInc_ForPopup)
        };
    }, [incident.dataInc_ForPopup?.id])


    /* geocodovanie lokacie na nazov */
    React.useEffect(() => {
        if (incident.dataInc_ForPopup?.lat && incident.dataInc_ForPopup?.lng) {
            incidentPopup([incident.dataInc_ForPopup.lat, incident.dataInc_ForPopup.lng])
        };
    }, [incident.dataInc_ForPopup?.id]);

    async function incidentPopup(coord: number[]) {
        if (incident) {
            try {
                const data = await geocoder_coordSearche([coord[0], coord[1]]);
                setGeocoder(data)

            } catch (error) {
                console.error(error);
            };
        };
    };


    return (
        <div className="incident_contentsBox">
            <div className="inc_cont_header">
                <div className="imgIncBox">
                    <img src={`${inc_DATA.iconURL}`} alt="Icon" />
                </div>
                <div className="startIncBox">
                    <div className="startIncBox incBox">Start incinet</div>
                    <div className="IncBoxValue">{inc_DATA.startTime}</div>
                </div>
                <div className="endIncBox">
                    <div className="startIncBox incBox">End incinet</div>
                    <div className="IncBoxValue">{inc_DATA.endTime}</div>
                </div>
            </div>
            <div className="inc_cont_body">
                <div className="inc_desc ">
                    <div className="block_title">Incident details:</div>
                    <div>{inc_DATA.fullDesc}</div>
                    <div>{inc_DATA.shortDesc}</div>
                    <div className="ImportanceBox">
                        <div className="block_title">Importance:</div>
                        <div>
                            <Rating
                                fillColor={"rgb(221, 0, 0)"}
                                readonly={true}
                                initialValue={inc_DATA.severity}
                                iconsCount={4} />
                        </div>
                    </div>
                    <div>{inc_DATA.impacting ? "Closed" : "Open"}</div>
                </div>
                <div className="inc_location">
                    <div className="block_title">Location:</div>
                    <div>{geocoder.address.label}</div>
                </div>
            </div>
        </div>

    )
};

export default OnClickIncidentContent 