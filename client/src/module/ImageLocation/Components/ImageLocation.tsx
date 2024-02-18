import React from "react";
import "./imageLocation.style.css";
import { imageLocation_API, Type_Respo_UnsplashPhoto_links } from "../../API";
import { Container } from "../../Container";
import ImageSlider from "./ImageSlider/ImageSlider";

function ImageLocation(): JSX.Element {
    const { location_DATA } = React.useContext(Container.Context);
    const { startPoints } = location_DATA;
    const [respoDATA, setRespoDATA] = React.useState<Type_Respo_UnsplashPhoto_links[]>([])


    React.useEffect(() => {
        if (startPoints.address.town) {
            fetchDATA()
        };
    }, [location_DATA.startPoints.address]);


    async function fetchDATA() {
        const LOCATION_NAME_FOR_API = startPoints.address.town;
        try {
            const RESPO_DATA: Type_Respo_UnsplashPhoto_links[] = await imageLocation_API(LOCATION_NAME_FOR_API);
            setRespoDATA(RESPO_DATA);

        } catch (error) {
            console.error(error);
            return [];
        };
    };

    return (
        <div className="imageLocationBox">
            <ImageSlider respoDATA={respoDATA}/>
        </div>
    );
};

export default ImageLocation;