import React from "react";
import "./userData.style.css"
import { UserSaveAndHistoryData } from "../";


function UserDATA(): JSX.Element {

    return (
        <div className="userDataContent">
            <div className="userSaveANDHistoryData">
                <UserSaveAndHistoryData />
            </div>
           
        </div>
    );
};

export default UserDATA;