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
import { DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT } from "../../../Container";

function Content(): JSX.Element {
    const NAVIGATE = useNavigate();
    const { updateContext_DATA } = UseChangeContextDATA();


    React.useEffect(() => {
        const JWT_FROM_STORAGE = localStorage.getItem('JWT_token');
        if (JWT_FROM_STORAGE === null) {
            NAVIGATE("/LoginPage");
            updateContext_DATA([{ newData: DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT, key: "location_DATA" }])
        } else {
            const USER_NAME_AND_KEY = JSON.parse(JWT_FROM_STORAGE);
            if (!servicesJWTdecodeAndValidity(USER_NAME_AND_KEY.JWT_token)) {
                NAVIGATE("/LoginPage");
                updateContext_DATA([{ newData: DEFAULT_VALUE_LOCATION_FOR_PROVIDER_CONTEXT, key: "location_DATA" }]);
            };
        };
    });


    return (
        <div className="content" >
            <div className="containers">
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