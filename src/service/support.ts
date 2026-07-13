import type { AxiosInstance } from "axios";

export interface SupportMessageData {
  name: string;
  email: string;
  subject?: string;
  category?: string;
  message: string;
}

export class Support {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  sendMessage = async (data: SupportMessageData): Promise<{ message: string }> => {
    const response = await this.client.post<{ message: string }>("/support", data);
    return response.data;
  };
}
