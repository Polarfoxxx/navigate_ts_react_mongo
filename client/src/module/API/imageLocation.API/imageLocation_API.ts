import axios from "axios";
import { Type_Respo_UnsplashPhoto, Type_Respo_UnsplashPhoto_links } from "..";
import { services_setResponseDATA } from "..";



async function imageLocation_API(LOCATION_NAME_FOR_API: string): Promise<Type_Respo_UnsplashPhoto_links[]> {
    const KEY = "jeOF3nLiwBEd7ruL4bEcDpcGyr-u3kz6pl8xYVDxa5o";
    const RESP_COUNT = 30;
    const URL = `https://api.unsplash.com/search/photos?query=${LOCATION_NAME_FOR_API}&per_page=${RESP_COUNT}&client_id=${KEY}`;
console.log(LOCATION_NAME_FOR_API);

    try {
        const response = await axios.get(URL);
        const RESPO_ARRAY: Type_Respo_UnsplashPhoto[] = response.data.results;
        const RESPO_IMAGE_LINK: Type_Respo_UnsplashPhoto_links[] = services_setResponseDATA({ KEY_REQUIRED: ["links"], RESPO_RAW_DATA: RESPO_ARRAY })
        return RESPO_IMAGE_LINK;

    } catch (error) {
        console.error(error);
        return [];
    };
};

export default imageLocation_API;




