import type { AxiosInstance } from "axios";

export class Script{
    client : AxiosInstance
    constructor(client:AxiosInstance){
        this.client = client
    }
    async createScripts(topic:string){
        const response = await this.client.post("/scripts",topic)
        return response
    }
}