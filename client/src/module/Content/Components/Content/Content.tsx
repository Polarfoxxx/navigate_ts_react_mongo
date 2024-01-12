import React from "react";
import "./content.style.css"
import { ControlAndinfoBox } from "../../../Control";
import { MapAndHeaderBox } from "../../../Maps";
import { LocationUserData } from "../../../LocationUserInfo";
import { Header } from "../../../HeaderAndFooter/Components";
import { ImageLocation } from "../../../ImageLocation";
import { servicesJWTdecodeAndValidity } from "../../../utils/";
import { useNavigate } from "react-router-dom";
import { UseChangeContextDATA } from "../../../hooks";
import { Container,defaultValue_address_for_Provider_Context } from "../../../Container";

function Content() {
    const NAVIGATE = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });


    React.useEffect(() => {
        const JWT_FROM_STORAGE = localStorage.getItem('JWT_token');
        if (JWT_FROM_STORAGE === null) {
            NAVIGATE("/LoginPage");
            updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }])
        } else {
            const USER_NAME_AND_KEY = JSON.parse(JWT_FROM_STORAGE);
            if (!servicesJWTdecodeAndValidity(USER_NAME_AND_KEY.JWT_token)) {
                NAVIGATE("/LoginPage");
                updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);
            };
        };
    });


    return (
        <div className="content" >
            <div className="container">
                <header>
                    <Header />
                </header>
                <section>
                    <div className='mapsAndControl'>
                        <div className='controlBox'>
                            <ControlAndinfoBox />
                        </div>
                        <div className='mapsBox'>
                            <MapAndHeaderBox />
                        </div>
                    </div>
                    <div className='locationInfobox'>
                        <LocationUserData />
                    </div>
                    <div className="locationImageBox">
                        <ImageLocation />
                    </div>
                </section>
                <footer>
                    fooo
                </footer>
            </div>
        </div>

    )
};


export default Content;