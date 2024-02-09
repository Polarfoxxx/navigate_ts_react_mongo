import React from "react";
import "./routeBussSeaControl.style.css"
import { UseChangeContextDATA } from "../../../../../hooks";
import { Container, Type_RouteBussinesControl } from "../../../../../Container";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import SIC_Codes from "../../../../../utils/SIC/SIC_code.json";

function RouteBussinessSearcheControl(): JSX.Element {
    const { sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ sideWays_DATA, setSideWays_DATA });
    const { handleSubmit, reset } = useInputValue();


    const submit = (v: TypeForInputsObject["v"]): void => {
        const UPDATE_SIC_DATA: Type_RouteBussinesControl = {
            type: v[0].inputValues as string,
            width: v[1].inputValues as string,
            bufferedWidth: v[2].inputValues as string,
            numResult: v[3].inputValues as string,
            ambiguities: v[4].inputValues as "Ignore" | "Allow"
        };
        const UPDATE_DATA = {
            ...mapBussines_Category,
            typeSearch: "RouteBussinessSearche",
            status: true,
            SIC_Data: UPDATE_SIC_DATA,
        };

        updateContext_DATA([
            { newData: UPDATE_DATA, key: "mapBussines_Category" },
        ]);
    };


    /* clear form bussines */
    const handleClickClearFunctuon = () => {
        const UPDATE_DATA = {
            ...mapBussines_Category,
            status: false,
            popupStatus: false,
        };
        updateContext_DATA([
            { newData: UPDATE_DATA, key: "mapBussines_Category" },
        ]);
    };

    return (
        <div className="routeContent">
            <form
                onSubmit={(e) => handleSubmit(e, submit)}>
                <div className="selectorBoxBussines">
                    <label htmlFor="typeBussines">Type Bussines</label>
                    <select name='typeBussines' className="typeBussines" defaultValue="Restaurants" >
                        {
                            Object.keys(SIC_Codes).map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="routeControl ">
                    <label htmlFor="Width">Width</label>
                    <input
                        defaultValue={0.1}
                        step="0.1"
                        name='width'
                        min={0}
                        max={2}
                        id="inpOneRadius"
                        placeholder="Width search"
                        type="number" />
                </div>
                <div className="routeControl ">
                    <label htmlFor="routeBufferedWidth">Buffered Width</label>
                    <select name='routeBufferedWidth' className="routeBufferedWidth" id="routeBufferedWidth" defaultValue="0.25" >
                        <option value="0.25">0.25</option>
                        <option value="0.5">0.5</option>
                        <option value="0.75">0.75</option>
                        <option value="1">1</option>
                    </select>
                </div>
                <div className="routeControl ">
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
                <div className="routeControl  ">
                    <label htmlFor="selectorIgAll">Matching of entries</label>
                    <select name='selectorIgAll' className="mySelector" id="selectorIgAll" defaultValue="Ignore" >
                        <option value="Ignore">Ignore</option>
                        <option value="Allow">Allow</option>
                    </select>
                </div>
                <div className="routeControltButtonBox">
                    <div className="submitBoxButton">
                        <button type='submit'>Search</button>
                    </div>
                    <div className="resetBoxButton">
                        <button onClick={() => { reset(); handleClickClearFunctuon() }}>
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RouteBussinessSearcheControl;


