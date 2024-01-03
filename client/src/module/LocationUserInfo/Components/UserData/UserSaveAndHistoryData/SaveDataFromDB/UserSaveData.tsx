import React from "react";
import { AUTHENTICATION_API } from "../../../../../API";
import { Type_saveRoute } from "../HIstoryDataFromLocal/types";

function UserSaveData(): JSX.Element {
    const [loadDATA, setLoadDATA] = React.useState<Type_saveRoute[]>([]);

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

    return (
        <div className="saveDataContent">
            <div className="saveDataHeader">

            </div>
            <div className="saveDataBody">
                {
                    loadDATA.length > 0 && loadDATA.map((item, key) =>
                        <div
                            key={key}
                            className="saveItem">
                            {item.startCoord.address.county}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default UserSaveData;