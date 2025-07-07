import toast from "react-hot-toast";
import { supabase } from "../utils/supabase/client";
import { useAuthStore } from "../stores/session-store";

export default function useLogout() {
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Erro ao desconectar");
            return;
        }
        toast.success("Desconectado com sucesso");
        setAuthenticated(false);
    }

    return { handleLogout }
}