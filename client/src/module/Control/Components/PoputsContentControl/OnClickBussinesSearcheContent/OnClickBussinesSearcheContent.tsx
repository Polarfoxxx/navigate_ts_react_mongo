import React from "react";
import "./onClickBussinesSeaCont.style.css";
import { Container } from "../../../../Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from '@fortawesome/free-solid-svg-icons'


function OnClickBussinesSearcheContent(): JSX.Element {
    const { location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;



    return (
        <div className="bussinecContent">
            <div className="bussinecContent_header">
                <div className='bussinesHeaderLogo'>
                    <FontAwesomeIcon icon={faUtensils} size="2xl" />
                </div>
                <div className="bussinesHeaderBOXname">
                    <div className='bussinesHeaderSIC_Name'>
                        <h2>{mapBussines_Category.dataMapBussines_froPopup?.fields.group_sic_code_name}</h2>
                    </div>
                    <div className='bussinesHeaderName'>
                        <h2>{mapBussines_Category.dataMapBussines_froPopup?.name}</h2>
                    </div>
                </div>

            </div>
            <div className='bussinesContentBody'>
                <div className='bussinesContentBodyDistance'>
                    <div className="distanceContentTittle tittleHead">
                        <h4>Distance:</h4>
                    </div>
                    <div className="distanceContentValue bodyValue">
                        <h2>{mapBussines_Category.dataMapBussines_froPopup?.distance}</h2><span>k</span>
                    </div>
                </div>
                <div className="bussinesContentBodyInfo">
                    <div className="infoBussinesInfoPhone tittleHead">
                        <h4>Phone:</h4>
                    </div>
                    <div className="infoBussinesInfophonValue bodyValue">
                        <h2>{mapBussines_Category.dataMapBussines_froPopup?.fields.phone}</h2>
                    </div>
                </div>
                <div>
                    <div className="infoBussinesInfoPhone tittleHead">
                        <h4>Post code:</h4>
                    </div>
                    <div className="infoBussinesInfophonValue bodyValue">
                        <h2>{mapBussines_Category.dataMapBussines_froPopup?.fields.postal_code}</h2>
                    </div>
                </div>
            </div>
            <div className='bussinesContentFooter'>

            </div>
        </div>
    );
};

export default OnClickBussinesSearcheContent