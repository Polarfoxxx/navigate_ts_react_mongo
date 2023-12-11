import React from "react";
import "./location_info_box.style.css"
import { LocationInfoGeocoderInput, LocationInfoResult, services_changeLocationNameToCountryCode } from "..";
import { locationInfoAPI, Type_CityInfo_RAW_Data } from "../../../API";
import { Container } from "../../../Container";
import { UseChangeContextDATA } from "../../../hooks";
import lookup from  'country-code-lookup';
import imageLocation_API from "../../../API/imageLocation.API/imageLocation_API";


function LocationInfoBox(): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints, arrayALL_coordinate } = location_DATA, { clickOnMap } = sideWays_DATA
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [respoDATA, setRespoDATA] = React.useState<Type_CityInfo_RAW_Data[]>([])


    imageLocation_API()

    React.useEffect(() => {
       const INFO_COUNTRY = services_changeLocationNameToCountryCode(location_DATA)
        fetchLocationInfoData(INFO_COUNTRY);
    }, [startPoints.address, endPoints.address]);

    async function fetchLocationInfoData(INFO_COUNTRY: lookup.SearchOutput) {
        try {
            const DATA_API = await locationInfoAPI(INFO_COUNTRY);
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