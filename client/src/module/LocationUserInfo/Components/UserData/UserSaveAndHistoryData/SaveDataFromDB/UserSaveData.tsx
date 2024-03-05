import React from "react";
import "./userSaveData.style.css";
import { AUTHENTICATION_API } from "../../../../../API";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";
import UserSaveDataItem from "./UserSaveDataItem";

function UserSaveData(): JSX.Element {
    const [loadDATA, setLoadDATA] = React.useState<Type_saveRoute[]>([]);
    const [selectRoute, setSelectRoute] = React.useState<number | undefined>();
    const [deleteNameRoute, setDeleteNameRoute] = React.useState("");

    /* spustenie nacitacej api  */
    React.useEffect(() => {
        fetchloadData();
    }, []);

    /* volanie api pre nacitanie */
    async function fetchloadData() {
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            try {
                const LOAD_DATA = await AUTHENTICATION_API.loadDATA_API({ USER_NAME, USER_JWT_TOKEN });

                if (LOAD_DATA?.status === 200) {
                    setLoadDATA(LOAD_DATA.data)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };


    /* spustenie vymazavacej api */
    React.useEffect(() => {
        if (deleteNameRoute) {
            deleteItem()
        }
    }, [deleteNameRoute])

    /* volanie api pre vymazanie*/
    async function deleteItem() {
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const EMAIL_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            const ROUTE_NAME = deleteNameRoute;

            try {
                const RESPO_DATA = await AUTHENTICATION_API.deleteRoute({ EMAIL_NAME, ROUTE_NAME, USER_JWT_TOKEN });
                if (RESPO_DATA?.status === 200) {
                    setLoadDATA(RESPO_DATA.data)
                };
            } catch (error) {
                console.error(error);
            };
        };
    };


    return (
        <div className="saveDataContent">
            <div className="saveDataContBox">
                <div className="saveDatasHeader">
                    <div className="userSaveHeader">
                        <div className="headerTittle">
                            <h3>SAVE ROUTE</h3>
                        </div>
                    </div>
                </div>
                <div className="saveDataBody">
                    {
                        loadDATA.map((item, key) =>
                            <div
                                style={selectRoute === key ? { left: "60px" } : { left: "0px" }}
                                className="saveItem">
                                <UserSaveDataItem
                                    item={item}
                                    keyItem={key}
                                    setDeleteNameRoute={setDeleteNameRoute}
                                    setSelectRoute={setSelectRoute} />
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default UserSaveData;