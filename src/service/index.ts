import type { AxiosInstance } from "axios";
import axios from "axios";
import { Script } from "./scripts";

class Api {
    axiosClient: AxiosInstance;
    scripts: Script
    constructor() {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:3000/api"
        })
        this.scripts = new Script(this.axiosClient)
    }
}

export const api = new Api();