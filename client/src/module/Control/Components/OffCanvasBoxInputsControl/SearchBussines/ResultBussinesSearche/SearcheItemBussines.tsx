import React from "react";
import { SERVICES_CONVERSION_OF_UNIT_AND_TIME as CONVER_UNITS } from "../../../../../utils";
import { Type_forSearcheItemBussines, TypeFor_data_forSearcheItem } from "./types";
import { DEFAULT_VALUE_FOR_DATA_FOR_SEARCH_ITEM } from "./defaultValue";
import "./searchItemBussines.style.css";

function SearcheItemBussines(props : Type_forSearcheItemBussines): JSX.Element {
    const [data_forSearcheItem, setData_forSearcheItem ] = React.useState<TypeFor_data_forSearcheItem>(DEFAULT_VALUE_FOR_DATA_FOR_SEARCH_ITEM);

    React.useEffect(() => {
        setData_forSearcheItem({
            sicName: props.item.fields.group_sic_code_name,
            name: props.item.name,
            totalDistance: props.item.distance,
            phone: props.item.fields.phone
        });
    },[props.item])

    return (
        <div className="searcheBussinesItemBox">
            <div className="boxItem headBlock">
                <div className="headBlockTypename">
                    <h5 className="itemTittle">{data_forSearcheItem.sicName}</h5>
                </div>
                <div className="headBlockvalue bussinesName">
                    <h5>{data_forSearcheItem.name}</h5>
                </div>
            </div>
            <div className="boxItem bodyBlock">
                <div>
                    <h5 className="itemTittle">Distace</h5>
                </div>
                <div className="headBlockvalue">
                    <h5>{CONVER_UNITS.services_conversionOfUnits({ total_value: data_forSearcheItem.totalDistance, units_type: "km" })}</h5>
                </div>
            </div>
            <div className="boxItem footerBlock">
                <div>
                    <h5 className="itemTittle">Phone:</h5>
                </div>
                <div className="headBlockvalue">
                    <h5>{data_forSearcheItem.phone}</h5>
                </div>
            </div>
        </div>
    );
};

export default SearcheItemBussines;
