import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";
import { Type_forLogin_respo_objekt, Type_forSaveDATA_API, Type_forRegister_respo_objekt } from "./types";


const AUTHENTICATION_API = {
  registerNewUser_API,
  loginUser_API,
  saveDATA_API
};
export default AUTHENTICATION_API;

/* --------------------------------------------------------------------------------------- */
async function registerNewUser_API(props: Type_forAuthentication_API): Promise<Type_forRegister_respo_objekt | undefined> {
  const RESGISTER_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/register/newUser", RESGISTER_DATA);
    const REGISTER_RESPO_OBJEKT: Type_forRegister_respo_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message
    };
    return REGISTER_RESPO_OBJEKT;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const LOGIN_RESPO_ERROR: Type_forRegister_respo_objekt = {
          status: error.response.status,
          message: error.response.data.message,
        };
        return LOGIN_RESPO_ERROR;
      };
    };
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
    const LOGIN_RESPO_OBJEKT: Type_forLogin_respo_objekt = {
      status: RESPO_DATA.status,
      JWT_token: RESPO_DATA.data.token,
      user_name: RESPO_DATA.data.username,
      message: RESPO_DATA.data.message
    };
    return LOGIN_RESPO_OBJEKT;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {

        const LOGIN_RESPO_ERROR: Type_forLogin_respo_objekt = {
          status: error.response.status,
          JWT_token: "",
          user_name: "",
          message: error.response.data
        };
        return LOGIN_RESPO_ERROR;
      }
    };
  };
};

/* --------------------------------------------------------------------------------------- */
async function saveDATA_API(props: Type_forSaveDATA_API): Promise<any | undefined> {
  const SAVE_DATA = {
    username: props.USER_NAME,
    data: props.DATA,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const response = await axios.post('http://localhost:4000/save/data', SAVE_DATA,
      {
        headers: {
          Authorization: JWT_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);


  } catch (error) {
    console.error(error);
  }
};

