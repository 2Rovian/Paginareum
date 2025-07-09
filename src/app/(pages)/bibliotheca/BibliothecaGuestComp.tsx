'use client'
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/stores/session-store";
import Link from "next/link";

export default function BibliotecaGuestComp() {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if(!isAuthenticated) {
            setIsLoading(false)
        }
        
    }, []);

    if (isLoading) {
        return (
            <div className="col-span-full flex justify-center py-10">
                <div className="animate-spin rounded-full size-30 border-t-4 border-b-4 border-[#b03a2e]"></div>
            </div>
        );
    }

    return (
        <div className="text-center py-10 overflow-hidden">
            <p className="text-2xl text-[#b03a2e] font-serif italic">
                Parece que você não está logado.
            </p>
            <p className="text-[#5a4a3a] mt-3">
                <Link
                    href="/login"
                    className="px-4 py-2 mr-2 bg-[#b03a2e] hover:bg-[#a93226] duration-300 ease-in-out rounded-md text-white"
                >
                    Crie sua conta
                </Link>{" "}
                e comece sua jornada literária
            </p>
        </div>
    );
}
