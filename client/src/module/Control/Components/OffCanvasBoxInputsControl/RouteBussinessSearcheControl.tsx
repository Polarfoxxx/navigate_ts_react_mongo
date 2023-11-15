import React from "react";
import "./routeBussSeaControl.style.css"
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";

function RouteBussinessSearcheControl(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context)
    const { startPoints, endPoints } = location_DATA, { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [selectedValue, setSelectedValue] = React.useState('');


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const UPDATE_DATA = {
            ...mapBussines_Category,
            type: event.target.value
        };

        updateContext_DATA([
            { newData: UPDATE_DATA, key: "sideWays_DATA" }
        ]);
    };


    return (
        <div className="routeContent">
            <div className="selectorBoxBussines">
                <select className="mySelector" value={selectedValue} onChange={handleSelectChange}>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Pubs">Pubs</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Caffes">Caffes</option>
                    <option value="Bars">Bars</option>
                </select>
            </div>
            <div className="route widthBuss">
                <label htmlFor="inpWidth">Width</label>
                <input
                    min={1}
                    max={10}
                    id="inpWidth"
                    placeholder="Width search"
                    type="number" />
            </div>
            <div className="route BuffWidth">
                <label htmlFor="bufferedWidth">Buffered Width</label>
                <input
                    min={0.25}
                    max={1}
                    id="bufferedWidth"
                    placeholder="Buffered Width"
                    type="number" />
            </div>
            <div className="route routeMaxMatches">
                <label htmlFor="roudMaxMatches">Number of results (max 100)</label>
                <input
                    id="roudMaxMatches"
                    max={100}
                    min={1}
                    placeholder="Max number of subjects"
                    type="number" />
            </div>
            <div className="route routeAmbiguities ">
                <label htmlFor="selectorIgAll">Matching of entries</label>
                <select className="mySelector" id="selectorIgAll" value={selectedValue} onChange={handleSelectChange}>
                    <option value="Ignore">Ignore</option>
                    <option value="Allow">Allow</option>
                </select>
            </div>
            <div className="routetButtonBox">
                {
                    startPoints.latLng[0] && <button>send</button>
                }
            </div>
        </div>
    )
};

export default RouteBussinessSearcheControl


