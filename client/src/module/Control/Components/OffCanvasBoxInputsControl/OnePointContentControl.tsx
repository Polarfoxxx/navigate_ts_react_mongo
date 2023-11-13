import React from "react";


function OnePointBussinessSearcheControl(): JSX.Element {

    // State to manage the selected value
    const [selectedValue, setSelectedValue] = React.useState('');

    // Handler function to update the selected value
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div className="onePointContent">
            <div className="onePoint oneRadius">
                <input
                    placeholder="Radius search"
                    type="number" />
            </div>
            <div className="onePoint oneMaxMatches">
                <input
                    max={100}
                    placeholder=" max number of subjects"
                    type="number" />
            </div>
            <div className="onePoint oneAmbiguities ">
                <select className="mySelector" value={selectedValue} onChange={handleSelectChange}>
                    <option value="">Select...</option>
                    <option value="option1">Ignore</option>
                    <option value="option3">Allow</option>
                </select>

            </div>
        </div>
    );
};

export default OnePointBussinessSearcheControl;