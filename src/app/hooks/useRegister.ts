import { FormEvent } from "react";
import toast from "react-hot-toast";
import { supabase } from "../utils/supabase/client";
import useLogin from "./useLogin";
import useValidation from "./useValidation";

export default function useRegister() {
    const { handleLogin } = useLogin();
    const { handleValidation } = useValidation()

    const handleRegister = async (
        e: FormEvent,
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => {
        e.preventDefault();

        const cleanEmail = email.trim();
        const cleanUsername = username.trim();
        handleValidation(cleanEmail, cleanUsername, password, confirmPassword)

        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: cleanEmail,
                password
            });

            if (signUpError) {
                console.error("Erro ao criar conta: ", signUpError.message);
                toast.error("Erro ao cadastrar");
                return;
            }

            // registo do usuário na tabela 'profiles'
            const { error: profileError } = await supabase.from("profiles")
                .insert({
                    profile_id: signUpData.user?.id,
                    username: cleanUsername,
                });

            if (profileError) {
                console.error("Erro ao criar perfil: ", profileError.message);
                toast.error("Erro ao criar perfil");
                return;
            }

            await handleLogin(cleanEmail, password);
        
        } finally {
    }

}
return { handleRegister }
}