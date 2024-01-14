import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { UseChangeContextDATA } from '../../../hooks';
import { Container, defaultValue_address_for_Provider_Context } from '../../../Container';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION_API } from '../../../API';
import "./dropdownLogOut.style.css"
import { TypeFor_DropdownLogOut } from './type';


function DropdownLogOut(props: TypeFor_DropdownLogOut): JSX.Element {
    const NAVIGATE = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });


    /* odhlasenie */
    const handleClickToLoginPage = (): void => {
        NAVIGATE("/LoginPage");
        localStorage.removeItem('JWT_token');
        localStorage.removeItem('saveHistoryRoutes');
        updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);
    };




    /* spustenie funkcie pre vymazanie uctu */
    const handleClickToDeleteAccount = (): void => {
        deleteAccount();
    };
    /*  funkcia pre vymazanie uctu */
    async function deleteAccount() {
        const USER_DATA_FROM_STR = localStorage.getItem("JWT_token");
        if (USER_DATA_FROM_STR) {
            const USER_DATA = JSON.parse(USER_DATA_FROM_STR);
            const USER_NAME = USER_DATA.user_Name;
            const USER_JWT_TOKEN = USER_DATA.JWT_token;
            try {
                const RESPO_DATA = await AUTHENTICATION_API.deleteAccount({ USER_NAME, USER_JWT_TOKEN });
                console.log(RESPO_DATA);

                if (RESPO_DATA?.status === 200) {
                    props.setRespoMessage(RESPO_DATA.message);

                    setTimeout(() => {
                        handleClickToLoginPage()
                    }, 5000);
                };
            } catch (error) {
                console.error(error);
            };
        };
    }





    return (
        <div className='dropdownContent'>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    User
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleClickToLoginPage}>Log out</Dropdown.Item>
                    <Dropdown.Item onClick={handleClickToDeleteAccount}>Delete account</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

    );
}

export default DropdownLogOut;
