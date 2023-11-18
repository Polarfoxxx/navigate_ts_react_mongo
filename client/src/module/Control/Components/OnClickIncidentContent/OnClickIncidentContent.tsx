import React from "react";
import "./onClickIncidentContent.style.css";
import { Container, Type_IncidentDATA_forMarker } from "../../../Container";
import { geocoder_coordSearche } from "../../../Geocoder";
import { Type_returning_object } from "../../../Geocoder/utils/geocoder_coordSearche/types";
import { DEFAULT_VALUE_FOR_INC_DATA, DEFAULT_VALUE_FOR_GEOCODER } from "./defaultValue";


function OnClickIncidentContent(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { incident } = sideWays_DATA;
    const [geocoder, setGeocoder] = React.useState<Type_returning_object>(DEFAULT_VALUE_FOR_GEOCODER);
    const [inc_DATA, setInc_DATA] = React.useState<Type_IncidentDATA_forMarker>(DEFAULT_VALUE_FOR_INC_DATA);

    React.useEffect(() => {
        if (incident.dataInc_ForPopup) {
            const UPDATE_INC: Type_IncidentDATA_forMarker = {
                id: incident.dataInc_ForPopup.id,
                type: incident.dataInc_ForPopup.type,
                location: incident.dataInc_ForPopup.location,
                icon: incident.dataInc_ForPopup.icon,
                startTime: incident.dataInc_ForPopup.startTime,
                endTime: incident.dataInc_ForPopup.endTime,
                shortDesc: incident.dataInc_ForPopup.startTime,
                fullDesc: incident.dataInc_ForPopup.fullDesc,
                distance: incident.dataInc_ForPopup.distance,
                severity: incident.dataInc_ForPopup.severity,
                impacting: incident.dataInc_ForPopup.impacting,
                iconURL: incident.dataInc_ForPopup.iconURL,
                lat: incident.dataInc_ForPopup.lat,
                lng: incident.dataInc_ForPopup.lng,
            };
            setInc_DATA(UPDATE_INC)
        }

    }, [incident.dataInc_ForPopup?.id])


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
        <div className="incident_content">
            <div className="inc_cont_header">
                <div className="imgIncBox">
                    <img src="{inc_DATA.iconURL}" alt="Icon" />
                </div>
                <div className="startIncBox">
                    <div className="startIncBox incBox">Start incinet</div>
                    <div>{inc_DATA.startTime}</div>
                </div>
                <div className="endIncBox">
                    <div className="startIncBox incBox">End incinet</div>
                    <div>{inc_DATA.endTime}</div>
                </div>
            </div>
            <div className="inc_cont_body">
                <div className="inc_desc ">
                    <div className="block_title">Incident details:</div>
                    <div>{inc_DATA.fullDesc}</div>
                    <div>{inc_DATA.shortDesc}</div>
                </div>
                <div className="inc_severity">
                    <div className="block_title">Incident details:</div>
                    <div>{inc_DATA.severity}</div>
                    <div>{inc_DATA.impacting}</div>
                </div>
                <div className="inc_location">
                    <div className="block_title">Location:</div>
                    <div>{geocoder.address}</div>
                </div>
            </div>
        </div>

    )
};

export default OnClickIncidentContent 