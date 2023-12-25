import React from "react";
import "./userData.style.css";
import { Container } from "../../../Container";
import { AUTHENTICATION_API } from "../../../API";

function UserDATA(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const [locationName, setLocationName] = React.useState({

    });



    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name)
        };
    }, []);


const handleClickSaveDATA = () => {

    const LOAD_USER_DATA = localStorage.getItem("JWT_token");
    const DATA = JSON.stringify(location_DATA.startPoints.latLng)

    if(LOAD_USER_DATA && DATA) {
        
        const USER_DATA = JSON.parse(LOAD_USER_DATA)
        const USER_NAME = USER_DATA.user_Name
        const USER_JWT_TOKEN = USER_DATA.JWT_token
        AUTHENTICATION_API.saveDATA_API({USER_NAME,USER_JWT_TOKEN, DATA})
    };
};

    return (
        <div className="userDataContent">
            <div className="userdataBox">
                <div className="userLocationHeader">
                    <h1>{logUserName}</h1>
                </div>
                <div className="userLocationBody">
                    <div className="userLocationContent">
                        <div className="startPosition">
                            <p>{location_DATA.startPoints.address.label}</p>
                        </div>
                        <div className="startPosition">
                            <p>{location_DATA.endPoints.address.label}</p>
                        </div>
                        <div>
                            <button onClick={handleClickSaveDATA}>save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDATA;