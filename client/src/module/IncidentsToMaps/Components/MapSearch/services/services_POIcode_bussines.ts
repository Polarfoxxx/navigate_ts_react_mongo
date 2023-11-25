import SIC_codes from "../../../../utils/SIC_code.json";

const SIC_code: { [key: string]: string } = SIC_codes

function services_POIcode_bussines(SIC_name: string): number {
    for (const key in SIC_code) {
        if (key === SIC_name) {
            const SIC_CODE_VALUE = SIC_code[key];
            return +SIC_CODE_VALUE;
        }
    }
    return 0;
}

export default services_POIcode_bussines;
