'use client'

// icons
import { FiMail, FiCamera } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
// -----

import useUseProfile from "@/app/hooks/useUserProfile";
import ProfileStats from "./ProfileStats";
import ProfileAvatarInput from "./ProfileAvatarInput";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileLogoutBtn from "./ProfileLogoutBtn";

export default function ProfileComp() {
    const { UserData, loading, session } = useUseProfile();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !session) {
            router.push('/login');
        }
    }, [loading, session, router]);

    if (loading || !session) {
        return (
            <div className="flex justify-center items-center py-8 h-[300px]">
                <div className="animate-spin rounded-full size-24 border-t-3 border-b-3 border-[#b03a2e]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seção de Foto e Informações Pessoais */}
                <div className="p-5 rounded-lg border border-[#b03a2e]">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group">
                            {UserData?.avatar_url ? (
                                <img
                                    src={UserData?.avatar_url}
                                    alt="Foto do perfil"
                                    className="size-32 rounded-full object-cover border-3 border-[#b03a2e]/80 shadow-md"
                                />
                            ) : (
                                <FaUserCircle className="text-[#b03a2e] text-8xl" />
                            )}

                            <label
                                htmlFor="avatar-upload"
                                className="absolute hover:outline-2 bottom-0 right-0 bg-[#b03a2e] text-white p-2 rounded-full cursor-pointer hover:bg-[#a93226] transition-all group-hover:opacity-100 opacity-90"
                                title="Alterar foto"
                            >
                                <FiCamera className="text-lg" />

                            </label>
                            <ProfileAvatarInput />
                        </div>

                        <h2 className="text-2xl font-serif text-[#1a1a1a] mt-3">
                            {UserData?.username || 'Usuário'}
                        </h2>
                        <p className="text-[#6b705c] text-sm">
                            Membro desde {new Date(session!.user.created_at).toLocaleDateString('pt-BR')}
                        </p>
                    </div>

                    <div className="space-y-3 border-t border-[#b03a2e]/20 pt-4">
                        <div className="flex items-center gap-3">
                            <FiMail className="text-[#b03a2e] flex-shrink-0" />
                            <div>
                                <p className="text-sm text-[#6b705c]">Email</p>
                                <p className="font-medium">
                                    {session?.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Estatísticas */}
                <ProfileStats />
                {/* Seção de Estatísticas */}
            </div>

            <div className="mt-8 pt-6 border-t border-[#b03a2e]/20">
                <ProfileLogoutBtn />
            </div>
        </>

    );
}
