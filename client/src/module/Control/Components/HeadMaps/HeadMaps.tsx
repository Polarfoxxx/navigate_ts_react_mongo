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
        case 'START_POINTS_NAME':
            return { ...state, start_point: action.payload };
        case 'END_POINTS_NAME':
            return { ...state, end_point: action.payload };
        case 'POI_CATEGORY':
            return { ...state, typePOI_category: action.payload };
        default:
            return state;
    }
};
/* useReducer ----------------------------*/

function HeadMaps(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const { incident, traffic, mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER);

    React.useEffect(() => {
        dispatch({ type: "START_POINTS_NAME", payload: startPoints.address });
        dispatch({ type: "END_POINTS_NAME", payload: endPoints.address });
    }, [startPoints.address, endPoints.address]);

    const handleClickIncidents = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        const UPDATE_DATA = {
            ...incident,
            status: !incident.status
        }
        updateContext_DATA([{ newData: UPDATE_DATA, key: "incident" }]);
    };

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
                        arrayALL_coordinate.map((item, key) =>
                            <div
                                className="addLocation_item"
                                key={key}>
                                <h4>- {item.address}</h4>
                            </div>
                        )
                    }
                </div>
                <div className={clsx(state.end_point && 'startEndLocationActive', 'startEndLocation')}>
                    <h3>{state.end_point}</h3>
                </div>
            </div>
            <div className="headerButtonBox">
                <div className="buttonContent">
                    <div className="incidentsButton">
                        <button
                            className={clsx(sideWays_DATA.incident.status && 'onActiveButtom', 'offActiveButtom')}
                            onClick={handleClickIncidents}>
                            Incidents
                        </button>
                        <button
                            className={clsx(sideWays_DATA.traffic && 'onActiveButtom', 'offActiveButtom')}
                            onClick={handleClickTraffic}>
                            Traffic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadMaps;