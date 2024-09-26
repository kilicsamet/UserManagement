import axios from "axios"


export let axiosApi = axios.create({
    baseURL:import.meta.env.REACT_APP_API_URL?import.meta.env.REACT_APP_API_URL :'http://localhost:3001/',
    headers: {
        "Content-Type": "application/json",
    }
})



