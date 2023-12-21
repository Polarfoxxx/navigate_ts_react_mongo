import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";
import { Type_forLogin_respo_objekt, Type_forSaveDATA_API } from "./types";


const AUTHENTICATION_API = {
  registerNewUser_API,
  loginUser_API,
  saveDATA_API
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
      JWT_token: RESPO_DATA.data.token,
      user_name: RESPO_DATA.data.username
    };
    return LOGIN_RESPO_OBJEKT;

  } catch (error) {
    console.error(error);
  }
};


/* --------------------------------------------------------------------------------------- */
async function saveDATA_API(props: Type_forSaveDATA_API): Promise<any | undefined> {
  const LOGIN_DATA = {
    username: props.emailValue,
    data: props.data,
  };
  
  try {
    const RESPO_DATA = await axios.post("http://localhost:4000//save/data", LOGIN_DATA)
 
    return ;

  } catch (error) {
    console.error(error);
  }
};

