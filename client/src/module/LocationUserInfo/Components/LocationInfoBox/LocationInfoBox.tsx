import React from "react";
import "./location_info_box.style.css"
import {  LocationInfoResult, services_changeLocationNameToCountryCode } from "..";
import { locationInfo_API, Type_CityInfo_RAW_Data } from "../../../API";
import { Container } from "../../../Container";
import lookup from  'country-code-lookup';


function LocationInfoBox(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints} = location_DATA;
    const [respoDATA, setRespoDATA] = React.useState<Type_CityInfo_RAW_Data[]>([]);

    React.useEffect(() => {
       const INFO_COUNTRY = services_changeLocationNameToCountryCode(location_DATA)
        fetchLocationInfoData(INFO_COUNTRY);
    }, [startPoints.address.label, endPoints.address.label]);

    async function fetchLocationInfoData(INFO_COUNTRY: lookup.SearchOutput) {
        try {
            const DATA_API = await locationInfo_API(INFO_COUNTRY);
            setRespoDATA(DATA_API)
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="location_info_box">
            <div className="locationbox">
                <div className="locationvalues">
                    <LocationInfoResult respoDATA={respoDATA} />
                </div>
            </div>
        </div>
    );
};

export default LocationInfoBox;