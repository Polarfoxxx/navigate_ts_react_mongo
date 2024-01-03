import React from "react";
import "./userHistoryData.style.css";
import { Container } from "../../../../../Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserSaveDataItem from "./UserHistoryDataItem";
import { Type_UserSaveHistoryRouteObjekt } from "../types";
import services_theMatchOfTheCreatedObject from "./services/services_theMatchOfTheCreatedObject";


function UserHistoryData(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, main_atl_route, arrayALL_coordinate } = location_DATA;
    const history_RouteReff = React.useRef<Type_UserSaveHistoryRouteObjekt[]>([]);
    const [clearStorage, setClearStorage] = React.useState(false) /* iba pre render */
    const selectItemRef = React.useRef<number>()


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
            const CREATE_TIME = new Date();
            const UTC_TIME = CREATE_TIME.toUTCString();

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
                createTime: UTC_TIME
            };

            const save_historyRoute = history_RouteReff.current;
            if (services_theMatchOfTheCreatedObject({ save_historyRoute, UPDATE_DATA }) === -1) {
                history_RouteReff.current = [...history_RouteReff.current, UPDATE_DATA];

            };
        };
        return (() => {
            localStorage.setItem('saveHistoryRoutes', JSON.stringify(history_RouteReff.current))
        });
    }, [JSON.stringify(location_DATA.main_atl_route)]);


    /* vymazanie local storage */
    const handleClickClearLocalHistory = () => {
        localStorage.removeItem("saveHistoryRoutes");
        history_RouteReff.current = [];
        setClearStorage(!clearStorage)
    };


/* selekt trasy pre farebne odlisenie */
    const handleActive = (key: number) => {
        if (key !== selectItemRef.current) {
            selectItemRef.current = key
        };
    };

    return (
        <div className="userSaveDataContent">
            <div className="userSavedataBox">
                <div className="userSaveLocationHeader">
                    <div className="headerName">
                        <div className="headerAwensomeLogo">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="headeruserName">
                            <h4>{logUserName}</h4>
                        </div>
                    </div>
                    <div className="headerTittle">
                        <h3>HISTORY SEARCHE</h3>
                    </div>
                    <div className="headerClearButtom">
                        <button onClick={handleClickClearLocalHistory}>Clear history</button>
                    </div>
                </div>
                <div className="userSaveLocationBody">
                    {
                        history_RouteReff.current.map((item, key) =>
                            <div
                                onClick={() => handleActive(key)}
                                key={key}
                                className="userSaveItem">
                                <UserSaveDataItem item={item} keyItem={key} selectItem={selectItemRef.current} />
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default UserHistoryData;