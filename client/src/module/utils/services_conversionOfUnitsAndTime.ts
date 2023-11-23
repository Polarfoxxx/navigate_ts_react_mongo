
const SERVICES_CONVERSION_OF_UNIT_AND_TIME = {
    services_conversionOfUnits,
    services_conversionOfTime
};
export default SERVICES_CONVERSION_OF_UNIT_AND_TIME;


function services_conversionOfUnits(totalDistance: number): string {

    if (totalDistance) {
        const ROUND_NUMBER = Math.round(totalDistance);
        const LENGTH_NUMBER = ROUND_NUMBER.toString().length;
        if (LENGTH_NUMBER > 4) {
            return `${Math.round(totalDistance / 1000).toFixed(1).toString()} km`
        };
    };
    return `${totalDistance.toString()} m`
};


function services_conversionOfTime(totalTime: number): string {

        if (totalTime >= 60) {
            return `${Math.round((totalTime / 60)).toString()} min`
        };

    return `${totalTime.toString()} s`
}
