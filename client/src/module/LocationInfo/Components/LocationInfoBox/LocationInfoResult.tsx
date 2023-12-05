import React from "react";
import { Type_CityInfo_RAW_Data } from "../../../API";
import "./locationInfoResult.style.css"


type Type_forLocationInfoResult = {
    respoDATA: Type_CityInfo_RAW_Data[]
}

        function LocationInfoResult(props:Type_forLocationInfoResult):JSX.Element {
    return(
        <div className="locationResultBox">
            <div className="locationContent">
                {
                    props.respoDATA.map((item, key) => 
                    <div 
                    className="respoDATA_item"
                    key={key}>
                        <div className="itemCityName">
                            {item.name}
                        </div>
                        <div className="itemCityPopulation">
                            {item.population}
                        </div>
                        <div className="itemCityId">
                            {item.id}
                        </div>
                        <div className="itemCityLAtLng">
                            {item.coordinates.latitude}
                            {item.coordinates.longitude}
                        </div>
                        <div className="itemCityCoutryName">
                            {item.country.name}
                        </div>
                        <div className="itemCityType">
                            {item.type}
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default LocationInfoResult;