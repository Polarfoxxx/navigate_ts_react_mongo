import { useNavigate } from "react-router-dom";


function Header(): JSX.Element {
    const TO_LOCATION = useNavigate()


const hadnelClick = () => {
    TO_LOCATION("/")
}



    return(
<div>
    <div>
        <h1>header</h1>
        <button onClick={hadnelClick}>loghin page</button>
    </div>
</div>
    );
};

export default Header