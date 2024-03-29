import axios from "axios";
import { Type_Respo_UnsplashPhoto, Type_Respo_UnsplashPhoto_links } from "..";
import { services_setResponseDATA } from "..";

async function imageLocation_API(LOCATION_NAME_FOR_API: string): Promise<Type_Respo_UnsplashPhoto_links[]> {
    const KEY = ""; /* your key */
    const RESP_COUNT = 25;
    const URL = `https://api.unsplash.com/search/photos?query=${LOCATION_NAME_FOR_API}&per_page=${RESP_COUNT}&client_id=${KEY}`;
    try {
        const RESPONSE = await axios.get(URL);
        const RESPO_ARRAY: Type_Respo_UnsplashPhoto[] = RESPONSE.data.results;
        const RESPO_IMAGE_LINK: Type_Respo_UnsplashPhoto_links[] = services_setResponseDATA({ KEY_REQUIRED: ["urls"], RESPO_RAW_DATA: RESPO_ARRAY })
        return RESPO_IMAGE_LINK;

    } catch (error) {
        console.error(error);
        return [];
    };
};

export default imageLocation_API;




