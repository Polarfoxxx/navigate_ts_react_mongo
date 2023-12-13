import React from "react";
import { Type_ForImageBOX } from "./types";
import "./imageBox.style.css"
import {Type_Respo_UnsplashPhoto_links } from "../../API";
import { fakedata } from "../../API/imageLocation.API/fakedta";

function ImageBox(props: Type_ForImageBOX): JSX.Element {
const [imgDATA, setImageData] = React.useState<Type_Respo_UnsplashPhoto_links[]>([])

React.useEffect(() => {
    console.log(props.respoDATA);
    
    if(props.respoDATA.length > 0 || true) {
        setImageData(fakedata)
    };
},[props.respoDATA])


    return(
        <div className="imageBox">
            <div className="imageBoxContent">
                {
                    imgDATA.map((item, key) => 
                    <div 
                    className="img_item"
                    key={key}>
                        <img src={item.links.download} alt="imagelocation" />
                    </div>
                        )
                }
            </div>
        </div>
    );
};

export default ImageBox;