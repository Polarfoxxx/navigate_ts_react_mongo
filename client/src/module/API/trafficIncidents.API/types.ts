export type Type_RAW_Incidents_response = {
    delayFromFreeFlow: number;
    delayFromTypical: number;
    distance: number;
    endTime: string; // predpokladám, že ide o dátumový reťazec
    eventCode: number;
    fullDesc: string;
    iconURL: string;
    id: string;
    impacting: boolean;
    lat: number;
    lng: number;
    parameterizedDescription: {}; // prázdny objekt
    severity: number;
    shortDesc: string;
    startTime: string; // predpokladám, že ide o dátumový reťazec
    type: number;
  }
  