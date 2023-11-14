import React from "react";
import "./noContent.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';



function NoContent(): JSX.Element {
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

export default NoContent