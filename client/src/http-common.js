import axios from "axios";

const baseURL = import.meta.env.VITE_DOMAIN_SERVER;
console.log("baseURL: ", baseURL);

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true, 
});