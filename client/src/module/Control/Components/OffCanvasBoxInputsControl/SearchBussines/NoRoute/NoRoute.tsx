import "./noRoute.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';



function NoRoute(): JSX.Element {
    return (
        <div className="noContentBox">
            <div className="noContetntText">
                <h3>No point or route</h3>
            </div>
            <div>
                <FontAwesomeIcon icon={faCircleXmark} size="2xl" color="red" />
            </div>
        </div>
    );
};

export default NoRoute