import React from "react";
import "./routeBussSeaControl.style.css"
import { UseChangeContextDATA } from "../../../hooks";
import { Container } from "../../../Container";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";



function RouteBussinessSearcheControl(): JSX.Element {
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context)
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const { handleSubmit, reset } = useInputValue();



    const submit = (v: TypeForInputsObject["v"]): void => {
        console.log(v);

        const UPDATE_DATA = {
            status: true,
            POI_Data: {
                type: v[0].inputValues,
                width: v[1].inputValues,
                bufferedWidth: v[2].inputValues,
                numResult: v[3].inputValues,
                ambiguities: v[4].inputValues
            }
        };
        updateContext_DATA([
            { newData: UPDATE_DATA, key: "mapBussines_Category" },
        ])
    };


    return (
        <div className="routeContent">
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
                <div className="routeControl routeWidth">
                    <label htmlFor="Width">Width</label>
                    <input
                        defaultValue={1}
                        name='width'
                        min={0}
                        max={10}
                        id="inpOneRadius"
                        placeholder="Radius search"
                        type="number" />
                </div>
                <div className="routeControl routeBufferedWidth">
                    <label htmlFor="routeBufferedWidth">Buffered Width</label>
                    <select name='routeBufferedWidth' className="routeBufferedWidth" id="routeBufferedWidth" defaultValue="0.25" >
                        <option value="0.25">0.25</option>
                        <option value="0.5">0.5</option>
                        <option value="0.75">0.75</option>
                        <option value="1">1</option>
                    </select>
                </div>
                <div className="routeControl oneMaxMatches">
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
                <div className="routeControl routeAmbiguities ">
                    <label htmlFor="selectorIgAll">Matching of entries</label>
                    <select name='selectorIgAll' className="mySelector" id="selectorIgAll" defaultValue="Ignore" >
                        <option value="Ignore">Ignore</option>
                        <option value="Allow">Allow</option>
                    </select>
                </div>
                <div className="routeControltButtonBox">
                    <div className="submitBoxButton">
                        <button type='submit'>submit</button>
                    </div>
                    <div className="resetBoxButton">
                        <button onClick={reset}>reset</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default RouteBussinessSearcheControl


