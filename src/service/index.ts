import type { AxiosInstance } from "axios";
import axios from "axios";
import { Script } from "./scripts";
import { Support } from "./support";

class Api {
    axiosClient: AxiosInstance;
    scripts: Script;
    support: Support;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: "https://speakflow-tqpb.vercel.app/api"
        })
        this.scripts = new Script(this.axiosClient)
        this.support = new Support(this.axiosClient)
    }
}

export const api = new Api();