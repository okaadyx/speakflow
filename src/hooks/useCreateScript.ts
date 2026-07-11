import { useMutation } from "@tanstack/react-query"
import { api } from "../service"
import { queryClient } from "../utils/queryClient";

export const useCreateScript  =()=>{
    return useMutation({
        mutationFn: (data: { topic: string }) => api.scripts.createScripts(data),
        onSuccess:(data)=>{
            console.log("created: ",data);
            queryClient.invalidateQueries({
                queryKey:["scripts"]
            })
        },
        onError:(error)=>{
            console.log("created: ",error);
            
        }
    })

}