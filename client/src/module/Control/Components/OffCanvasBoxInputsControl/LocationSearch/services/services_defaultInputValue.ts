import { Type_CoordinateType } from "./types";


function services_defaultInputValue<T extends Type_CoordinateType>(index: number, array: T[]): string {
    if (index >= 0 && index < array.length) {
        return array[index].address.label;
    } else {
        return "";
    }
};

export default services_defaultInputValue;