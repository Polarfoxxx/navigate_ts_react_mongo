import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";
import {
  Type_forLogin_respo_objekt,
  Type_forRespo_objekt,
  Type_forSaveDATA_API,
  Type_forLoadDATA_API,
  Type_forRespoLoad_objekt,
  Type_forSendData_API,
  Type_forDeleteData_API,
  Type_forDeleteAccount
} from "./types";

const AUTHENTICATION_API = {
  registerNewUser_API,
  loginUser_API,
  saveDATA_API,
  loadDATA_API,
  sendEmail_API,
  deleteRoute,
  deleteAccount
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
        "Content-Type": "application/json",
      },
    });
    return {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    }
  }
}

/* --------------------------------------------------------------------------------------- */
async function loginUser_API(props: Type_forAuthentication_API): Promise<Type_forLogin_respo_objekt | undefined> {
  const LOGIN_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/login/user", LOGIN_DATA, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      status: RESPO_DATA.status,
      JWT_token: RESPO_DATA.data.token,
      user_name: RESPO_DATA.data.username,
      message: RESPO_DATA.data.message,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          status: error.response.status,
          JWT_token: "",
          user_name: "",
          message: error.response.data.message,
        };
      };
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
    timeCreate: props.DATA_ROUTE.timeCreate,
    officialName: props.DATA_ROUTE.officialName,
    timeRoute: props.DATA_ROUTE.timeRoute,
    distanceRoute: props.DATA_ROUTE.distanceRoute,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/save/data", SAVE_DATA,
      {
        headers: {
          Authorization: JWT_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const SAVE_RESPO_OBJEKT: Type_forRespo_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message,
    };
    return SAVE_RESPO_OBJEKT;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const SAVE_RESPO_OBJEKT: Type_forRespo_objekt = {
          status: error.response.status,
          message: error.response.data.message,
        };
        return SAVE_RESPO_OBJEKT;
      }
    }
  }
}

/* --------------------------------------------------------------------------------------- */
async function loadDATA_API(props: Type_forLoadDATA_API): Promise<Type_forRespoLoad_objekt | undefined> {
  const DATA = {
    username: props.USER_NAME,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.get("http://localhost:4000/load/data", {
      params: DATA,
      headers: {
        Authorization: JWT_TOKEN,
        "Content-Type": "application/json",
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
        const LOAD_RESPO_OBJEKT: Type_forRespoLoad_objekt = {
          status: error.response.status,
          message: error.response.data.message,
          data: [],
        };
        return LOAD_RESPO_OBJEKT;
      }
    }
  }
}

/* --------------------------------------------------------------------------------------- */
async function sendEmail_API(props: Type_forSendData_API): Promise<Type_forRespo_objekt | undefined> {
  const DATA = {
    emailName: props.EMAIL_NAME,
    routeInfo: props.ROUTE_INFO,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/send/email", DATA,
      {
        headers: {
          Authorization: JWT_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const SEND_EMAIL_RESPO_OBJEKT: Type_forRespo_objekt = {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data,
    };
    return SEND_EMAIL_RESPO_OBJEKT;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const SEND_EMAIL_RESPO_OBJEKT: Type_forRespo_objekt = {
          status: error.response.status,
          message: error.response.data.message,
        };
        return SEND_EMAIL_RESPO_OBJEKT;
      };
    };
  };
};

/* --------------------------------------------------------------------------------------- */
async function deleteRoute(props: Type_forDeleteData_API): Promise<Type_forRespoLoad_objekt | undefined> {
  const DATA = {
    emailName: props.EMAIL_NAME,
    officialName: props.ROUTE_NAME,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.delete("http://localhost:4000/delete/data", {
      params: DATA,
      headers: {
        Authorization: JWT_TOKEN,
        "Content-Type": "application/json",
      },
    }
    );

    const DELETE_ROUTE: Type_forRespoLoad_objekt = {
      data: RESPO_DATA.data.data,
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message,
    };
    return DELETE_ROUTE;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const DELETE_ROUTE: Type_forRespoLoad_objekt = {
          data: [],
          status: error.response.status,
          message: error.response.data.message,
        };
        return DELETE_ROUTE;
      };
    };
  };
};


/* --------------------------------------------------------------------------------------- */
async function deleteAccount(props: Type_forDeleteAccount): Promise<Type_forRespo_objekt | undefined> {
  const DATA = {
    emailName: props.USER_NAME,
  };
  const JWT_TOKEN = props.USER_JWT_TOKEN;

  try {
    const RESPO_DATA = await axios.delete("http://localhost:4000/delete/user", {
      params: DATA,
      headers: {
        Authorization: JWT_TOKEN,
        "Content-Type": "application/json",
      },
    });
    return {
      status: RESPO_DATA.status,
      message: RESPO_DATA.data.message,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      };
    };
  };
};
