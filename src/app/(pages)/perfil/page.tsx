'use client'
import NavbarComp from "@/app/components/Navbar";
import { supabase } from "@/app/utils/supabase/client";
import toast from "react-hot-toast";
import ProfileComp from "./ProfileComp";
import { FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Erro ao desconectar");
            return;
        }
        toast.success("Desconectado com sucesso");
    }
     
    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8">
                <div className="border-2 border-[#b03a2e] rounded-lg p-4 md:p-8">
                    <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2">
                        Seu Perfil
                    </h1>
                    <p className="text-[#6b705c] mb-6">
                        Gerencie suas informações e preferências
                    </p>
                    
                    <ProfileComp />
                    
                    <div className="mt-8 pt-6 border-t border-[#b03a2e]/20">
                        <button 
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-5 py-2.5 text-[#b03a2e] hover:bg-[#b03a2e]/10 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            <FiLogOut />
                            Sair da conta
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}