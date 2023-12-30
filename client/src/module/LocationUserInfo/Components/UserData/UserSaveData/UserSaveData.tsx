import React, { useRef } from "react";
import "./userSaveData.style.css";
import { Container } from "../../../../Container";
import { AUTHENTICATION_API } from "../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserSaveDataItem from "./UserSaveDataItem";
import { Type_ArrayAllCoord } from "../../../../Container";
import { Type_UserSaveHistoryRouteObjekt } from "./types";
import services_theMatchOfTheCreatedObject from "./services/services_theMatchOfTheCreatedObject";


function UserSaveData(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, main_atl_route, arrayALL_coordinate } = location_DATA;
    const history_RouteReff = React.useRef<Type_UserSaveHistoryRouteObjekt[]>([]);

    /* nastavenie mena prihlaseneho */
    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name)
        };
    }, []);


    /* nacitanie vsetkychroutes z lokalneho uloziska */
    React.useEffect(() => {
        const storedArray = localStorage.getItem('saveHistoryRoutes');
        if (storedArray) {
            const PARSE_ROUTE_ARR = JSON.parse(storedArray);
            history_RouteReff.current = PARSE_ROUTE_ARR
        }
    }, []);


    /* nastavenie novej trasy vlozenie do pola a lokalneho uloziska */
    React.useEffect(() => {
        if (location_DATA.main_atl_route.length > 0) {
            const UPDATE_DATA: Type_UserSaveHistoryRouteObjekt = {
                startPoint: {
                    address: startPoints.address,
                    latLng: startPoints.latLng
                },
                endPoint: {
                    address: endPoints.address,
                    latLng: endPoints.latLng
                },
                addPoint: arrayALL_coordinate,
                routeName: main_atl_route[0].nameRoutes,
                routeTime: main_atl_route[0].totalTime,
                routeDistance: main_atl_route[0].totalDistance,
            };

            const save_historyRoute = history_RouteReff.current;
            if (services_theMatchOfTheCreatedObject({ save_historyRoute, UPDATE_DATA }) === -1) {
                history_RouteReff.current = [...history_RouteReff.current, UPDATE_DATA]
            };
        };
        return (() => {
            localStorage.setItem('saveHistoryRoutes', JSON.stringify(history_RouteReff.current))
        });
    }, [JSON.stringify(location_DATA.main_atl_route)]);



    return (
        <div className="userSaveDataContent">
            <div className="userSavedataBox">
                <div className="userSaveLocationHeader">
                    <div className="headerAwensomeLogo">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="headerName">
                        <h1>{logUserName}</h1>
                    </div>
                </div>
                <div className="userSaveLocationBody">
                    {
                        history_RouteReff.current.map((item, key) =>
                                <UserSaveDataItem item={item} keyItem={key}/>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default UserSaveData;