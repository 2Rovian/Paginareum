import toast from "react-hot-toast"
import { supabase } from "../utils/supabase/client"
import { useAuthStore } from "../stores/session-store";
import { useRouter } from "next/navigation";

export default function useLogin() {

    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
            console.error("Error ao logar: ", signInError?.message)
            toast.error("Erro ao fazer login :(")
            return
        }
        toast.success("Login feito com sucesso :)")
        setAuthenticated(true); // att globalState
        router.push('/')
    }

    return{ handleLogin }
}