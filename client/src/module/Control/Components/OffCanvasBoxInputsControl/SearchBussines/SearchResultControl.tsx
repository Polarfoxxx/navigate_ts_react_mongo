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
const selectItem_ref = React.useRef<number>();

    React.useEffect(() => {
        if (mapBussines_Category.allResultDATA !== undefined && mapBussines_Category.allResultDATA !== null) {
            setBussinesDATA(mapBussines_Category.allResultDATA)
        }
    }, [mapBussines_Category.allResultDATA])


    const handleSelectItem = (item: Type_SearchRespo_clearDATA_Circle, key:number) => {
        selectItem_ref.current = key;

        /* voalnie geocoderu pre nastavenie koncoveho bodu */
        geocoder_coordSearche([item.fields.lat, item.fields.lng])
            .then(data => {
                updateContext_DATA([
                    { newData: data, key: "endPoints" },
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
                        className={key === selectItem_ref.current ? "searcheItemActive": "searcheItemDeactive"}
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