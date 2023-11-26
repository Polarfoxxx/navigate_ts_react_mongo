import React from "react";
import "./searchResultControl.style.css"
import { Container } from "../../../../Container";
import { Type_SearchRespo_clearDATA_Circle } from "../../../../Container";
import { geocoder_coordSearche } from "../../../../Geocoder";

function SearchResultControl(): JSX.Element {
    const {location_DATA, sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA, {endPoints} = location_DATA;
    const [bussinesDATA, setBussinesDATA] = React.useState<Type_SearchRespo_clearDATA_Circle[]>([]);


    React.useEffect(() => {
        if (mapBussines_Category.allResultDATA !== undefined && mapBussines_Category.allResultDATA !== null) {
            setBussinesDATA(mapBussines_Category.allResultDATA)
        }
    }, [mapBussines_Category.allResultDATA])


const handleSelectItem =() => {
const UPDATE_DATA = {
    
}
}



    return (
        <div className="searchResultControl">
            <div className="searchResultBox">
                {
                    bussinesDATA.map((item, key) =>
                        <div
                        onClick={handleSelectItem}
                            className="searcheItem"
                            key={key}>
                            <div>
                                <div>
                                    <h5>{item.resultNumber}</h5>
                                </div>
                                <div>
                                    <h5>{item.name}</h5>
                                </div>
                            </div>
                            <div>
                                <h5>{item.distance}</h5>
                            </div>
                            <div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default SearchResultControl;