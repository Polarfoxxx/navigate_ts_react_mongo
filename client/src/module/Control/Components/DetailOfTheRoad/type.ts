import { Type_For_Direction, Type_ArrayALLRoute } from "../../../Container";
import { Type_LatLng } from "../../../Container";

export type Type_For_Direction_item = {
   all_directions: Type_For_Direction[],
   all_coordinate: Type_LatLng[]
};

export type Type_for_totalInfo = {
   nameRoads: string,
   totalDistance: number,
   totalTime: number
};

export type Type_forDetailOfTheRoad = {
   oneRoute: Type_ArrayALLRoute,
   active: number | null,
   index: number
};

export type Type_State_DetailOfTheRoad = {
   all_directions: Type_For_Direction[],
   all_coordinate: Type_LatLng[],
   total_Info: Type_for_totalInfo,
};

export type Type_Action_DetailOfTheRoad =
   | { type: 'SET_ALL_DIRECTION'; payload: Type_For_Direction[] }
   | { type: 'SET_ALL_COORDINATE'; payload: Type_LatLng[] }
   | { type: 'SET_TOTAL_INFO'; payload: Type_for_totalInfo };

