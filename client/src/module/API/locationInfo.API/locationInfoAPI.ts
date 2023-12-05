import axios from "axios";
import { Type_CityInfo_RAW_Data } from "./types";


async function locationInfoAPI(): Promise<Type_CityInfo_RAW_Data[]> {

    const options = {
        method: 'GET',
        url: 'https://spott.p.rapidapi.com/places',
        params: {
            type: 'CITY',
            skip: '0',
            country: 'US',
            limit: '100',

        },
        headers: {
            'X-RapidAPI-Key': '0bc4872ef5mshb5500d0485b302fp1bef17jsnf315a81a8a63',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        }
    };

    try {
        const RESPO_DATA = await axios.request(options);
        const RESPO_RAW_DATA: Type_CityInfo_RAW_Data[] = RESPO_DATA.data;
        return RESPO_RAW_DATA;
    } catch (error) {
        console.error(error);
        return []
    }
}

export default locationInfoAPI;