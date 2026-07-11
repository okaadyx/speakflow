import type { AxiosInstance } from "axios";

export class Script{
    client : AxiosInstance
    constructor(client:AxiosInstance){
        this.client = client
    }
    createScripts = async (data: { topic: string }) => {
        const response = await this.client.post("/scripts", data)
        return response.data
    }
}