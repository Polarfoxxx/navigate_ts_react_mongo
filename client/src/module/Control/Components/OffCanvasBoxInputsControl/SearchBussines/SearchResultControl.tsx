import React from "react";
import "./searchResultControl.style.css"
import { Container } from "../../../../Container";
import { Type_SearchRespo_clearDATA_Circle } from "../../../../Container";
import { geocoder_coordSearche } from "../../../../Geocoder";
import { UseChangeContextDATA } from "../../../../hooks";
import UseChangeContextDATA_CALL from "../../../../hooks/UseChangeContextDATA/UseChangeContextDATA_CALL";


function SearchResultControl(): JSX.Element {
    const { location_DATA, sideWays_DATA, setLocation_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA, { endPoints } = location_DATA;
    const [bussinesDATA, setBussinesDATA] = React.useState<Type_SearchRespo_clearDATA_Circle[]>([]);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const [selectItem, setSelectItem] = React.useState<number>()

    /* nastavenie stavu pre vsetky vysledky busssines */
    React.useEffect(() => {
        if (mapBussines_Category.allResultDATA !== undefined && mapBussines_Category.allResultDATA !== null) {
            setBussinesDATA(mapBussines_Category.allResultDATA)
        };
    }, [mapBussines_Category.allResultDATA])


    /*zmena oznaceneho busssines so seznamu na zaklade kliknutia na marker  */
    React.useEffect(() => {
        if (mapBussines_Category.select_Route_Bussines.typeMAPorList === "mapMarker") {
            setSelectItem(mapBussines_Category.select_Route_Bussines.select - 1)
        };
    }, [location_DATA.endPoints.address])


    /* ozbacenie bussines na zobrazenie zrasi */
    const handleSelectItem = (item: Type_SearchRespo_clearDATA_Circle, key: number) => {
        /* voalnie geocoderu pre nastavenie koncoveho bodu */
        geocoder_coordSearche([item.fields.lat, item.fields.lng])
            .then(data => {
                updateContext_DATA([
                    { newData: data, key: "endPoints" },
                ]);
        setSelectItem(key)

            })
            .catch((error) => console.error(error))
    };


    return (
        <div className="searchResultControl">
            <div className="searchResultBox">
                {
                    bussinesDATA.map((item, key) =>
                        <div
                            className={key === selectItem ? "searcheItemActive" : "searcheItemDeactive"}
                            onClick={() => handleSelectItem(item, key)}
                            key={key}>
                            <div className="boxItem">
                                <div >
                                    <h5>{item.resultNumber}</h5>
                                </div>
                                <div >
                                    <h5>{item.name}</h5>
                                </div>
                            </div>
                            <div className="boxItem">
                                <h5>{item.distance}</h5>
                            </div>
                            <div className="boxItem">
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default SearchResultControl;