import axios from "axios";



async function locationInfoAPI() {

    const options = {
      method: 'GET',
      url: 'https://spott.p.rapidapi.com/places',
      params: {
        type: 'CITY',
        skip: '0',
        country: 'US',
        limit: '100',
       
      },
      headers: {
        'X-RapidAPI-Key': '0bc4872ef5mshb5500d0485b302fp1bef17jsnf315a81a8a63',
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export default locationInfoAPI;