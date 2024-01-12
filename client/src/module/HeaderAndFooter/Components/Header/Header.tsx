import { useNavigate } from "react-router-dom";
import "./header.style.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import { defaultValue_address_for_Provider_Context } from "../../../Container";


function Header(): JSX.Element {
    const TO_LOCATION = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const [logUserName, setLogUserName] = React.useState("");

    /* odhlasenie */
    const handleClickToLoginPage = () => {
        TO_LOCATION("/LoginPage");
        localStorage.removeItem('JWT_token');
        localStorage.removeItem('saveHistoryRoutes');
        updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);

    };

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
                    <button onClick={handleClickToLoginPage}>
                        <FontAwesomeIcon icon={faLeftLong} size="2xl" />
                        <span>Back to login page</span>
                    </button>
                </div>
                <div className="headerTittleBox">
                    <div className="headerLogo">
                        <h2>Welcome</h2>
                        <h3> {logUserName}</h3>
                        <h2>in</h2>
                        <h1>FoxxyNavigate</h1>
                        <FontAwesomeIcon className="faIcon" icon={faRoute}  size="2xl" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header