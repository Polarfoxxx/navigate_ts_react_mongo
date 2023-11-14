import React from "react";
import "./control.master.style.css"
import { SearchBusiness, LocationSearcheControl } from "..";


function ControlBox(): JSX.Element {

    return (
        <div className="control-box">
            <div className="controlLocation">
                <LocationSearcheControl />
            </div>
            <div className="controlSearch">
                <SearchBusiness />
            </div>
        </div>
    )
};

export default ControlBox
