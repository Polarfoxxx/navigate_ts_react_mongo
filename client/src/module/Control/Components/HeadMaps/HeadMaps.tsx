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

type Type_typePOI_category = {
    typePOI: string,
    Restaur: boolean,
    Pubs: boolean,
    Shopping: boolean,
    Cafes: boolean,
    Bars: boolean,
}


function HeadMaps(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const { incident, traffic, mapPOI_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [state, dispatch] = React.useReducer(reducer, {
        start_point: "",
        end_point: ""
    });
    const [typePOI_category, setTypePOI_category] = React.useState<Type_typePOI_category>({
        typePOI: "",
        Restaur: false,
        Pubs: false,
        Shopping: false,
        Cafes: false,
        Bars: false,
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
        updateContext_DATA([{ newData: UPDATE_DATA, key: "incident" }]);
    };

    const handleClickTraffic = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        updateContext_DATA([{ newData: !traffic, key: "traffic" }]);
    };


    const handleClick_POI_Category = (e: React.MouseEvent<HTMLButtonElement>, type: keyof typeof typePOI_category) => {
        e.stopPropagation(); /* zabranuje prebublavaniu */
        setTypePOI_category({
            ...typePOI_category,
            typePOI: type,
            [type]: !typePOI_category[type]
        })
    };



    React.useEffect(() => {
        const ddd = typePOI_category.typePOI as keyof typeof typePOI_category
        const UPDATE_DATA = {
            ...mapPOI_Category,
            type: typePOI_category.typePOI,
            status: typePOI_category[ddd]
        };
        updateContext_DATA([{ newData: UPDATE_DATA, key: "mapPOI_Category" }]);
    }, [typePOI_category])

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
                    </ButtonComponent.ButtonBox>
                    <ButtonComponent.ButtonBox>
                        <ButtonComponent.Button text="Restaur" onClick={(e) => handleClick_POI_Category(e, "Restaur")} variant_btn="dark" round />
                        <ButtonComponent.Button text="Pubs" onClick={(e) => handleClick_POI_Category(e, "Pubs")} variant_btn="dark" round />
                        <ButtonComponent.Button text="Shopping" onClick={(e) => handleClick_POI_Category(e, "Shopping")} variant_btn="dark" round />
                        <ButtonComponent.Button text="Cafes" onClick={(e) => handleClick_POI_Category(e, "Cafes")} variant_btn="dark" round />
                        <ButtonComponent.Button text="Bars" onClick={(e) => handleClick_POI_Category(e, "Bars")} variant_btn="dark" round />
                    </ButtonComponent.ButtonBox>

                </div>
                <div
                    style={sideWays_DATA.traffic || sideWays_DATA.incident.status ? { backgroundColor: "red" } : { backgroundColor: "transparent" }}
                    className="headerButBoxActive">
                    <div>
                        <h3>{sideWays_DATA.traffic ? "traffic" : ""}</h3>
                        <h3>{sideWays_DATA.incident.status ? "incidents" : ""}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadMaps;