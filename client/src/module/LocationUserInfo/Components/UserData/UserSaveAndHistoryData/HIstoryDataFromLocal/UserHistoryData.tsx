import React, { useMemo } from "react";
import "./userHistoryData.style.css";
import { Container } from "../../../../../Container";
import UserSaveDataItem from "./UserHistoryDataItem";
import { Type_UserSaveHistoryRouteObjekt } from "../types";
import services_theMatchOfTheCreatedObject from "./services/services_theMatchOfTheCreatedObject";
import { UseChangeContextDATA } from "../../../../../hooks";
import { defaultValue_address_for_Provider_Context } from "../../../../../Container";


function UserHistoryData(): JSX.Element {
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const { startPoints, endPoints, main_atl_route, arrayALL_coordinate } = location_DATA;
    const [clearStorage, setClearStorage] = React.useState(false) /* iba pre render */
    const selectItemRef = React.useRef<number>()

    /* nacitanie vsetkychroutes z lokalneho uloziska */
    let storageHistorySearch: Type_UserSaveHistoryRouteObjekt[] = useMemo(() => {
        const storedArray = localStorage.getItem('saveHistoryRoutes');
        if (storedArray) {
            const PARSE_ROUTE_ARR = JSON.parse(storedArray);
            return PARSE_ROUTE_ARR;
        };
    }, [])


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

            if (services_theMatchOfTheCreatedObject({ storageHistorySearch, UPDATE_DATA }) === -1) {
                storageHistorySearch.push(UPDATE_DATA)
            };
        };
        return (() => {
            localStorage.setItem('saveHistoryRoutes', JSON.stringify(storageHistorySearch))
        });
    }, [JSON.stringify(location_DATA.main_atl_route)]);


    /* vymazanie local storage */
    const handleClickClearLocalHistory = () => {
        localStorage.removeItem("saveHistoryRoutes");
        storageHistorySearch = [];
        setClearStorage(!clearStorage)
        updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);
    };


    /* selekt trasy pre farebne odlisenie */
    const handleActive = (key: number) => {
        if (key !== selectItemRef.current) {
            selectItemRef.current = key
        };
    };

    return (
        <div className="userHistoryDataContent">
            <div className="userHistorydataBox">
                <div className="userHistLocationHeader">
                    <div className="headerTittle">
                        <h3>HISTORY SEARCHE</h3>
                    </div>
                    <div className="headerClearButtom">
                        <button onClick={handleClickClearLocalHistory}>Clear maps and history</button>
                    </div>
                </div>
                <div className="userHisLocationBody">
                    {
                        storageHistorySearch.length > 0 && storageHistorySearch.map((item, key) =>
                            <div
                                onClick={() => handleActive(key)}
                                key={key}
                                className="userHisItem">
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