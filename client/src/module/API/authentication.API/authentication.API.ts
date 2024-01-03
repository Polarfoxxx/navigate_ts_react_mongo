import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";
import {
  Type_forLogin_respo_objekt,
  Type_forRespo_objekt,
  Type_forSaveDATA_API,
  Type_forLoadDATA_API,
  Type_forRespoLoad_objekt
} from "./types";


const AUTHENTICATION_API = {
  registerNewUser_API,
  loginUser_API,
  saveDATA_API,
  loadDATA_API,
};
export default AUTHENTICATION_API;

/* --------------------------------------------------------------------------------------- */
async function registerNewUser_API(props: Type_forAuthentication_API): Promise<Type_forRespo_objekt | undefined> {
  const RESGISTER_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/register/newUser", RESGISTER_DATA, {
      headers: {
        'Content-Type': 'application/json', 
      }
    });

    const REGISTER_RESPO_OBJEKT: Type_forRespo_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message
    };
    return REGISTER_RESPO_OBJEKT;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const LOGIN_RESPO_ERROR: Type_forRespo_objekt = {
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
    const RESPO_DATA = await axios.post("http://localhost:4000/login/user", LOGIN_DATA, {
      headers: {
        'Content-Type': 'application/json', 
      }
    });

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
async function saveDATA_API(props: Type_forSaveDATA_API): Promise<Type_forRespo_objekt | undefined> {
  const SAVE_DATA = {
    username: props.USER_NAME,
    routeName: props.DATA_ROUTE.routeName,
    startCoord: props.DATA_ROUTE.startCoord,
    endCoord: props.DATA_ROUTE.endCoord,
    allCoord: props.DATA_ROUTE.allCoord,
    timeCreate: props.DATA_ROUTE.timeCreate
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.post('http://localhost:4000/save/data', SAVE_DATA, {
      headers: {
        "Authorization": JWT_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    const SAVE_RESPO_OBJEKT: Type_forRespo_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message
    };
    return SAVE_RESPO_OBJEKT;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const LOGIN_RESPO_ERROR: Type_forRespo_objekt = {
          status: error.response.status,
          message: error.response.data
        };
        return LOGIN_RESPO_ERROR;
      };
    };
  };
};

/* --------------------------------------------------------------------------------------- */
async function loadDATA_API(props: Type_forLoadDATA_API): Promise<Type_forRespoLoad_objekt | undefined> {
  const DATA = {
    useName: props.USER_NAME,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.get('http://localhost:4000/load/data', {
      params: DATA,
      headers: {
        "Authorization": JWT_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    const LOAD_RESPO_OBJEKT: Type_forRespoLoad_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message,
      data: RESPO_DATA.data.data,
    };
    return LOAD_RESPO_OBJEKT;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const LOGIN_RESPO_ERROR: any = {
          status: error.response.status,
          message: error.response.data,
          data: []
        };
        return LOGIN_RESPO_ERROR;
      };
    };
  };
};
