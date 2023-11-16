import React from "react";
import "./onePointBussSearchCon.style.css";
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { Type_OnePointBussinesControl } from "../../../Container";


function OnePointBussinessSearcheControl(): JSX.Element {
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context)
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const { handleSubmit, reset } = useInputValue();


    const submit = (v: TypeForInputsObject["v"]): void => {

        const UPDATE_POI: Type_OnePointBussinesControl = {
            type: v[0].inputValues as string,
            area: v[1].inputValues as string,
            numResult: v[2].inputValues as string,
            ambiguities: v[3].inputValues as "Ignore" | "Allow"
        }

        const UPDATE_DATA = {
            typeSearch: "OnePointBussinessSearche",
            status: true,
            POI_Data: UPDATE_POI,
            typePOI: typeof UPDATE_POI
        };


        updateContext_DATA([
            { newData: UPDATE_DATA, key: "mapBussines_Category" },
        ])
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
                <div className="onePoint">
                    <label htmlFor="inpOneArea">Searching in the area (m)</label>
                    <input
                        defaultValue={1000}
                        name='inpOneArea'
                        min={0}
                        max={8000}
                        id="inpOneArea"
                        placeholder="Area"
                        type="number" />
                </div>
                <div className="onePoint">
                    <label htmlFor="oneMaxMatches">Number of results (max 100)</label>
                    <input
                        defaultValue={20}
                        name='oneMaxMatches'
                        id="oneMaxMatches"
                        max={100}
                        min={1}
                        placeholder="Max number of subjects"
                        type="number" />
                </div>
                <div className="onePoint">
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