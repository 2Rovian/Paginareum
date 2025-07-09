'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase/client";
import { useAuthStore } from "@/app/stores/session-store";
import toast from "react-hot-toast";

export default function AuthCallbackPage() {
    const router = useRouter();
    const { setAuthenticated } = useAuthStore();

    useEffect(() => {
        const handlePostOAuth = async () => {
            const { data, error } = await supabase.auth.getUser();
            const user = data.user;

            if (!user || error) {
                toast.error("Erro ao recuperar usuário");
                console.error(error?.message);
                return;
            }

            // Verifica se já tem profile
            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("profile_id", user.id)
                .single();

            if (!profileData) {
                const usernameFromEmail = user.email?.split("@")[0] || "user";
                const { error: insertError } = await supabase
                    .from("profiles")
                    .insert({
                        profile_id: user.id,
                        username: usernameFromEmail,
                    });

                if (insertError) {
                    toast.error("Erro ao criar perfil");
                    console.error(insertError);
                    return;
                }
            }

            setAuthenticated(true);
            toast.success("Login bem-sucedido");
            router.push('/');
        };

        handlePostOAuth();
    }, [router, setAuthenticated]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-[#1a1a1a]">Finalizando login...</p>
        </div>
    );
}
