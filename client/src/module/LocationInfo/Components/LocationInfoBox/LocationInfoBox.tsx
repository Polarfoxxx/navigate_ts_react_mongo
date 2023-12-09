import React from "react";
import "./location_info_box.style.css"
import { LocationInfoGeocoderInput, LocationInfoResult } from "..";
import { locationInfoAPI } from "../../../API";
import { Type_CityInfo_RAW_Data } from "../../../API";

function LocationInfoBox(): JSX.Element {
    const [respoDATA, setRespoDATA] = React.useState<Type_CityInfo_RAW_Data[]>([])

 /*    React.useEffect(() => {
        fetchLocationInfoData();
    }, []);
 */

    async function fetchLocationInfoData() {
        try {
            const DATA_API = await locationInfoAPI();
            setRespoDATA(DATA_API)
            console.log(DATA_API);
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="location_info_box">
            <div className="locationbox">
                <div className="locationInpBox">
                    <LocationInfoGeocoderInput />
                </div>
                <div className="locationvalues">
                    <LocationInfoResult respoDATA={respoDATA} />
                </div>
            </div>
        </div>
    );
};

export default LocationInfoBox;