import React from "react";
import "./onePointBussSearchCon.style.css";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { Type_OnePointBussinesControl } from "../../../Container";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";



function OnePointBussinessSearcheControl(): JSX.Element {
    const { location_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context)
    const { startPoints, endPoints } = location_DATA, { mapBussines_Category } = sideWays_DATA;
    const { handleSubmit, reset } = useInputValue();
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const [selectedValue, setSelectedValue] = React.useState('');
    const [searchBussines_DATA, setSearchBussines_DATA] = React.useState<Type_OnePointBussinesControl>({
        type: "",
        radius: 0,
        numResult: 0,
        ambiguities: "Ignore"
    })


    const submit = (v: TypeForInputsObject["v"]): void => {
        console.log(v);
        const UPDATE_DATA = {
            status: true,
            POI_Data: {
                type: "",
                radius: 0,
                numResult: 0,
                ambiguities: "Ignore"
            }
        };
    };



    return (
        <div className="onePointContent">
            <form
                onSubmit={(e) => handleSubmit(e, submit)}>
                <div className="selectorBoxBussines">
                    <label htmlFor="typeBussines">Type Bussines</label>
                    <select name='typeBussines' className="typeBussines" defaultValue="Restaurants" >
                        <option value="Restaurants">Restaurants</option>
                        <option value="Pubs">Pubs</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Caffes">Caffes</option>
                        <option value="Bars">Bars</option>
                    </select>
                </div>
                <div className="onePoint oneRadius">
                    <label htmlFor="inpOneRadius">Search size radius</label>
                    <input
                        defaultValue={1}
                        name='inpOneRadius'
                        min={0}
                        max={10}
                        id="inpOneRadius"
                        placeholder="Radius search"
                        type="number" />
                </div>
                <div className="onePoint oneMaxMatches">
                    <label htmlFor="oneMaxMatches">Number of results (max 100)</label>
                    <input
                        defaultValue={22}
                        name='oneMaxMatches'
                        id="oneMaxMatches"
                        max={100}
                        min={1}
                        placeholder="Max number of subjects"
                        type="number" />
                </div>
                <div className="onePoint oneAmbiguities ">
                    <label htmlFor="selectorIgAll">Matching of entries</label>
                    <select name='selectorIgAll' className="mySelector" id="selectorIgAll" defaultValue="Ignore" >
                        <option value="Ignore">Ignore</option>
                        <option value="Allow">Allow</option>
                    </select>
                </div>
                <div className="onePointButtonBox">
                    <div className="submitBoxButton">
                        <button type='submit'>submit</button>
                    </div>
                    <div className="resetBoxButton">
                        <button onClick={reset}>reset</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OnePointBussinessSearcheControl;