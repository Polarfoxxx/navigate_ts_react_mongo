import React from "react";
import "./userData.style.css"
import { Container } from "../../../Container";
import { UserFreeBlockData, UserSaveAndHistoryData } from "../";


function UserDATA(): JSX.Element {


    return (
        <div className="userDataContent">
            <div className="userSaveData">
                <UserSaveAndHistoryData />
            </div>
            <div className="userLoadData">
                <UserFreeBlockData />
            </div>
        </div>
    );
};

export default UserDATA;