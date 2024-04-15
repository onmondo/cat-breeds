import axios from "axios";

export const fetchAPI = async (apiURL: string) => {
    try {
        const response = await axios.get(apiURL, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
        });
        const { data } = response;
        return data  
    } catch(error) {
        throw new Error("Somethin wrong with cat API")
    }
}