import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { UseChangeContextDATA } from '../../../hooks';
import { Container, defaultValue_address_for_Provider_Context } from '../../../Container';
import { useNavigate } from 'react-router-dom';



  function BasicButtonExample() {
    const NAVIGATE = useNavigate();
    const { location_DATA, setLocation_DATA } = React.useContext(Container.Context);
    const { updateContext_DATA } = UseChangeContextDATA({ location_DATA, setLocation_DATA });


    /* odhlasenie */
    const handleClickToLoginPage = ():void => {
        NAVIGATE("/LoginPage");
        localStorage.removeItem('JWT_token');
        localStorage.removeItem('saveHistoryRoutes');
        updateContext_DATA([{ newData: defaultValue_address_for_Provider_Context, key: "location_DATA" }]);
    };

    const handleClickToDeleteAccount = ():void => {
        
   
    };







    return (
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
        User
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClickToLoginPage}>Log out</Dropdown.Item>
            <Dropdown.Item onClick={handleClickToDeleteAccount}>Delete account</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

export default BasicButtonExample;
