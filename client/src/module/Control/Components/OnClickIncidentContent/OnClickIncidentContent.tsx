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
        if (incident.dataInc) {
            const UPDATE_INC: Type_IncidentDATA_forMarker = {
                id: incident.dataInc.id,
                type: incident.dataInc.type,
                location: incident.dataInc.location,
                icon: incident.dataInc.icon,
                startTime: incident.dataInc.startTime,
                endTime: incident.dataInc.endTime,
                shortDesc: incident.dataInc.startTime,
                fullDesc: incident.dataInc.fullDesc,
                distance: incident.dataInc.distance,
                severity: incident.dataInc.severity,
                impacting: incident.dataInc.impacting,
                iconURL: incident.dataInc.iconURL,
                lat: incident.dataInc.lat,
                lng: incident.dataInc.lng,
            };
            setInc_DATA(UPDATE_INC)
        }

    }, [incident.dataInc?.id])


    React.useEffect(() => {
        if (incident.dataInc?.lat && incident.dataInc?.lng) {
            incidentPopup([incident.dataInc.lat, incident.dataInc.lng])
        };
    }, [incident.dataInc?.id]);

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