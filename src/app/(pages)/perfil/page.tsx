import NavbarComp from "@/app/components/layout/(Navbar)/Navbar";
import ProfileComp from "./ProfileComp";
import ProfileLogoutBtn from "./ProfileLogoutBtn";

export default function ProfilePage() {
    
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
                    
                    {/* <div className="mt-8 pt-6 border-t border-[#b03a2e]/20">
                        <ProfileLogoutBtn />
                    </div> */}
                </div>
            </div>
        </>
    )
}