import type { AxiosInstance } from "axios";
import axios from "axios";
import { Script } from "./scripts";

class Api {
    axiosClient: AxiosInstance;
    scripts: Script
    constructor() {
        this.axiosClient = axios.create({
            baseURL: "https://speakflow-tqpb.vercel.app/api"
        })
        this.scripts = new Script(this.axiosClient)
    }
}

export const api = new Api();