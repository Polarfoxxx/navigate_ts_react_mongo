import { Type_CityInfo_RAW_Data } from "../../../../../API";
import { Type_IRow } from "../types";

;

function services_ChangeTheObjectForTheTable(props: Type_CityInfo_RAW_Data[]): Type_IRow[] {
    const UPDATE_OBJECT = props.map(item => {
        return (
            {
                name: item.name,
                population: item.population,
                countryName: item.country.name,
                countryId: item.country.id,
                adminDivision1Name:  item.adminDivision1.name,
                coodrinate: `${item.coordinates.latitude}, ${item.coordinates.longitude}`
            }
            
        )
    });
    return UPDATE_OBJECT
};

export default services_ChangeTheObjectForTheTable;