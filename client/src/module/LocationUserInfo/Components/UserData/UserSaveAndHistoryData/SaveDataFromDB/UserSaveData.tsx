import React from "react";
import "./userSaveData.style.css";
import { AUTHENTICATION_API } from "../../../../../API";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import UserSaveDataItem from "./UserSaveDataItem";

function UserSaveData(): JSX.Element {
    const [loadDATA, setLoadDATA] = React.useState<Type_saveRoute[]>([]);
    const selectItemRef = React.useRef<number>()

    React.useEffect(() => {
        loadData();
    }, []);


    async function loadData() {
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            try {
                const LOAD_DATA = await AUTHENTICATION_API.loadDATA_API({ USER_NAME, USER_JWT_TOKEN });
                console.log(LOAD_DATA);
                if (LOAD_DATA?.status === 200) {
                    setLoadDATA(LOAD_DATA.data)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    /* selekt trasy pre farebne odlisenie */
    const handleActive = (key: number) => {
        if (key !== selectItemRef.current) {
            selectItemRef.current = key
        };
    };



    return (
        <div className="saveDataContent">
            <div className="saveDataContBox">
                <div className="saveDataHeader">
                    <div className="userSaveHeader">
                        <div className="headerTittle">
                            <h3>SAVE ROUTE</h3>
                        </div>
                    </div>
                </div>
                <div className="saveDataBody">
                    {
                        loadDATA.length > 0 && loadDATA.map((item, key) =>
                            <div
                                onClick={() => handleActive(key)}
                                key={key}
                                className="saveItem">
                                <UserSaveDataItem item={item} keyItem={key} selectItem={selectItemRef.current} />
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default UserSaveData;