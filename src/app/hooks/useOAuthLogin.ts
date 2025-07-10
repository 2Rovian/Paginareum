import { supabase } from "../utils/supabase/client";
import toast from "react-hot-toast";

export default function useOAuthLogin() {

    const handleLoginWithProvider = async (provider: "github" | "discord") => {
        const { error: ErrorOnProviderLogin } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` 
            }
        })

        if (ErrorOnProviderLogin) {
            console.error(`Erro ao logar com ${provider} `, ErrorOnProviderLogin.message)
            toast.error(`Erro ao logar com ${provider}`)
            return
        }
    }
    return { handleLoginWithProvider }
}