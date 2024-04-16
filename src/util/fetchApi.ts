import axios from "axios";

export const fetchAPI = async (apiURL: string) => {

    const response = await axios.get(apiURL, {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    });
    const { data } = response;
    return data  

}