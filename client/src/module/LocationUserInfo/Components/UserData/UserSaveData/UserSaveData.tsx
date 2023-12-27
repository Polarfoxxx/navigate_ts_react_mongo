import React from "react";
import "./userSaveData.style.css";
import { Container } from "../../../../Container";
import { AUTHENTICATION_API } from "../../../../API";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserSaveDataItem from "./UserSaveDataItem";



type Type_UserSaveHistoryRouteObjekt = {
    startPoint: string,
    endPoint: string,
    routeName: string,
    routeTime: number,
    routeDistance: number,
}





function UserSaveData(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, main_atl_route } = location_DATA;
    const [save_historyRoute, setSave_historyRoute] = React.useState<Type_UserSaveHistoryRouteObjekt[]>([]);
    const { handleSubmit, reset } = useInputValue();
    // Stav pre aktuálne údaje

    /* nastavenie mena prihlaseneho */
    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name)
        };
    }, []);


    // Vaša existujúca logika
    React.useEffect(() => {
        if (location_DATA.main_atl_route.length > 0) {
            const UPDATE_DATA = {
                startPoint: startPoints.address.label,
                endPoint: endPoints.address.label,
                routeName: main_atl_route[0].nameRoutes,
                routeTime: main_atl_route[0].totalTime,
                routeDistance: main_atl_route[0].totalDistance,
            };
            setSave_historyRoute((prevHistory) => [...prevHistory, UPDATE_DATA]);
        };
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
                        save_historyRoute.map((item, key) =>
                            <div
                                className="userSaveItemBox"
                                key={key}>
                                <UserSaveDataItem item={item} />
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default UserSaveData;