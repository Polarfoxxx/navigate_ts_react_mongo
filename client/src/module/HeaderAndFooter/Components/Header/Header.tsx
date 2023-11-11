import { useNavigate } from "react-router-dom";
import "./header.style.css";

function Header(): JSX.Element {
    const TO_LOCATION = useNavigate()


    const hadnelClick = () => {
        TO_LOCATION("/")
    }



    return (
        <div className="header">
            <div className="headerBox">
                <div className="headerbottonBox">
                <button onClick={hadnelClick}>Back to login page</button>
                 
                </div>
                <div className="headerTittleBox">
                    <h1>FoxxyNavigate</h1>
                </div>
            </div>
        </div>
    );
};

export default Header