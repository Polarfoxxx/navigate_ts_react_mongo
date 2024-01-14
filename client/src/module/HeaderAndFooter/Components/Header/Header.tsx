import { useNavigate } from "react-router-dom";
import "./header.style.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { defaultValue_address_for_Provider_Context } from "../../../Container";
import BasicButtonExample from "./Dropdown";

function Header(): JSX.Element {
    const NAVIGATE = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const [logUserName, setLogUserName] = React.useState("");



    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name);
        };
    }, []);

    return (
        <div className="header">
            <div className="headerBox">
                <div className="headerbottonBox">
                  <BasicButtonExample/>
                </div>
                <div className="headerTittleBox">
                    <div className="headerLogo">
                        <h2>Welcome</h2>
                        <h3> {logUserName}</h3>
                        <h2>in</h2>
                        <h1>FoxxyNavigate</h1>
                        <FontAwesomeIcon className="faIcon" icon={faRoute} size="2xl" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header