

type Type_for_services_setResponseDATA<T, K> = {
    KEY_REQUIRED: K[];
    RESPO_RAW_DATA: T[];
};

function services_setResponseDATA<T extends object, K extends keyof T>({ KEY_REQUIRED, RESPO_RAW_DATA }: Type_for_services_setResponseDATA<T, K>): Pick<T, K>[] {
    let respoARR: Pick<T, K>[] = [];

    for (const item of RESPO_RAW_DATA) {
        let result = {} as Pick<T, K>;

        for (const key of KEY_REQUIRED) {
            if (key in item) {
                result[key] = item[key];
            };
        };
        respoARR.push(result)
    };
    return respoARR;
};

export default services_setResponseDATA;




