import { Type_CityInfo_RAW_Data } from "../../../../API";


export type Type_forLocationInfoResult = {
    respoDATA: Type_CityInfo_RAW_Data[]
};

export type Type_IRow =  {
    name: string,
    population: number,
    countryName: string,
    countryId: string,
    adminDivision1Name: string,
    coodrinate: string
};
