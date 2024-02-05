import React from "react";
import "./detailOfTheRoad.style.css"
import { Type_For_Direction, Type_LatLng } from "../../../Container";
import { Type_forDetailOfTheRoad, Type_State_DetailOfTheRoad, Type_Action_DetailOfTheRoad } from "./type";
import { DetailOTRitem, SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS } from "../index";
import { DEFAULT_VALUE_FOR_REDUCER } from "./defaultValue";

/* --------------------------------------- */
const reducer = (state: Type_State_DetailOfTheRoad, action: Type_Action_DetailOfTheRoad) => {
   switch (action.type) {
      case "SET_ALL_DIRECTION":
         return { ...state, all_directions: action.payload };
      case "SET_ALL_COORDINATE":
         return { ...state, all_coordinate: action.payload };
      case "SET_TOTAL_INFO":
         return { ...state, total_Info: action.payload };
      default:
         return state;
   };
};
/* --------------------------------------- */
function DetailOfTheRoad({ oneRoute, active, index }: Type_forDetailOfTheRoad): JSX.Element {
   const [state, dispatch] = React.useReducer(reducer, DEFAULT_VALUE_FOR_REDUCER);
const directionBoxReff = React.useRef<HTMLDivElement | null>(null);

   /* data cesty */
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

/* scrool effekt */

const handleOnsccroll = (): void => {
   if(directionBoxReff.current) {
      directionBoxReff.current.scrollTop += 43
   };
};


   return (
      <div className="detailOfTheRoad">
         <div
            className={active === index ?  "detailOfTheRoad_header active"  :  "detailOfTheRoad_header" }>
               <div className="detailOfTheRoadHead_Content">
               <h2>{state.total_Info.nameRoads}</h2>
               </div>
         </div>
         <div className="detailOfTheRoad_totalInfo">
            <div className="totalDis">
               <span className="disSpan">Total Distance:</span>
               <p>{CONVER_UNITS.services_conversionOfUnits({ total_value: state.total_Info?.totalDistance, units_type: "m" })}</p>
            </div>
            <div className="totalTime">
               <span className="timeSpan">Total Time:</span>
               <p>{CONVER_UNITS.services_conversionOfTime({ total_value: state.total_Info?.totalTime, units_type: "min" })}</p>
            </div>
         </div>
         <div 
         ref={directionBoxReff}
         className="direction_box">
            <DetailOTRitem
               all_coordinate={state.all_coordinate}
               all_directions={state.all_directions} />
         </div>
         <div className="detailRoadScroolBtn">
            <button onClick={handleOnsccroll}>Scrool</button>
         </div>
      </div>
   );
};

export default React.memo(DetailOfTheRoad)