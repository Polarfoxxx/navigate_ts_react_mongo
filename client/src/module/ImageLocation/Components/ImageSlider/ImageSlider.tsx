import ImageGallery from "react-image-gallery";
import React from "react";
import "./imageSlider.style.css";
import { Type_Respo_UnsplashPhoto_links } from "../../../API";

type Type_for_ImageSlider = {
    respoDATA: Type_Respo_UnsplashPhoto_links[]
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
                fullscreen: item.urls.full,
            };
            image_Data.push(UPDATE_DATA)
        });
        setImageForSlider(image_Data)
    }, [props.respoDATA]);


    function LeftArrowButton({ onClick, disabled }: { onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean }) {
        //handle function for when this button is clicked in here
        return (
            <button
                type="button"
                style={{position: "absolute",right: "0"}}
                className={`image-gallery-icon image-gallery-left-arrow-button ${disabled ? 'disabled' : ''}`}
                onClick={onClick}
                aria-label="Previous"
                disabled={disabled}
            >
                {/* Ikona nebo text pro tlačítko vlevo */}
                Previous
            </button>
        )
    }

    function RightArrowButton({ onClick, disabled }: { onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean }) {
        //handle function for when this button is clicked in here
        return (
            <button
                type="button"
                className={`image-gallery-icon image-gallery-right-arrow-button ${disabled ? 'disabled' : ''}`}
                onClick={onClick}
                aria-label="Next"
                disabled={disabled}
            >
                {/* Ikona nebo text pro tlačítko vpravo */}
                Next
            </button>
        )
    }

    const FullScreenButton = ({ onClick, isFullscreen }: {
        onClick: React.MouseEventHandler<HTMLElement>,
        isFullscreen: boolean;
    }) => {
        return isFullscreen ? (
            <button
                type="button"
                className="image-gallery-icon image-gallery-fullscreen-button"
                onClick={onClick}
                aria-label="Open Fullscreen"
            >
                Open
            </button>
        ) : (
            <button
                type="button"
                className="image-gallery-icon image-gallery-fullscreen-button Closed"
                onClick={onClick}
                aria-label="Close Fullscreen"
            >
                Closed
            </button>
        );
    };

    return (
        <div className="imageSliderBox">
            <ImageGallery
                renderLeftNav={(onClick, _disabled) => (
                    <LeftArrowButton onClick={onClick} disabled={_disabled} />
                )}
                renderRightNav={(onClick, _disabled) => (
                    <RightArrowButton onClick={onClick} disabled={_disabled} />
                )}
                renderFullscreenButton={(onClick, isFullscreen) => (
                    <FullScreenButton onClick={onClick} isFullscreen={isFullscreen} />
                )}
                autoPlay={true}
                thumbnailPosition={"bottom"}
                items={imageForSlider} />
        </div>
    )
};

export default ImageSlider