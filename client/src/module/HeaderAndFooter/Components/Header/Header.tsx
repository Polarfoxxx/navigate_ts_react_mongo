import { useNavigate } from "react-router-dom";
import "./header.style.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { Container } from "../../../Container";

function Header(): JSX.Element {
    const TO_LOCATION = useNavigate();
    const { user_DATA, setUser_DATA } = React.useContext(Container.Context);
    const { loginName } = user_DATA;

    const handleClickToLoginPage = () => {
        TO_LOCATION("/LoginPage");
        localStorage.removeItem('JWT_token');
    };

    const userName = React.useMemo(() => {
        return loginName;
    }, [loginName]);

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
                    <div className="headerUser">
                        <h2>Welcome</h2><h3> {userName}</h3><h2>in</h2>
                    </div>
                    <div className="headerLogo">
                        <h1>FoxxyNavigate</h1>
                        <FontAwesomeIcon icon={faRoute} color="white" size="2xl" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header