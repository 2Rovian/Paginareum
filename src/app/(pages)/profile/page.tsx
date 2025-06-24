'use client'
import NavbarComp from "@/app/components/Navbar"
import { supabase } from "@/app/utils/supabase/client"
import toast from "react-hot-toast";
import ProfileComp from "./ProfileComp";

export default function ProfilePage() {

    async function SignOut(){
        const { error } = await supabase.auth.signOut();
        if(error){
            toast.error("Algo deu errado")
            return
        }
        toast.success("Usuário desconectado")
    }
     
    return (
        <>
            <NavbarComp />
            <div className="text-center mt-10">
                <p className="text-lg">Esta é a Profile Page :)</p>
                <ProfileComp />
                <button onClick={() => SignOut()} className="px-4 py-2 mt-5 bg-black text-white font-semibold rounded-md cursor-pointer hover:bg-white hover:text-black outline-2 outline-white hover:outline-black ease-in-out duration-500 mx-auto self-center">Sair da conta</button>
            </div>
        </>
    )
}