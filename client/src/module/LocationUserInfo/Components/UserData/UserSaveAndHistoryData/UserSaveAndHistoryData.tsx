import { Route, Link, Routes } from "react-router-dom";
import { UserHistoryData, UserSaveData } from "../..";
import "./userSaveAndHistoryData.style.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function UserSaveAndHistoryData(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const NAVIGATE = useNavigate();

    React.useEffect(() => {
        NAVIGATE("UserHistoryData")
    }, []);

    /* nastavenie mena prihlaseneho */
    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name)
        };
    }, []);


    return (
        <div className="userSaveAndHisData">
            <div className="userSaveAndHisData_nav">
                <div className="headerName">
                    <div className="headerAwensomeLogo">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="headeruserName">
                        <h4>{logUserName}</h4>
                    </div>
                </div>
                <div className="headerLink">
                    <Link className="link " to="UserHistoryData">History search</Link>
                    <Link className="link " to="UserSaveData">Save route</Link>
                </div>

            </div>
            <div className="userSaveAndHisData_content">
                <Routes>
                    <Route path="UserHistoryData" element={<UserHistoryData />} />
                    <Route path="UserSaveData" element={<UserSaveData />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserSaveAndHistoryData;