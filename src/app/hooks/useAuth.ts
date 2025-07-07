import toast from "react-hot-toast"
import { supabase } from "../utils/supabase/client"
import { useAuthStore } from "../stores/session-store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useLogin from "./useLogin";

// const { isAuthenticated } = useAuthStore();
const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
const router = useRouter();

export default function useAuth() {
    const [LoadingSubmitForm, setLoadingSubmitForm] = useState<boolean>(false);

    const { handleLogin } = useLogin();

    const handleSubmitForm = async (e: FormEvent,
        email: string,
        username: string,
        password: string,
        confirmPassword: string,
        isLogin: boolean = false,

    ) => {
        e.preventDefault();

        const cleanEmail = email.trim();
        const cleanUsername = username.trim();

        if (!isLogin) {
            if (password !== confirmPassword) {
                toast.error("As senhas não coincidem")
                setLoadingSubmitForm(false)
                return
            }
            if (cleanUsername.length < 6) {
                toast.error("O nome de usuário deve ter pelo menos 6 caracteres")
                return
            }
            if (!email.includes("@") || !email.includes(".")) {
                toast.error("Email inválido")
                setLoadingSubmitForm(false)
                return
            }
            if (password.length < 8) {
                toast.error("A senha deve ter pelo menos 8 caracteres")
                setLoadingSubmitForm(false)
                return
            }
        }

        setLoadingSubmitForm(true)
        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password
                });
                if (signInError) {
                    console.error("Error ao logar: ", signInError.message);
                    toast.error("Erro ao fazer login");
                } else {
                    toast.success("Login feito com sucesso");
                    setAuthenticated(true);
                    router.push('/')

                }

            } else {
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
            }
        } finally {
            setLoadingSubmitForm(false);
        }

    }

    return { handleSubmitForm, LoadingSubmitForm }
}