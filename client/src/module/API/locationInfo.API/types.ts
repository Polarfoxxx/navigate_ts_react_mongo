

export type Type_Coordinates = {
    latitude: number;
    longitude: number;
};

export type Type_Country = {
    id: string;
    geonameId: number;
    name: string;
};

export type Type_AdminDivision1 = {
    id: string;
    geonameId: number;
    name: string;
};

export type Type_AdminDivision2 = {
    id: string;
    geonameId: number;
    name: string;
};

export type Type_CityInfo_RAW_Data = {
    id: string;
    geonameId: number;
    type: string;
    name: string;
    population: number;
    elevation: number;
    timezoneId: string;
    country: Type_Country;
    adminDivision1: Type_AdminDivision1;
    adminDivision2: Type_AdminDivision2;
    score: number;
    coordinates: Type_Coordinates;
};
