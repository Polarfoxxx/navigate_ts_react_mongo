import React from "react";
import { Container } from "../../../Container";
import "./headMaps.style.css"
import { Type_forStyle_startAndEnd_point, Type_Action_HeadMaps, Type_State_HeadMaps } from "./type";
import { UseChangeContextDATA } from "../../../hooks";
import { DEFAULT_VALUE_FOR_REDUCER } from "./default_Value";

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
    const { incident, traffic, mapPOI_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER);

    React.useEffect(() => {
        dispatch({ type: "START_POINTS_NAME", payload: startPoints.address });
        dispatch({ type: "END_POINTS_NAME", payload: endPoints.address });
    }, [startPoints.address, endPoints.address]);


    const STYLE_FOR_STARTANDEND_POINT: Type_forStyle_startAndEnd_point = {
        on: {
            backgroundColor: "rgb(107, 107, 107)"
        },
        off: {
            backgroundColor: "transparent"
        }
    };

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


    const handleClick_POI_Category = (e: React.MouseEvent<HTMLButtonElement>, type: keyof typeof state.typePOI_category) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        const UPDATE_DATA = {
            ...state.typePOI_category,
            typePOI: type,
            [type]: !state.typePOI_category[type]
        };
        dispatch({ type: "POI_CATEGORY", payload: UPDATE_DATA });
    };

    React.useEffect(() => {
        const KEY_POI_CATEGORY = state.typePOI_category.typePOI as keyof typeof state.typePOI_category
        const UPDATE_DATA = {
            ...mapPOI_Category,
            type: state.typePOI_category.typePOI,
            status: state.typePOI_category[KEY_POI_CATEGORY]
        };
        updateContext_DATA([{ newData: UPDATE_DATA, key: "mapPOI_Category" }]);
    }, [state.typePOI_category])



    return (
        <div className="headerLocName">
            <div className="headarLocName_Box">
                <div
                    style={state.start_point ? STYLE_FOR_STARTANDEND_POINT.on : STYLE_FOR_STARTANDEND_POINT.off}
                    className="startLocation">
                    <h3>{state.start_point}</h3>
                </div>
                <div className="addedLocation">
                    {
                        arrayALL_coordinate.map((item, key) =>
                            <div
                                className="addLocation_item"
                                key={key}>
                                <h4 >- {item.address}</h4>
                            </div>
                        )
                    }
                </div>
                <div
                    style={state.end_point ? STYLE_FOR_STARTANDEND_POINT.on : STYLE_FOR_STARTANDEND_POINT.off}
                    className="endLocation">
                    <h3>{state.end_point}</h3>
                </div>
            </div>
            <div className="headerButtonBox">
                <div className="buttonContent">
                    <div className="IncidentsButton">
                        <button
                            className={sideWays_DATA.incident.status ? "onActiveButtom" : "offActiveButtom"}
                            onClick={handleClickIncidents}>
                            Incidents
                        </button>
                        <button
                            className={sideWays_DATA.traffic ? "onActiveButtom" : "offActiveButtom"}
                            onClick={handleClickTraffic}>
                            Traffic
                        </button>
                    </div>
                    <div className="poi_categoryBox">
                        <button
                            className={state.typePOI_category.Restaur ? "onActiveButtom" : "offActiveButtom"}
                            onClick={(e) => handleClick_POI_Category(e, "Restaur")}>
                            Restaurans
                        </button>
                        <button
                            className={state.typePOI_category.Pubs ? "onActiveButtom" : "offActiveButtom"}
                            onClick={(e) => handleClick_POI_Category(e, "Pubs")} >
                            Pubs
                        </button>
                        <button
                            className={state.typePOI_category.Shopping ? "onActiveButtom" : "offActiveButtom"}
                            onClick={(e) => handleClick_POI_Category(e, "Shopping")} >
                            Shopping
                        </button>
                        <button
                            className={state.typePOI_category.Cafes ? "onActiveButtom" : "offActiveButtom"}
                            onClick={(e) => handleClick_POI_Category(e, "Cafes")} >
                            Cafes
                        </button>
                        <button
                            className={state.typePOI_category.Bars ? "onActiveButtom" : "offActiveButtom"}
                            onClick={(e) => handleClick_POI_Category(e, "Bars")} >
                            Bars
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadMaps;