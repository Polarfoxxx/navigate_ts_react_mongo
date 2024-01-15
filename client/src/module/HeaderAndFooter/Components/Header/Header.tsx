import "./header.style.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import DropdownLogOut from "./DropdownLogOut";
import { AUTHENTICATION_API } from "../../../API";
import { UseChangeContextDATA } from '../../../hooks';
import { Container, defaultValue_address_for_Provider_Context } from '../../../Container';
import { useNavigate } from 'react-router-dom';


function Header(): JSX.Element {
    const NAVIGATE = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });
    const [logUserName, setLogUserName] = React.useState("");
    const [deleteAccountCont, setDeleteAccountCont] = React.useState<JSX.Element | null>(null);

    /* macitanie mena prihlasneneho */
    React.useEffect(() => {
        const USER_NAME = localStorage.getItem("JWT_token");
        if (USER_NAME) {
            const USER_NAME_AND_KEY = JSON.parse(USER_NAME);
            setLogUserName(USER_NAME_AND_KEY.user_Name);
        };
    }, []);

    /* odhlasenie */
    const handleClickToLoginPage = (): void => {
        NAVIGATE("/LoginPage");
        localStorage.removeItem('JWT_token');
        localStorage.removeItem('saveHistoryRoutes');
        updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);
    };


    const DELETE_MESSAGE = (message: string) => {
        return (
            <div>
                <h4>{message}</h4>
            </div>
        );
    };

    const DELETE_VERIFICATION_CONT = () => {
        return (
            <div className="verificationContent">
                <div className="verificationHeader">
                <h4>Are you sure you want to delete the account..?</h4>
                </div>
                <div className="verificationBody">
                <button onClick={() => deleteAccount()}>
                    Delete
                </button>
                <button onClick={() => setDeleteAccountCont(null)}>
                    Cancel
                </button>
                </div>
            </div>
        );
    };




    /* spustenie funkcie pre zobrazenie upozornenia pre vyzanie uctu */
    const handleClickToDeleteAccount = (): void => {
        setDeleteAccountCont(DELETE_VERIFICATION_CONT())
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
                if (RESPO_DATA?.status === 200) {
                    setDeleteAccountCont(DELETE_MESSAGE(RESPO_DATA.message))
                    setTimeout(() => {
                        setDeleteAccountCont(null);
                        handleClickToLoginPage();
                    }, 5000);
                };
            } catch (error) {
                console.error(error);
            };
        };
    };


    return (
        <div className="header">
            <div className="headerBox">
                <div className="headerbottonBox">
                    <DropdownLogOut handleClickToDeleteAccount={handleClickToDeleteAccount} handleClickToLoginPage={handleClickToLoginPage} />
                </div>
                <div className="headerRespoMessage">
                    {
                        deleteAccountCont
                    }

                </div>
                <div className="headerTittleBox">
                    <div className="headerLogo">
                        <h2>Welcome</h2>
                        <h3> {logUserName}</h3>
                        <h2>in</h2>
                        <h1>FoxxyNavigate</h1>
                        <FontAwesomeIcon className="faIcon" icon={faRoute} size="2xl" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header