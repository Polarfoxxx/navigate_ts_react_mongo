
function services_changeNamefor_Label(input_ident: string | number): string {

    switch (input_ident) {
        case "start_point":
            return "Starting point:";
        case "end_point":
            return "Endpoint:";
        default:
            return "Add points:";
    };
};

export default services_changeNamefor_Label;