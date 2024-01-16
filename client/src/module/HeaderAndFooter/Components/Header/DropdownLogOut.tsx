import Dropdown from 'react-bootstrap/Dropdown';
import "./dropdownLogOut.style.css"
import { TypeFor_DropdownLogOut } from './type';

function DropdownLogOut(props: TypeFor_DropdownLogOut): JSX.Element {

    return (
        <div className='dropdownContent'>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Logged user
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={props.handleClickToLoginPage}>Log out</Dropdown.Item>
                    <Dropdown.Item onClick={props.handleClickToDeleteAccount}>Delete account</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DropdownLogOut;
