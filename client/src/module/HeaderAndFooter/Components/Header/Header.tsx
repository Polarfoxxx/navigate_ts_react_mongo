import "./header.style.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import DropdownLogOut from "./DropdownLogOut";

function Header(): JSX.Element {
    const [logUserName, setLogUserName] = React.useState("");
    const [respoMessage, setRespoMessage] = React.useState("")

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
                    <DropdownLogOut setRespoMessage={setRespoMessage} />
                </div>
                <div className="headerRespoMessage">
                    {
                        respoMessage &&
                        <div className="headerRespoMessageContent">
                            {respoMessage}
                        </div>
                    }

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