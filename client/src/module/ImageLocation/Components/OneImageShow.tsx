import React from "react";
import "./oneImageShow.style.css";


type Type_ForOneImageShow = {
    IMAGE_SRC: string,
    setImageShow: React.Dispatch<React.SetStateAction<boolean>>
};


function OneImageShow(props: Type_ForOneImageShow): JSX.Element {
    const [imageSRC, setImageSRC] = React.useState("")

    React.useEffect(() => {
        setImageSRC(props.IMAGE_SRC)
    }, [props.IMAGE_SRC])

    const handleImageClick = (e: React.MouseEvent<HTMLElement>) => {
        props.setImageShow(false)
    };



    return (
        <div className="oneImageContent"
        onClick={handleImageClick}>
            <img 
        
            src={imageSRC} alt="" />
        </div>
    );
};

export default OneImageShow;