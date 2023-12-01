
type CoordinateType = {
    address: string;
};

function services_defaultInputValue<T extends CoordinateType>(index: number, array: T[]): string {
    if (index >= 0 && index < array.length) {
        return array[index].address;
    } else {
        return "";
    }
};

export default services_defaultInputValue;