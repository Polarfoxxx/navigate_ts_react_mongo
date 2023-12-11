import axios from "axios";


async function imageLocation_API() {


    const URL = `https://api.unsplash.com/search/photos?query=london&per_page=20&client_id=jeOF3nLiwBEd7ruL4bEcDpcGyr-u3kz6pl8xYVDxa5o`;

    try {
        const response = await axios.get(URL);
        console.log(response);

    } catch (error) {
        console.error(error);
        return [];
    };
};




export default imageLocation_API;




