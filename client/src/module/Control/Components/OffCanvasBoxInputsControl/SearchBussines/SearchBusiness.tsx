import React from "react";
import "./searchBusinness.style.css";
import { OnePointBussinessSearcheControl, RouteBussinessSearcheControl, NoContent } from "../..";
import { Container } from "../../../../Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { SearchResultControl } from "../..";


function SearchBusiness(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context)
    const { startPoints, endPoints } = location_DATA
    const [searchCompContent, setSearchCompContent] = React.useState<JSX.Element[] | JSX.Element | null>(null);
    const [resultState, setResultState] = React.useState(false)

    /* aky kontet sa ma zobrazit rozdelenie jedneho bodu alebo cesty */
    React.useEffect(() => {
        if (startPoints.latLng[0] && !endPoints.latLng[0]) {
            setSearchCompContent([<OnePointBussinessSearcheControl />, <SearchResultControl />])
        } else if (startPoints.latLng[0] && endPoints.latLng[0]) {
            setSearchCompContent([<RouteBussinessSearcheControl />, <SearchResultControl />])
        } else {
            setSearchCompContent(<NoContent />)
        }
    }, [startPoints.latLng[0], !endPoints.latLng[0]]);


    /* vyskakovacie okno result */
    const handleResultClick = () => {
        setResultState(!resultState)
    }

    return (
        <div className="searchBox">
            <header>
                <div className="searchBoxTittle">
                    <h4>Searche bussines</h4>
                </div>
                <div className="searchBoxbutton">
                    {
                        /* podmienja */
                        <button onClick={handleResultClick}>
                            <div>
                                {
                                    resultState ? (
                                        <span> <FontAwesomeIcon icon={faArrowLeftLong} size="lg" /> Searche</span>
                                    ) : (
                                        <span>Result <FontAwesomeIcon icon={faArrowRightLong} size="lg" /> </span>
                                    )
                                }
                            </div>
                        </button>
                    }
                </div>
            </header>
            <section>
                <div
                    style={resultState ? { transform: "translateX(-50%)" } : { transform: "translateX(0)" }}
                    className="sectionContent">
                    {
                        searchCompContent
                    }
                </div>

            </section>
        </div>

    )
};

export default SearchBusiness;
