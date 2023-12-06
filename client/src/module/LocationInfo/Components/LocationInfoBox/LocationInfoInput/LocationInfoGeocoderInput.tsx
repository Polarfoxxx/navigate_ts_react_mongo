import React from "react";
import { GeocoderInputSearche } from "../../../../Geocoder";
import { Container } from "../../../../Container";
import { UseChangeContextDATA } from "../../../../hooks";
import { DEFAULT_VALUE_FOR_REDUCER_CONTROL_INPUT_SEARCH } from "../../../../Control";
import { Type_State_ControlnputsSearche, Type_Action_ControlnputsSearche } from "../../../../Control";

const reducer = (state: Type_State_ControlnputsSearche, action: Type_Action_ControlnputsSearche) => {
    switch (action.type) {
        case 'SET_QUERY':
            return { ...state, query: action.payload };
        case 'SET_RESULT':
            return { ...state, results: action.payload };
        case 'SET_RESULT_OPEN':
            return { ...state, isResultsOpen: action.payload };
        default:
            return state;
    };
};

function LocationInfoGeocoderInput(): JSX.Element {
    const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
    const { arrayALL_coordinate } = location_DATA;
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
    const geocoderService = new GeocoderInputSearche();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const timeoutRef = React.useRef<number | null>(null);
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER_CONTROL_INPUT_SEARCH);



    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        dispatch({ type: "SET_QUERY", payload: inputText })

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        };
        timeoutRef.current = window.setTimeout(async () => {
            if (inputText.length >= 3) {
                const autoResults = await geocoderService.autoComplete(inputText);
                dispatch({ type: "SET_RESULT", payload: autoResults });
                dispatch({ type: "SET_RESULT_OPEN", payload: true });
            } else {
                dispatch({ type: "SET_RESULT", payload: [] });
                dispatch({ type: "SET_RESULT_OPEN", payload: false });
            }
        }, 1000); // Delay (1500 ms) for autocomplete
    };



    const handleAddressClick = async (address: string) => {
        const coordinates = await geocoderService.getCoordinatesForAddress(address);
    };




    return (
        <div className="geocoderLocationBox">
            <form action="">
                <div className="inputAndButtonBox">
                    <input
                        className="geoInput"
                        ref={inputRef}
                        type="text"
                        placeholder="Enter address"
                        value={state.query}
                        autoComplete="off"
                        onChange={handleInputChange}
                        onFocus={() => dispatch({ type: "SET_RESULT_OPEN", payload: true })} />

                </div>

                {state.isResultsOpen && state.results.length > 0 && (
                    <ul className="ul_result">
                        {state.results.map((result: string, index: number) => (
                            <li key={index} onClick={() => handleAddressClick(result)}>
                                {result}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default LocationInfoGeocoderInput;