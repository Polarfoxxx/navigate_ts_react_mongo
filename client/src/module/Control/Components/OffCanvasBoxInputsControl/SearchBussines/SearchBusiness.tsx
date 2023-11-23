import React from "react";
import "./searchBusinness.style.css";
import { OnePointBussinessSearcheControl, RouteBussinessSearcheControl, NoContent } from "../..";
import { Container } from "../../../../Container";
import {SearchResultControl} from "../..";

function SearchBusiness(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context)
    const { startPoints, endPoints } = location_DATA
    const [searchCompContent, setSearchCompContent] = React.useState<JSX.Element | null>(null);


    /* aky kontet sa ma zobrazit rozdelenie jedneho bodu alebo cesty */
    React.useEffect(() => {
        if (startPoints.latLng[0] && !endPoints.latLng[0]) {
            setSearchCompContent(<OnePointBussinessSearcheControl />)
        } else if (startPoints.latLng[0] && endPoints.latLng[0]) {
            setSearchCompContent(<RouteBussinessSearcheControl />)
        } else {
            setSearchCompContent(<NoContent />)
        }
    }, [startPoints.latLng[0], !endPoints.latLng[0]]);


    return (
        <div className="searchBox">
            <header>
                <h4>Searche bussines</h4>
            </header>
            <section>
                {
                    searchCompContent
                }
            </section>
        </div>

    )
};

export default SearchBusiness;
