import React from "react";
import "./searchBusinness.style.css";
import { OnePointBussinessSearcheControl, RouteBussinessSearcheControl, NoContent } from "../";
import { Container } from "../../../Container";

function SearchBusiness(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context)
    const { startPoints, endPoints } = location_DATA;
    const [selectedValue, setSelectedValue] = React.useState('');
    const [searchCompContent, setSearchCompContent] = React.useState<JSX.Element | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    React.useEffect(() => {
        if (startPoints.latLng[0] && !endPoints.latLng[0]) {
            setSearchCompContent(<OnePointBussinessSearcheControl />)
        } else if(startPoints.latLng[0]  && endPoints.latLng[0]) {
            setSearchCompContent(<RouteBussinessSearcheControl />)
        }else {
            setSearchCompContent(<NoContent />)
        }
    }, [startPoints.latLng[0], !endPoints.latLng[0]]);


    return (
        <div className="searchBox">
            <header>
                <h4>Searche bussinnes</h4>
            </header>
            <section>
                <div className="selectorBox">
                    <select className="mySelector" value={selectedValue} onChange={handleSelectChange}>
                        <option value="option1">Restaurants</option>
                        <option value="option2">Pubs</option>
                        <option value="option3">Shopping</option>
                        <option value="option3">Caffes</option>
                        <option value="option3">Bars</option>
                    </select>

                </div>
                <div className="searchComponentsBox">
                    {
                        searchCompContent
                    }

                </div>
            </section>
            <footer>
                {
                    startPoints.latLng[0] && <button>send</button>
                }


            </footer>
        </div>

    )
};

export default SearchBusiness;
