import { Type_MostedCoordinate_Arr } from "../types";

function services_rectagleCoord_WinMap(rectagleCOORD: number[]): Type_MostedCoordinate_Arr[] {
  
const UPDATE_DATA = {
  norther_western: [rectagleCOORD[0],rectagleCOORD[1]],
  south_east: [rectagleCOORD[2],rectagleCOORD[3]]
};


  return [UPDATE_DATA];

};
export default services_rectagleCoord_WinMap;
