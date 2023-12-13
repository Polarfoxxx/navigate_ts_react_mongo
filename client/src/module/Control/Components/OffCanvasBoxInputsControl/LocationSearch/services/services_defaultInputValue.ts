import { Type_Addrress } from "../../../../../Container"; 
type CoordinateType = {
    address: Type_Addrress;
};

function services_defaultInputValue<T extends CoordinateType>(index: number, array: T[]): string {
    if (index >= 0 && index < array.length) {
        return array[index].address.label;
    } else {
        return "";
    }
};

export default services_defaultInputValue;