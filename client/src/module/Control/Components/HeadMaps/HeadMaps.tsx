import React from "react";
import { Container } from "../../../Container";
import "./headMaps.style.css"
import { Type_forStyle_startAndEnd_point, Type_Action_HeadMaps, Type_State_HeadMaps } from "./type";
import { UseChangeContextDATA } from "../../../hooks";
import { ButtonComponent } from "foxxy-package";

/* useReducer ----------------------------*/
const reducer = (state: Type_State_HeadMaps, action: Type_Action_HeadMaps) => {
    switch (action.type) {
        case 'START_POINTS_NAME':
            return { ...state, start_point: action.payload };
        case 'END_POINTS_NAME':
            return { ...state, end_point: action.payload };
        default:
            return state;
    }
};
/* useReducer ----------------------------*/



function HeadMaps(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const { incident, traffic, mapShops } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({sideWays_DATA, setSideWays_DATA });
    const [state, dispatch] = React.useReducer(reducer, {
        start_point: "",
        end_point: ""
    });


    React.useEffect(() => {
        dispatch({ type: "START_POINTS_NAME", payload: startPoints.address });
        dispatch({ type: "END_POINTS_NAME", payload: endPoints.address });
    }, [startPoints.address, endPoints.address]);


    const STYLE_FOR_STARTANDEND_POINT: Type_forStyle_startAndEnd_point = {
        on: {
            backgroundColor: "rgba(0, 0, 0, 0.244)"
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
        updateContext_DATA([ { newData: UPDATE_DATA, key: "incident" }]);
    };

    const handleClickTraffic = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        updateContext_DATA([ { newData: !traffic , key: "traffic" }]);
    };


    const handleClickShop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        updateContext_DATA([ { newData: !mapShops , key: "mapShops" }]);
    };


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
                <div >
                    <ButtonComponent.ButtonBox>
                        <ButtonComponent.Button text="Incidents" onClick={handleClickIncidents} variant_btn="dark" round />
                        <ButtonComponent.Button text="Traffic" onClick={handleClickTraffic} variant_btn="dark" round />
                        <ButtonComponent.Button text="shops" onClick={handleClickShop} variant_btn="dark" round />
                    </ButtonComponent.ButtonBox>
                </div>
                <div 
                style={sideWays_DATA.traffic || sideWays_DATA.incident.status ? {backgroundColor: "red"}: {backgroundColor: "transparent"}}
                className="headerButBoxActive">
                    <div>
                    <h3>{sideWays_DATA.traffic ? "traffic" : ""}</h3>
                    <h3>{sideWays_DATA.incident.status ? "incidents" : ""}</h3>
                    <h3>{sideWays_DATA.incident.status ? "shop" : ""}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadMaps;