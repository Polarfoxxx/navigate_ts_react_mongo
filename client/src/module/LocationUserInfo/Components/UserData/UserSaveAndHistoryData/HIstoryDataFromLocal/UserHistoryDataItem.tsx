import React from "react";
import "./userHistoryDataItem.style.css";
import { Container } from "../../../../../Container";
import { AUTHENTICATION_API } from "../../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { Type_UserSaveHistoryRouteObjekt, Type_UserHistoryDataItem, Type_saveRoute, TypeforSAVE_API } from "../../..";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons'
import { SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS } from "../../../../../utils";
import { DEFAULT_VALUE_HISTORY_DATA_ITEM } from "./default_value";

export const DEFAULT_VALUE_FOR_REDUCER_HISTORY_DATA_ITEM = {
    respoMessage: "",
    dataFromProps: DEFAULT_VALUE_HISTORY_DATA_ITEM
};

export type Type_forReducerUserHistoryDataItem = {
    respoMessage: string,
    dataFromProps: Type_UserSaveHistoryRouteObjekt
};
export type Type_Action_UserHistoryDataItem =
    | { type: 'SET_RESPO_MESSAGE'; payload: string }
    | { type: 'SET_DATA_FROM_PROPS'; payload: Type_UserSaveHistoryRouteObjekt }

/* useReducer ----------------------------*/
const reducer = (state: Type_forReducerUserHistoryDataItem, action: Type_Action_UserHistoryDataItem) => {
    switch (action.type) {
        case 'SET_RESPO_MESSAGE':
            return { ...state, respoMessage: action.payload };
        case 'SET_DATA_FROM_PROPS':
            return { ...state, dataFromProps: action.payload };
        default:
            return state;
    };
};
/* useReducer ----------------------------*/


function UserHistoryDataItem(props: Type_UserHistoryDataItem): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, arrayALL_coordinate,  main_atl_route} = location_DATA;
    const { handleSubmit, reset } = useInputValue();
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER_HISTORY_DATA_ITEM);


    /* nastave dat pre zobrazenie */
    React.useEffect(() => {
        if (props.item.routeName || props.item.startPoint.latLng[0]) {
            dispatch({ type: "SET_DATA_FROM_PROPS", payload: props.item });
        };
    }, [props.item]);


    /* priprava  formulara odoslanie do funkcie na stahovanie */
    const submit = (v: TypeForInputsObject["v"]): void => {
        if (v[0].inputValues && startPoints.latLng[0] && endPoints.latLng[0]) {
            const DATA_FOR_SAVEAPI: Type_saveRoute = {
                startCoord: startPoints,
                endCoord: endPoints,
                allCoord: arrayALL_coordinate,
                routeName: v[0].inputValues.toString(),
                timeCreate: props.item.createTime,
                officialName: props.item.routeName,
                timeRoute: props.item.routeTime,
                distanceRoute: props.item.routeDistance
            };
            saveDATA({ DATA_FOR_SAVEAPI })
            reset();
        };
    };

    /* async funkcia pre ulozenie dat */
    async function saveDATA(data: TypeforSAVE_API) {
        const DATA_ROUTE = data.DATA_FOR_SAVEAPI;
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;

            try {
                const SAVE_RESPO = await AUTHENTICATION_API.saveDATA_API({ DATA_ROUTE, USER_NAME, USER_JWT_TOKEN });
                if (SAVE_RESPO) {
                    dispatch({ type: "SET_RESPO_MESSAGE", payload: SAVE_RESPO.message });
                    setTimeout(() => {
                        dispatch({ type: "SET_RESPO_MESSAGE", payload: "" });
                    }, 5000)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    /* kliknutie na item historie cesty */
    const handleClickItem = (route: Type_UserSaveHistoryRouteObjekt) => {
        const UPDATE_DATA = {
            ...location_DATA,
            startPoints: route.startPoint,
            endPoints: route.endPoint,
            arrayALL_coordinate: route.addPoint
        };
        updateContext_DATA([
            { newData: UPDATE_DATA, key: "location_DATA" },
        ]);
    };

    return (
        <div
            style={props.keyItem === props.selectItem ? { left: "40px" } : { left: "0px" }}
            key={props.keyItem}
            onClick={() => handleClickItem(props.item)}
            className="itemUserSave">
            <div className="routeNameAndLogo">
                <div className="routeItemKey">
                    <div className="routeKeybox">
                        <div className="keyItem">
                            <h4>{props.keyItem + 1}</h4>
                        </div>
                    </div>
                </div>
                <div className="routeItemName">
                    <div className="nameLogo">
                        <FontAwesomeIcon icon={faRoad} />
                    </div>
                    <div className="nameRoute">
                        <p>{state.dataFromProps.routeName}</p>
                    </div>
                </div>
            </div>
            <div className="routeBody">
                <div className="itemStartANDEndPoint">
                    <div className="itemStartEndLogo">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="itemStartEndName">
                        <p>{state.dataFromProps.startPoint.address.label}</p>
                    </div>
                </div>
                <div className="itemStartANDEndPoint">
                    <div className="itemStartEndLogo">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="itemStartEndName">
                        <p>{state.dataFromProps.endPoint.address.label}</p>
                    </div>
                </div>
                <div className="itemStartANDEndPoint">
                    {
                        state.dataFromProps && state.dataFromProps.addPoint.length > 0 &&
                        <div className="addPointShow">
                            <div className="itemStartEndLogo">
                                <p>{state.dataFromProps.addPoint.length + 1}x added point </p>
                            </div>
                            <div className="itemStartEndName">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="itemRouteDatail">
                <div className="itemDetail">
                    <div className="itemDetailTittle">
                        <p>Distance:</p>
                    </div>
                    <div className="itemDetailValue">
                        <p>{CONVER_UNITS.services_conversionOfUnits({ total_value: state.dataFromProps.routeDistance, units_type: "m" })}</p>
                    </div>
                </div>
                <div className="itemDetail">
                    <div className="itemDetailTittle">
                        <p>Time route:</p>
                    </div>
                    <div className="itemDetailValue">
                        <p>{CONVER_UNITS.services_conversionOfTime({ total_value: state.dataFromProps.routeTime, units_type: "s" })}</p>
                    </div>
                </div>
                <div className="itemDetail">
                    <div className="itemDetailTittle">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="itemDetailValue">
                        <p>{state.dataFromProps.createTime}</p>
                    </div>
                </div>
            </div>



            <div className="itemEventBlock">
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <label htmlFor="">Save route to DB</label>
                    <div>
                        <input
                            name="name"
                            placeholder="Route name"
                            type="text" />
                        <button>Save</button>
                    </div>
                </form>
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <label htmlFor="">Send to email</label>
                    <div>
                        <input
                            name="email"
                            placeholder="Send email"
                            type="email" />
                        <button>Send</button>
                    </div>
                </form>
            </div>
            <div className="respoMessage">
                <h4>{state.respoMessage}</h4>
            </div>
        </div>
    );
};

export default UserHistoryDataItem;