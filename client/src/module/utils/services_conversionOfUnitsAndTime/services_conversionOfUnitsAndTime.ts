import moment from "moment";
import { Type_forServices_conversionOfUnitsAndTime } from "./types";

const SERVICES_CONVERSION_OF_UNIT_AND_TIME = {
    services_conversionOfUnits,
    services_conversionOfTime
};
export default SERVICES_CONVERSION_OF_UNIT_AND_TIME;

/* convektor pre vzdialenost */
function services_conversionOfUnits(props: Type_forServices_conversionOfUnitsAndTime): string {
    if (props.total_value) {
        const ROUND_NUMBER = Math.round(props.total_value);
        const LENGTH_NUMBER = ROUND_NUMBER.toString().length;
        if (LENGTH_NUMBER >= 4 && props.units_type === "m") {
            return `${Math.round(props.total_value / 1000).toFixed(1).toString()} km`
        } else if (LENGTH_NUMBER < 4 && props.units_type === "m") {
            return `${ROUND_NUMBER.toString()} m`
        }
    };
    return `${props.total_value.toString()}`;
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


