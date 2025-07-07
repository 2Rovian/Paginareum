'use client'
import useLogout from "@/app/hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

export default function ProfileLogoutBtn() {
    const { handleLogout } = useLogout();

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-[#b03a2e] hover:bg-[#b03a2e]/10 rounded-lg transition-colors duration-200 cursor-pointer"
        >
            <FiLogOut />
            Sair da conta
        </button>
    )
}