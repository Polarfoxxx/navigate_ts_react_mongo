import { useNavigate } from "react-router-dom";
import "./header.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
  import { faRoute } from '@fortawesome/free-solid-svg-icons'


function Header(): JSX.Element {
    const TO_LOCATION = useNavigate();


    const handleClickToLoginPage = () => {
        TO_LOCATION("/")
    }

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
                    <h1>FoxxyNavigate</h1>
                    <FontAwesomeIcon icon={faRoute} color="white" size="2xl"/>
                </div>
            </div>
        </div>
    );
};

export default Header