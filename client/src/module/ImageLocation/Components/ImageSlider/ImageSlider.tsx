import ImageGallery from "react-image-gallery";
import React from "react";
import "./imageSlider.style.css";
import { Type_Respo_UnsplashPhoto_links } from "../../../API";

type Type_for_ImageSlider = {
    respoDATA: Type_Respo_UnsplashPhoto_links[],
};

type Type_for_SliderImg = {
    original: string,
    thumbnail: string,
}

function ImageSlider(props: Type_for_ImageSlider): JSX.Element {
    const [imageForSlider, setImageForSlider] = React.useState<Type_for_SliderImg[]>([]);

    React.useMemo(() => {
        let image_Data: Type_for_SliderImg[] = [];
        props.respoDATA.forEach((item) => {
            const UPDATE_DATA = {
                original: item.urls.regular,
                thumbnail: item.urls.thumb,
            };
            image_Data.push(UPDATE_DATA)
        });
        setImageForSlider(image_Data)
    }, [JSON.stringify(props.respoDATA)]);



    return (
        <div className="imageSliderBox">
            <ImageGallery
                thumbnailPosition={"left"}
                slideInterval={4000}
                showNav={false}
                showFullscreenButton={false}
                autoPlay={true}
                showThumbnails={true}
                useBrowserFullscreen={false}
                showPlayButton={true}
                showBullets={true}
                items={imageForSlider}
                renderItem={(item) => (
                    <img src={item.original} alt={item.original} className="sliderImage" />
                )}
            />
        </div>
    )
};

export default ImageSlider