import React from "react";
import "./location_info_box.style.css"
import { LocationInfoGeocoderInput, LocationInfoResult } from "..";
import { locationInfoAPI } from "../../../API";

function LocationInfoBox(): JSX.Element {


React.useEffect(() => {
    fetchLocationInfoData();
},[]);


async function fetchLocationInfoData() {
    locationInfoAPI()
}

    return (
        <div className="location_info_box">
            <div className="locationbox">
                <div className="locationInpBox">
                    <LocationInfoGeocoderInput />
                </div>
                <div className="locationvalues">
                    <div className="locationResBox">
                        <LocationInfoResult />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationInfoBox;