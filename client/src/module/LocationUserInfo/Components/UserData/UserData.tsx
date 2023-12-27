import React from "react";
import "./userData.style.css"
import { Container } from "../../../Container";
import { UserLoadData, UserSaveData } from "../";


function UserDATA(): JSX.Element {


    return (
        <div className="userDataContent">
            <div className="userSaveData">
                <UserSaveData />
            </div>
            <div className="userLoadData">
                <UserLoadData />
            </div>
        </div>
    );
};

export default UserDATA;