import React from "react";
import "./userHistoryData.style.css";
import { Container } from "../../../../../Container";
import UserSaveDataItem from "./UserHistoryDataItem";
import { Type_UserSaveHistoryRouteObjekt } from "../types";
import { UseChangeContextDATA } from "../../../../../hooks";
import { DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT } from "../../../../../Container";


function UserHistoryData(): JSX.Element {
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const selectItemRef = React.useRef<number>();
    const [storage_route, setStorage_route] = React.useState<Type_UserSaveHistoryRouteObjekt[]>([]);



    React.useEffect(() => {
        const storedArray = localStorage.getItem('saveHistoryRoutes');
        if (storedArray) {
            const PARSE_ROUTE_ARR = JSON.parse(storedArray);
            setStorage_route(PARSE_ROUTE_ARR)
        };

    }, [JSON.stringify(location_DATA.main_atl_route)])


    /* vymazanie local storage */
    const handleClickClearLocalHistory = () => {
        updateContext_DATA([{ newData: DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT, key: "location_DATA" }]);
        localStorage.removeItem("saveHistoryRoutes");
        setStorage_route([])
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
                        storage_route.length > 0 && storage_route.map((item, key) =>
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