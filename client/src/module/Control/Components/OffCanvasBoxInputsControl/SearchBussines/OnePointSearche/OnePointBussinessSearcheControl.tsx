import React from "react";
import "./onePointBussSearchCon.style.css";
import { UseChangeContextDATA } from "../../../../../hooks";
import { Container } from "../../../../../Container";
import { useInputValue } from "foxxy_input_value";
import { TypeForInputsObject } from "foxxy_input_value/dist/hooks/types/types";
import { Type_OnePointBussinesControl } from "../../../../../Container";
import SIC_Codes from "../../../../../utils/SIC/SIC_code.json";


function OnePointBussinessSearcheControl(): JSX.Element {
    const { sideWays_DATA } = React.useContext(Container.Context);
    const { mapBussines_Category } = sideWays_DATA;
    const { updateContext_DATA } = UseChangeContextDATA();
    const { handleSubmit, reset } = useInputValue();

    /* submit odoslanie formulara */
    const submit = (v: TypeForInputsObject["v"]): void => {
        const UPDATE_SIC_DATA: Type_OnePointBussinesControl = {
            type: v[0].inputValues as string,
            area: v[1].inputValues as string,
            numResult: v[2].inputValues as string,
            ambiguities: v[3].inputValues as "Ignore" | "Allow"
        };
        const UPDATE_DATA = {
            ...mapBussines_Category,
            typeSearch: "OnePointBussinessSearche",
            status: true,
            popupStatus: false,
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
        <div className="onePointContent">
            <form
                onSubmit={(e) => handleSubmit(e, submit)}>
                <div className="selectorBoxBussines">
                    <label htmlFor="typeBussines">Type Bussines</label>
                    <select name='typeBussines' className="typeBussines" defaultValue="Restaurants">
                        {
                            Object.keys(SIC_Codes).map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="onePoint">
                    <label htmlFor="inpOneArea">Searching in the area (km)</label>
                    <input
                        step="0.1"
                        defaultValue={1}
                        name='inpOneArea'
                        min={0.1}
                        max={3}
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
                        <button type='submit'>
                            Search
                        </button>
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

export default OnePointBussinessSearcheControl;