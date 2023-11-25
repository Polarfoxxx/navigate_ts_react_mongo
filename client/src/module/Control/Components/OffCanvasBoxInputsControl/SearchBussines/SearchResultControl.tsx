import React from "react";
import "./searchResultControl.style.css"
import { Container } from "../../../../Container";
import { Type_SearchRespo_clearDATA_Circle } from "../../../../Container";

function SearchResultControl(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const [bussinesDATA, setBussinesDATA] = React.useState<Type_SearchRespo_clearDATA_Circle[]>([]);


    React.useEffect(() => {
        if(mapBussines_Category.allResultDATA !== undefined && mapBussines_Category.allResultDATA !== null) {
            setBussinesDATA(mapBussines_Category.allResultDATA)
        }
    }, [mapBussines_Category.allResultDATA])


    return (
        <div className="searchResultControl">
            <div className="searchResultBox">
            { 
                 bussinesDATA.map((item, key) => 
                        <div
                        key={key}>
                            <div>
                                <h5>{item.name}</h5>
                            </div>
                        </div>
                        )
             } 
            </div>
     
        </div>
    );
};

export default SearchResultControl;