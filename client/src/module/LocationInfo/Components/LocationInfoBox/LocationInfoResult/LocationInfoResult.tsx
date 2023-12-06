import React from "react";
import "./locationInfoResult.style.css";
import {AG_GridTable as AGGridTable, Type_forLocationInfoResult} from "../..";
 

        function LocationInfoResult(props:Type_forLocationInfoResult):JSX.Element {
    return(
        <div className="locationResultBox">
            <div className="locationContent">
                   <AGGridTable respoDATA = {props.respoDATA} />
            </div>
        </div>
    );
};

export default LocationInfoResult;