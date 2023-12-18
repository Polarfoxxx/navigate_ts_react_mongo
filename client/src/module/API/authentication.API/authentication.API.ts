import axios from "axios";
import { Type_forAuthentication_API } from "../../Authentication";

async function authentication_API(props: Type_forAuthentication_API): Promise<number> {
  const RESGISTER_DATA = {
    username: props.emailValue,
    password: props.passwordValue,
  };

  try {
    const RESPO_DATA = await axios.post("http://localhost:4000/register/newUser", RESGISTER_DATA)
    const RESPO_STATUS = RESPO_DATA.status
    return RESPO_STATUS;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default authentication_API;


