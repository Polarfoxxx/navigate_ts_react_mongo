

export type Type_for_TraficIncidents = {
    id: string;
    type: number;
    severity: number;
    eventCode: number;
    lat: number;
    lng: number;
    startTime: string;
    endTime: string;
    impacting: boolean;
    shortDesc: string;
    fullDesc: string;
    delayFromFreeFlow: number;
    delayFromTypical: number;
    distance: number;
    iconURL: string;
    parameterizedDescription: Record<string, any>;
};


export type Type_CoordAllRoads_LatLng = {
    lat: number;
    lng: number;
  }[];
  
  export type Type_MostedCoordinate_Arr = {
    norther_western: number[],
    south_east: number[]
  };

