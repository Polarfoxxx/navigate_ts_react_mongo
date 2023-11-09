import axios from "axios";


const API_KEY = '5GX8lJDVddQIy3d3nAmlGCXYaFe5IMFC';

async function authentication(): Promise<any> {
const URL = ``

  try {
    const response = await axios.get(URL);
    console.log(response);

    return response.data.incidents;
    
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default authentication;


