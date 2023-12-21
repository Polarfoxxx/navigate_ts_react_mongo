import { Type_CityInfo_RAW_Data } from "../../../../../API";
import { Type_IRow } from "../types";

function services_ChangeTheObjectForTheTable(api_data: Type_CityInfo_RAW_Data[]): Type_IRow[] {
    if (api_data) {
        const UPDATE_OBJECT = api_data.map(item => {
            return (
                {
                    type: item.type,
                    name: item.name,
                    population: item.population,
                    countryName: item.country.name,
                    countryId: item.country.id,
                    adminDivision1Name: item.adminDivision1.name,
                    coodrinate: `${item.coordinates.latitude}, ${item.coordinates.longitude}`
                }

            )
        });
        return UPDATE_OBJECT
    }
    return [];
};

export default services_ChangeTheObjectForTheTable;