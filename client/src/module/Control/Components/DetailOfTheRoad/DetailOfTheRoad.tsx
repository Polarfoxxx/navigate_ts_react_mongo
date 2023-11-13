import React from "react";
import "./detailOfTheRoad.style.css"
import { Type_For_Direction, Type_LatLng } from "../../../Container";
import { Type_forDetailOfTheRoad, Type_State_DetailOfTheRoad, Type_Action_DetailOfTheRoad } from "./type";
import { DetailOTRitem, SERVICES_CONVERSION_OF_UNIT_AND_TIME } from "../index";
import { DEFAULT_VALUE_FOR_REDUCER } from "./defaultValue";
import clsx from "clsx";
 

const reducer = (state: Type_State_DetailOfTheRoad, action: Type_Action_DetailOfTheRoad) => {
   switch (action.type) {
      case 'SET_ALL_DIRECTION':
         return { ...state, all_directions: action.payload };
      case 'SET_ALL_COORDINATE':
         return { ...state, all_coordinate: action.payload };
      case 'SET_TOTAL_INFO':
         return { ...state, total_Info: action.payload };
      default:
         return state;
   };
};

function DetailOfTheRoad({ oneRoute, active, index }: Type_forDetailOfTheRoad): JSX.Element {
   const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER);

   React.useEffect(() => {
      const UPDATE_DATA = {
         nameRoads: oneRoute.nameRoutes,
         totalDistance: oneRoute.totalDistance,
         totalTime: oneRoute.totalTime
      };
      dispatch({ type: "SET_TOTAL_INFO", payload: UPDATE_DATA });

      /* nastavenie pre decko OTR_item */
      const newDirections: Type_For_Direction[] = oneRoute.instructions;
      const newCoordinate: Type_LatLng[] = oneRoute.coordinates;

      dispatch({ type: "SET_ALL_DIRECTION", payload: newDirections });
      dispatch({ type: "SET_ALL_COORDINATE", payload: newCoordinate });
   }, [oneRoute]);



   return (
      <div className="detailOfTheRoad">
         <div
            style={active === index ? { backgroundColor: "rgb(106, 255, 0)" } : { backgroundColor: "rgb(107, 107, 107)" }}
            className="detailOfTheRoad_header">
            <h2>Direction for the route - {state.total_Info.nameRoads}</h2>
         </div>
         <div className="detailOfTheRoad_totalInfo">
            <div className="totalDis">
               <span className="disSpan">Total Distance:</span>
               <p>{SERVICES_CONVERSION_OF_UNIT_AND_TIME.services_conversionOfUnits(state.total_Info?.totalDistance)}</p>
            </div>
            <div>
               <span className="timeSpan">Total Time:</span>
               <p>{SERVICES_CONVERSION_OF_UNIT_AND_TIME.services_conversionOfTime(state.total_Info?.totalTime)}</p>
            </div>
         </div>
         <div className="direction_box">
            <DetailOTRitem
               all_coordinate={state.all_coordinate}
               all_directions={state.all_directions} />
         </div>
      </div>
   );
};

export default React.memo(DetailOfTheRoad)