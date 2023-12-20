import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";
import { Type_forLogin_respo_objekt } from "./types";


const AUTHENTICATION_API = {
  registerNewUser_API,
  loginUser_API
};
export default AUTHENTICATION_API;

/* --------------------------------------------------------------------------------------- */
async function registerNewUser_API(props: Type_forAuthentication_API): Promise<number | undefined> {
  const RESGISTER_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };
  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/register/newUser", RESGISTER_DATA)
    console.log(RESPO_DATA);
    const RESPO_STATUS = RESPO_DATA.status
    return RESPO_STATUS;
  } catch (error) {
    console.error(error);
  }
};

/* --------------------------------------------------------------------------------------- */
async function loginUser_API(props: Type_forAuthentication_API): Promise<Type_forLogin_respo_objekt | undefined> {
  const LOGIN_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };
  
  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/login/user", LOGIN_DATA)
    const LOGIN_RESPO_OBJEKT = {
      status: RESPO_DATA.status,
      JWT_token: RESPO_DATA.data.token
    };
    return LOGIN_RESPO_OBJEKT;

  } catch (error) {
    console.error(error);
  }
};



