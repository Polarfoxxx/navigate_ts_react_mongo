import React from "react";
import "./onClickBussinesSeaCont.style.css";
import { Container, Type_SearchRespo_EDITED_DATA } from "../../../../Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { geocoder_coordSearche } from "../../../../Geocoder";
import { UseChangeContextDATA } from "../../../../hooks";
import { DEFAULT_VALUE_FOR_ONCLICK_BUSSINES_CONTENT } from "./defaultValue";
import { SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS} from "../../../../utils";

function OnClickBussinesSearcheContent(): JSX.Element {
    const { location_DATA, sideWays_DATA, setLocation_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [bussinesDATA_item, setBussinesDATA_item] = React.useState<Type_SearchRespo_EDITED_DATA>(DEFAULT_VALUE_FOR_ONCLICK_BUSSINES_CONTENT)

    /* nastavenie stavu pre obsah popupu */
    React.useEffect(() => {
        if (mapBussines_Category.dataMapBussines_froPopup) {
            setBussinesDATA_item(mapBussines_Category.dataMapBussines_froPopup)
        };
    }, [mapBussines_Category.dataMapBussines_froPopup?.resultNumber])


    /* nastavenie navigacie na bod bussiness */
    const handleSelectBussinesMarker = (item: Type_SearchRespo_EDITED_DATA) => {
        /* voalnie geocoderu pre nastavenie koncoveho bodu */
        if (item.fields) {
            const UPDATE_DATA = {
                ...mapBussines_Category,
                select_Route_Bussines: {
                    select: item.resultNumber,
                    typeMAPorList: "mapMarker"
                }
            };
            geocoder_coordSearche([item.fields.lat, item.fields.lng])
                .then(data => {
                    updateContext_DATA([
                        { newData: UPDATE_DATA, key: "mapBussines_Category" },
                        { newData: data, key: "endPoints" },
                    ]);
                })
                .catch((error) => console.error(error))
        }
    };


    return (
        <div className="bussinecContent">
            <div className="bussinecContent_header">
                <div className='bussinesHeaderLogo'>
                    <FontAwesomeIcon icon={faBuilding} size="2xl" />
                </div>
                <div className="bussinesHeaderBOXname">
                    <div className='bussinesHeaderSIC_Name'>
                        <h2>{bussinesDATA_item.fields.group_sic_code_name}</h2>
                    </div>
                    <div className='bussinesHeaderName'>
                        <h2>{bussinesDATA_item.name}</h2>
                    </div>
                </div>

            </div>
            <div className='bussinesContentBody'>
                <div className='bussinesContentBodyDistance'>
                    <div className="distanceContentTittle tittleHead">
                        <h4>Distance:</h4>
                    </div>
                    <div className="distanceContentValue bodyValue">
                        <h2>{CONVER_UNITS.services_conversionOfUnits({total_value: bussinesDATA_item.distance, units_type:"km"})}</h2>
                    </div>
                </div>
                <div className="bussinesContentBodyInfo">
                    <div className="infoBussinesInfoPhone tittleHead">
                        <h4>Phone:</h4>
                    </div>
                    <div className="infoBussinesInfophonValue bodyValue">
                        <h2>{bussinesDATA_item.fields.phone}</h2>
                    </div>
                </div>
                <div>
                    <div className="infoBussinesInfoPhone tittleHead">
                        <h4>Post code:</h4>
                    </div>
                    <div className="infoBussinesInfophonValue bodyValue">
                        <h2>{bussinesDATA_item.fields.postal_code}</h2>
                    </div>
                </div>
            </div>
            <div className="bussinesContentFooter">
                <button onClick={() => handleSelectBussinesMarker(bussinesDATA_item)}>navigate</button>
            </div>
        </div>
    )
}
export default OnClickBussinesSearcheContent;