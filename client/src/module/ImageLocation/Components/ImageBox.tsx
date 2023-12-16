import React from "react";
import { Type_ForImageBOX } from "./types";
import "./imageBox.style.css"
import { Type_Respo_UnsplashPhoto_links } from "../../API";
import { fakedata } from "../../API/imageLocation.API/fakedta";
import OneImageShow from "./OneImageShow";


function ImageBox(props: Type_ForImageBOX): JSX.Element {
    const [imgDATA, setImageData] = React.useState<Type_Respo_UnsplashPhoto_links[]>([]);
    const [imageShow, setImageShow] = React.useState(false);
    const [imageComponent, setImageComponent] = React.useState<JSX.Element | null>(null);


    React.useEffect(() => {
        console.log(props.respoDATA);

        if (props.respoDATA.length > 0 || true) {
            setImageData(fakedata)
        };
    }, [props.respoDATA])

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        const IMAGE_SRC = e.currentTarget.src
         
        setImageShow(true)
   setImageComponent(<OneImageShow IMAGE_SRC = {IMAGE_SRC} setImageShow = {setImageShow}/>)
    };
   
    return (
        <div className="imageBox">
            {
              imageShow && imageComponent !== null && imageComponent
            }

            <div className="imageBoxContent">
                {
                    imgDATA.map((item, key) =>
                        <div
                            className="img_item"
                            key={key}>
                            <img
                                onClick={handleImageClick}
                                src={item.links.download} alt="imagelocation" />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ImageBox;