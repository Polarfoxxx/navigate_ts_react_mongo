import React from "react";
import "./routeBussSeaControl.style.css"


function RouteBussinessSearcheControl(): JSX.Element {

    const [selectedValue, setSelectedValue] = React.useState('');






    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };




    return (
        <div className="onePointContent">
            <div className="onePoint oneRadius">
                <label htmlFor="inpOneRadius">Search size radius</label>
                <input
                    min={2}
                    max={10}
                    id="inpOneRadius"
                    placeholder="Radius search"
                    type="number" />
            </div>
            <div className="onePoint oneRadius">
                <label htmlFor="inpOneRadius">Search size radius</label>
                <input
                    min={2}
                    max={10}
                    id="inpOneRadius"
                    placeholder="Radius search"
                    type="number" />
            </div>
            <div className="onePoint oneMaxMatches">
                <label htmlFor="oneMaxMatches">Number of results (max 100)</label>
                <input
                    id="oneMaxMatches"
                    max={100}
                    min={1}
                    placeholder="Max number of subjects"
                    type="number" />
            </div>
            <div className="onePoint oneAmbiguities ">
                <label htmlFor="mySelector">Matching of entries</label>
                <select className="mySelector" id="mySelector" value={selectedValue} onChange={handleSelectChange}>
                    <option value="option1">Ignore</option>
                    <option value="option3">Allow</option>
                </select>

            </div>
        </div>
    )
};

export default RouteBussinessSearcheControl
