import React from "react";
import "./controlnputsSearche.style.css";
import { Container } from "../../../../Container";
import { GeocoderInputSearche } from "../../../../Geocoder";
import { Type_forGeocoderInput, Type_Action_ControlnputsSearche, Type_State_ControlnputsSearche } from "../type";
import services_changeNamefor_Label from "./services/services_changeNamefor_Label";
import { UseChangeContextDATA } from "../../../../hooks";
import { DEFAULT_VALUE_FOR_REDUCER_CONTROL_INPUT_SEARCH } from "../defaultValue";
import { services_SetStart_End_Add_positionToObjekt } from "../../../../utils";


/* useReducer ----------------------------*/
const reducer = (state: Type_State_ControlnputsSearche, action: Type_Action_ControlnputsSearche) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_RESULT":
      return { ...state, results: action.payload };
    case "SET_RESULT_OPEN":
      return { ...state, isResultsOpen: action.payload };
    default:
      return state;
  };
};
/* useReducer ----------------------------*/

function ControlnputsSearche({ input_ident, input_value }: Type_forGeocoderInput) {
  const { location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA } = React.useContext(Container.Context);
  const { arrayALL_coordinate } = location_DATA;
  const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA, sideWays_DATA, setSideWays_DATA });
  const geocoderService = new GeocoderInputSearche();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER_CONTROL_INPUT_SEARCH);

  /* spustenie funkcie pri vyplneni inputu */
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const INPUT_TEXT = event.target.value;
    dispatch({ type: "SET_QUERY", payload: INPUT_TEXT })

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    };
    timeoutRef.current = window.setTimeout(async () => {
      if (INPUT_TEXT.length >= 3) {
        const AUTO_RESULT = await geocoderService.autoComplete(INPUT_TEXT);
        dispatch({ type: "SET_RESULT", payload: AUTO_RESULT });
        dispatch({ type: "SET_RESULT_OPEN", payload: true });
      } else {
        dispatch({ type: "SET_RESULT", payload: [] });
        dispatch({ type: "SET_RESULT_OPEN", payload: false });
      }
    }, 1000); // Delay (1500 ms) for autocomplete
  };


  /* vymazanie */
  const handleDeleteClick = (): void => {
    const UPDATE_DATA_START_END_ = {
      address: "",
      latLng: [],
    };
    const UPDATE_DATA_MAPBUSSINES = {
      typeSearch: "",
      status: false,
      POI_Data: null,
      dataMapBussines_froPopup: null,
      allResultDATA: null,
      select_Route_Bussines: 0
    };

    if (typeof input_ident === "number") {
      const NEW_DATA = arrayALL_coordinate;
      const INDEX = NEW_DATA.findIndex(objekt => objekt.identObject === input_ident);
      if (INDEX !== -1) {
        NEW_DATA.splice(input_ident, 1);
        // Zmena ident v objektoch
        for (let i = 0; i < NEW_DATA.length; i++) {
          NEW_DATA[i].identObject = i
        };
      };

      updateContext_DATA([
        { newData: NEW_DATA, key: "arrayALL_coordinate" },
      ]);
      dispatch({ type: "SET_QUERY", payload: "" })

    } else {
      if (input_ident === "start_point") {
        dispatch({ type: "SET_QUERY", payload: "" })
        updateContext_DATA([
          { newData: UPDATE_DATA_START_END_, key: "startPoints" },
          { newData: UPDATE_DATA_START_END_, key: "endPoints" },
          { newData: [], key: "arrayALL_coordinate" },
          { newData: [], key: "main_atl_route" },
          { newData: UPDATE_DATA_MAPBUSSINES, key: "mapBussines_Category" },
        ]);
      } else if (input_ident === "end_point") {
        dispatch({ type: "SET_QUERY", payload: "" })
        updateContext_DATA([
          { newData: UPDATE_DATA_START_END_, key: "endPoints" },
          { newData: [], key: "arrayALL_coordinate" },
          { newData: [], key: "main_atl_route" },
          { newData: UPDATE_DATA_MAPBUSSINES, key: "mapBussines_Category" },
        ]);
      };
    };
  };


  /* nastavenie mesta do inputov po kliku */
  React.useEffect(() => {
    dispatch({ type: "SET_QUERY", payload: input_value })
  }, [input_value]);


  /* zatvaranie ul okna ak kliknem vedla */
  React.useEffect(() => {
    const HANDLE_WIN_CLICK = (e: MouseEvent) => {
      const TARGET_ELEMENT = e.target as HTMLElement;
      if (
        TARGET_ELEMENT.className !== "ul_result" && // Klik mimo ulko
        !TARGET_ELEMENT.classList.contains("geoInput") // Klik na vstupní pole (input)
      ) {
        dispatch({ type: "SET_RESULT_OPEN", payload: false });
      };
    };
    window.addEventListener("click", HANDLE_WIN_CLICK);
    return () => {
      window.removeEventListener("click", HANDLE_WIN_CLICK);
    };
  }, []);


  /* nastavenie hodnot z geocodera */
  const handleAddressClick = async (address: string) => {
    const GEOCODER_DATA = await geocoderService.getCoordinatesForAddress(address);
    if (GEOCODER_DATA) {
      const GEO_DATA = {
        address: GEOCODER_DATA,
        latLng: [GEOCODER_DATA?.lat, GEOCODER_DATA?.lon]
      };

      updateContext_DATA([
        { newData: services_SetStart_End_Add_positionToObjekt({ location_DATA, sideWays_DATA, GEO_DATA, input_ident }), key: "location_DATA" }
      ]);
      dispatch({ type: "SET_RESULT_OPEN", payload: false }); // Zavřít seznam po výběru adresy
    }

  };



  return (
    <div className="geocoder-input-container">
      <label className="labelName" >
        {services_changeNamefor_Label(input_ident)}
      </label>

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
        <button
          className="resetButton"
          onClick={handleDeleteClick}>
          X
        </button>
      </div>
      {
        state.isResultsOpen && state.results.length > 0 && (
          <div className="ul_result">
<ul >
            {
              state.results.map((result: string, index: number) =>
                <li
                  key={index}
                  onClick={() => handleAddressClick(result)}>
                  {result}
                </li>
              )
            }
          </ul>
          </div>
        )}
    </div>
  );
}

export default ControlnputsSearche;