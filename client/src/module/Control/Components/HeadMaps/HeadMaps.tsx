import React from "react";
import { Container } from "../../../Container";
import "./headMaps.style.css"
import { Type_Action_HeadMaps, Type_State_HeadMaps } from "./type";
import { UseChangeContextDATA } from "../../../hooks";
import { DEFAULT_VALUE_FOR_REDUCER } from "./default_Value";
import clsx from "clsx";

/* useReducer ----------------------------*/
const reducer = (state: Type_State_HeadMaps, action: Type_Action_HeadMaps) => {
    switch (action.type) {
        case "START_POINTS_NAME":
            return { ...state, start_point: action.payload };
        case "END_POINTS_NAME":
            return { ...state, end_point: action.payload };
        case "POI_CATEGORY":
            return { ...state, typePOI_category: action.payload };
        default:
            return state;
    };
};
/* useReducer ----------------------------*/

function HeadMaps(): JSX.Element {
    const { location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, intermediatePoints } = location_DATA;
    const { incident, traffic } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA();
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER);

    /* nastavenie nazvov miest do headeru */
    React.useEffect(() => {
        dispatch({ type: "START_POINTS_NAME", payload: startPoints.address.label });
        dispatch({ type: "END_POINTS_NAME", payload: endPoints.address.label });
    }, [startPoints.address.label, endPoints.address.label]);

    /* incidenty */
    const handleClickIncidents = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        const UPDATE_DATA = {
            ...incident,
            status: !incident.status
        }
        updateContext_DATA([{ newData: UPDATE_DATA, key: "incident" }]);
    };

    /* traffic */
    const handleClickTraffic = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        updateContext_DATA([{ newData: !traffic, key: "traffic" }]);
    };

    return (
        <div className="headerLocName">
            <div className="headarLocName_Box">
                <div className={clsx(state.start_point && 'startEndLocationActive', 'startEndLocation')}>
                    <h3>{state.start_point}</h3>
                </div>
                <div className="addedLocation">
                    {
                        intermediatePoints.map((item, key) =>
                            <div
                                className="addLocation_item"
                                key={key}>
                                <h4>{key + 1}. - {item.address.label}</h4>
                            </div>
                        )
                    }
                </div>
                <div className={clsx(state.end_point && "startEndLocationActive", "startEndLocation")}>
                    <h3>{state.end_point}</h3>
                </div>
            </div>
            <div className="headerButtonBox">
                <div className="buttonContent">
                    <div className="incidentsButton">
                        <button
                            className={clsx(sideWays_DATA.incident.status && "onActiveButtom", "offActiveButtom")}
                            onClick={handleClickIncidents}>
                            Incidents
                        </button>
                        <button
                            className={clsx(sideWays_DATA.traffic && "onActiveButtom", "offActiveButtom")}
                            onClick={handleClickTraffic}>
                            Traffic
                        </button>
                        <div className="incidentsButton_INFO_PANEL">
                            <p><span>Incident</span> and <span>traffic</span> function
                                works if zoom level is greater than <span>13</span>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadMaps;