import { Type_location_DATA } from "../../../../Container";


function services_embeddingValuesInToInputs(location_DATA: Type_location_DATA) {

    if (location_DATA.startPoints.address) {
        const START_POITS = document.querySelector("#start_point") as HTMLInputElement;
        if (START_POITS) {
            START_POITS.value = location_DATA.startPoints.address
        };
    };

    if (location_DATA.endPoints.address) {
        const END_POITS = document.querySelector("#end_point") as HTMLInputElement;
        if (END_POITS) {
            END_POITS.value = location_DATA.endPoints.address
        };

        if (location_DATA.arrayALL_coordinate.length > 0) {
            let index = -1;
            const ALL_SIDEWAYS_POITS = location_DATA.arrayALL_coordinate;

            ALL_SIDEWAYS_POITS.forEach(item => {
                const INPUTS = document.querySelector(`#point${index.toString()}`) as HTMLInputElement;
                INPUTS.value = item.address;
                index = index + 1
            });
        };
    };
};

export default services_embeddingValuesInToInputs;



