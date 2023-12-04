import React from "react";
import "./searchALLResultBusssinesControl.style.css"
import { Container } from "../../../../Container";
import { Type_SearchRespo_EDITED_DATA } from "../../../../Container";
import { geocoder_coordSearche } from "../../../../Geocoder";
import { UseChangeContextDATA } from "../../../../hooks";
import UseChangeContextDATA_CALL from "../../../../hooks/UseChangeContextDATA/UseChangeContextDATA_CALL";
import { SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS } from "../../../../utils";

function SearchBussinesItemControl(): JSX.Element {
    const { location_DATA, sideWays_DATA, setLocation_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA, { endPoints } = location_DATA;
    const [bussinesDATA, setBussinesDATA] = React.useState<Type_SearchRespo_EDITED_DATA[]>([]);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const selectREF = React.useRef<number>()

    /* nastavenie stavu pre vsetky vysledky busssines */
    React.useEffect(() => {
        if (mapBussines_Category.allResultDATA !== undefined && mapBussines_Category.allResultDATA !== null) {
            setBussinesDATA(mapBussines_Category.allResultDATA)
        };
    }, [mapBussines_Category.allResultDATA])


    /*zmena oznaceneho busssines so seznamu na zaklade kliknutia na marker  */
    React.useEffect(() => {
        if(mapBussines_Category.select_Route_Bussines.select !== null) {
            selectREF.current = (mapBussines_Category.select_Route_Bussines.typeMAPorList === "mapMarker")
            ? (mapBussines_Category.select_Route_Bussines.select - 1)
            : mapBussines_Category.select_Route_Bussines.select;
        }
    }, [location_DATA.endPoints.address])


    /* ozbacenie bussines na zobrazenie zrasi */
    const handleSelectItem = (item: Type_SearchRespo_EDITED_DATA, key: number) => {
        /* voalnie geocoderu pre nastavenie koncoveho bodu */
        const UPDATE_DATA = {
            ...mapBussines_Category,
            select_Route_Bussines: {
                select: key,
                typeMAPorList: "listEvent"
            }
        };
        geocoder_coordSearche([item.fields.lat, item.fields.lng])
            .then(data => {
                updateContext_DATA([
                    { newData: data, key: "endPoints" },
                    { newData: UPDATE_DATA, key: "mapBussines_Category" },
                ]);
            })
            .catch((error) => console.error(error))
    };


    return (
        <div className="searchResultControl">
            <div className="searchResultBox">
                {
                    bussinesDATA.map((item, key) =>
                        <div
                            className={key === selectREF.current ? "searcheItemActive" : "searcheItemDeactive"}
                            onClick={() => handleSelectItem(item, key)}
                            key={key}>
                            <div className="boxItem headBlock">
                                <div className="headBlockTypename">
                                    <h5 className="itemTittle">{item.fields.group_sic_code_name}</h5>
                                </div>
                                <div className="headBlockvalue bussinesName">
                                    <h5>{item.name}</h5>
                                </div>
                            </div>
                            <div className="boxItem bodyBlock">
                                <div>
                                    <h5 className="itemTittle">Distace</h5>
                                </div>
                                <div className="headBlockvalue">
                                    <h5>{CONVER_UNITS.services_conversionOfUnits({ total_value: item.distance, units_type: "km" })}</h5>
                                </div>
                            </div>
                            <div className="boxItem footerBlock">
                                <div>
                                    <h5 className="itemTittle">Phone:</h5>
                                </div>
                                <div className="headBlockvalue">
                                    <h5>{item.fields.phone}</h5>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default SearchBussinesItemControl;