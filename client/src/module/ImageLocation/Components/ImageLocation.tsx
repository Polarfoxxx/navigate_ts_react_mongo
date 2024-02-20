import React from "react";
import "./imageLocation.style.css";
import { imageLocation_API, Type_Respo_UnsplashPhoto_links } from "../../API";
import { Container } from "../../Container";
import ImageSlider from "./ImageSlider/ImageSlider";
import services_changeLocationForImage from "./services/services_changeLocationForImage";

function ImageLocation(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context);
    const { startPoints, endPoints } = location_DATA;
    const [respoDATA, setRespoDATA] = React.useState<Type_Respo_UnsplashPhoto_links[]>([]);


    React.useEffect(() => {
        if (startPoints.address.town || endPoints.address.town) {
            const LOCATION_NAME_FOR_API = services_changeLocationForImage(location_DATA);
            fetchDATA(LOCATION_NAME_FOR_API);
        };
    }, [location_DATA.startPoints.address,location_DATA.endPoints.address]);


    async function fetchDATA(location: string) {
        try {
            const RESPO_DATA: Type_Respo_UnsplashPhoto_links[] = await imageLocation_API(location);
            setRespoDATA(RESPO_DATA);

        } catch (error) {
            console.error(error);
            return [];
        };
    };

    return (
        <div className="imageLocationBox">
            <ImageSlider respoDATA={respoDATA} />
        </div>
    );
};

export default ImageLocation;