import { useMutation } from "@tanstack/react-query"
import { api } from "../service"
import { queryClient } from "../utils/queryClient";

export const useCreateScript = () => {
    return useMutation({
        mutationFn: (data: { topic: string }) => api.scripts.createScripts(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["scripts"]
            });
        }
    });
};