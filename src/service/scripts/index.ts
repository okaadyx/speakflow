import type { AxiosInstance } from "axios";
import type { Script as ScriptData } from "../../types";

export class Script{
    client : AxiosInstance
    constructor(client:AxiosInstance){
        this.client = client
    }
    createScripts = async (data: { topic: string }): Promise<{ script: ScriptData }> => {
        const response = await this.client.post<{ script: ScriptData }>("/scripts", data)
        return response.data
    }
}