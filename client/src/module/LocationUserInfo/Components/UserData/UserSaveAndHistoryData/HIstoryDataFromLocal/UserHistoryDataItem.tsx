import React from "react";
import "./userHistoryDataItem.style.css";
import { Container } from "../../../../../Container";
import { AUTHENTICATION_API } from "../../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { Type_UserSaveHistoryRouteObjekt } from "../types";
import { UseChangeContextDATA } from "../../../../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export type Type_UserSaveDataItem = {
    item: Type_UserSaveHistoryRouteObjekt,
    keyItem: number
}

function UserHistoryDataItem(props: Type_UserSaveDataItem): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA;
    const [save_historyRoute, setSave_historyRoute] = React.useState<Type_UserSaveHistoryRouteObjekt[]>([]);
    const { handleSubmit, reset } = useInputValue();
    const [dataForProps, setDataForProps] = React.useState<Type_UserSaveHistoryRouteObjekt>();


    React.useEffect(() => {
        if (props.item) {
            setDataForProps({
                startPoint: props.item.startPoint,
                endPoint: props.item.endPoint,
                addPoint: props.item.addPoint,
                routeName: props.item.routeName,
                routeTime: props.item.routeTime,
                routeDistance: props.item.routeDistance
            });
        };
    }, [props.item]);


    /* odoslanie formulara */
    const submit = (v: TypeForInputsObject["v"]): void => {
        console.log(v);
        const LOAD_USER_DATA = localStorage.getItem("JWT_token");
        const START_COORD = startPoints;
        const END_COORD = endPoints;
        const ALL_COORD = arrayALL_coordinate;
        const ROUTE_NAME = v[0].inputValues.toString();

        if (LOAD_USER_DATA && START_COORD.latLng[0] && END_COORD.latLng[0]) {
            const USER_DATA = JSON.parse(LOAD_USER_DATA)
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            AUTHENTICATION_API.saveDATA_API({ USER_NAME, USER_JWT_TOKEN, ROUTE_NAME, START_COORD, END_COORD, ALL_COORD })
            reset();
        };
    };

    const handleClick = (route: Type_UserSaveHistoryRouteObjekt) => {

        const UPDATE_DATA = {
            ...location_DATA,
            startPoints: route.startPoint,
            endPoints: route.endPoint,
            arrayALL_coordinate: route.addPoint
        };

        updateContext_DATA([
            { newData: UPDATE_DATA, key: "location_DATA" },
        ]);
    }

    return (
        <div
            onClick={() => handleClick(props.item)}
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
                        <p>{dataForProps?.routeName}</p>
                    </div>
                </div>
            </div>
            <div className="itemStartANDEndPoint">
                <div className="itemStartEndLogo">
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="itemStartEndName">
                    <p>{dataForProps?.startPoint.address.label}</p>
                </div>
            </div>
            <div className="itemStartANDEndPoint">
                <div className="itemStartEndLogo">
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="itemStartEndName">
                    <p>{dataForProps?.endPoint.address.label}</p>
                </div>
            </div>
            <div className="itemEventBlock">
                <form onSubmit={(e) => handleSubmit(e, submit)}>
                    <input
                        name="name"
                        placeholder="Route name"
                        type="text" />
                    <button>save</button>
                </form>
            </div>
        </div>
    );
};

export default UserHistoryDataItem;