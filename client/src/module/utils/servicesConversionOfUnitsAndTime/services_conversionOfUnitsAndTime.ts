import moment from "moment";
import convert from 'convert';
import { Type_forServices_conversionOfUnitsAndTime } from "./types";

const SERVICES_CONVERSION_OF_UNIT_AND_TIME = {
    services_conversionOfUnits,
    services_conversionOfTime
};
export default SERVICES_CONVERSION_OF_UNIT_AND_TIME;

/* convektor pre vzdialenost */
function services_conversionOfUnits(props: Type_forServices_conversionOfUnitsAndTime): string {
    const TOTAL_DISTANCE = props.total_value;
    if (props.units_type === "m") {
        if (TOTAL_DISTANCE >= 1000) {
            const CONVERT_VALUE = convert(TOTAL_DISTANCE, "m").to("kilometer");
            return `${Math.round(CONVERT_VALUE).toFixed(1).toString()} km`
        } else {
            return `${Math.round(TOTAL_DISTANCE).toFixed(1).toString()} m`
        };
    } else if (props.units_type === "km") {
        if (TOTAL_DISTANCE < 1000) {
            const CONVERT_VALUE = convert(TOTAL_DISTANCE, "kilometer").to("m");
            return `${Math.round(CONVERT_VALUE).toFixed(1).toString()} m`

        } else {
            return `${Math.round(TOTAL_DISTANCE).toFixed(1).toString()} km`
        };
    };
    return ""
};

/* convektor pre time */
function services_conversionOfTime(props: Type_forServices_conversionOfUnitsAndTime): string {
    const CONVERS_ONTHE_MIN = Math.round((props.total_value / 60));
    const TIME = moment.duration(CONVERS_ONTHE_MIN, 'minutes');
    const HOURS = Math.floor(TIME.asHours());
    const MINUTES = TIME.minutes();
    if (HOURS === 0) {
        return `${MINUTES} min`
    } else {
        return `${HOURS}hod, ${MINUTES}min`
    };
};


