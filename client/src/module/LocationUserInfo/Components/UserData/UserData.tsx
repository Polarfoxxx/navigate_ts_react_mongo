import React from "react";
import "./userData.style.css";
import { Container } from "../../../Container";

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
                            <button>save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDATA;