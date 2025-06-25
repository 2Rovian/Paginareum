'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// icons
import { GiZeusSword } from "react-icons/gi";
import { IoMenuSharp } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoLibrary } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";

import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
// -----

import { supabase } from '../utils/supabase/client';

import { useAuthStore } from '../stores/session-store';
import toast from 'react-hot-toast';

export default function Navbar_UL() {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const router = useRouter();

    const { isAuthenticated } = useAuthStore()
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

    const linksGuest = [
        { label: "Home", href: "/", icon: <IoHome /> },
        { label: "Bibliotheca", href: "/bibliotheca", icon: <IoLibrary /> },
        { label: "Sobre", href: "/sobre", icon: <FaCircleInfo /> },
        // { label: "Login", href: "/login", icon: <RiLoginBoxLine /> },
    ];


    const linksAuth = [
        { label: "Home", href: "/", icon: <IoHome /> },
        { label: "Bibliotheca", href: "/bibliotheca", icon: <IoLibrary /> },
        { label: "Perfil", href: "/perfil", icon: <MdAccountBox /> },
        { label: "Sobre", href: "/sobre", icon: <FaCircleInfo /> },
        // { label: "Logout", href: "/logout", icon: <RiLogoutBoxLine /> },
    ];

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erro ao sair da conta: ", error)
            toast.error("Algo deu errado")
            return
        }
        setAuthenticated(false);
        toast.success("Usuário desconectado")
        router.push('/');
    }

    const links = isAuthenticated ? linksAuth : linksGuest

    // Fecha o menu se clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showMenu]);

    return (
        <div className='relative'>
            {/* Menu desktop */}
            <ul className="md:flex gap-x-3 text-lg hidden">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-2 items-center py-1 px-2 ${pathname === link.href ? 'text-[#e6c46c]' : ''
                                }`}
                        >
                            {/* {link.label} */}
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
                {isAuthenticated ?
                    <li>
                        <button
                            className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-2 items-center py-1 px-2`}
                            onClick={() => handleLogout()}

                        >
                            <span><RiLogoutBoxLine /></span>
                            <span>Logout</span>
                        </button>
                    </li>
                    :
                    <li >
                        <Link
                            href={'/login'}
                            className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-2 items-center py-1 px-2 ${pathname === '/login' ? 'text-[#e6c46c]' : ''}`}
                        >
                            <span><RiLoginBoxLine /></span>
                            <span>Login</span>
                        </Link>
                    </li>}
            </ul>

            {/* Botão do menu mobile */}
            <button
                className="p-2 cursor-pointer text-lg rounded-full outline-2 md:hidden"
                onClick={() => setShowMenu(!showMenu)}
            >
                {showMenu ? <GiZeusSword /> : <IoMenuSharp />}
            </button>

            {/* Menu mobile com animação */}
            {showMenu && (
                <ul
                    ref={menuRef}
                    className="flex bg-[#b03a2e] absolute mt-3 right-0 flex-col py-0 md:hidden rounded-lg outline-2 outline-[#f6f1e7] shadow-lg 
                    motion-opacity-in-0"
                >
                    {links.map((link) => (
                        <li key={link.label} className='flex justify-start'>
                            <Link
                                href={link.href}
                                className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-3 items-center px-7 py-3 text-lg ${pathname === link.href ? 'text-[#e6c46c]' : ''
                                    }`}
                                onClick={() => setShowMenu(false)}
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated ?
                        <li className='flex justify-start'>
                            <button
                                className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-3 items-center px-7 py-3 text-lg `}
                                onClick={() => { handleLogout(); setShowMenu(false) }}

                            >
                                <span><RiLogoutBoxLine /></span>
                                <span>Logout</span>
                            </button>
                        </li>
                        :
                        <li className='flex justify-start'>
                            <Link
                                href={'/login'}
                                className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-3 items-center px-7 py-3 text-lg ${pathname === '/login' ? 'text-[#e6c46c]' : ''
                                    }`}
                                onClick={() => setShowMenu(false)}
                            >
                                <span><RiLoginBoxLine /></span>
                                <span>Login</span>
                            </Link>
                        </li>}
                </ul>
            )}
        </div>
    )
}
