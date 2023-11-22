


enum POI_Category_Code {
    Restaurants = 581208,
    Pubs = 581305,
    Shopping = 651201,
    Caffes = 581214,
    Bars = 581301,
};

function services_POIcode_bussines(bussines: string): number {

    switch (bussines) {
        case "Restaurants":
            return POI_Category_Code.Restaurants;
        case "Pubs":
            return POI_Category_Code.Pubs;
        case "Shopping":
            return POI_Category_Code.Shopping;
        case "Caffes":
            return POI_Category_Code.Caffes;
        case "Bars":
            return POI_Category_Code.Bars;
        default:
            return 0
    };
};

export default services_POIcode_bussines;