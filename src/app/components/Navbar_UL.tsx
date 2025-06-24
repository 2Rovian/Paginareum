'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// icons
import { GiZeusSword } from "react-icons/gi";
import { IoMenuSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAccountCircle, MdAccountBox } from "react-icons/md";
import { MdOutlineAccountBox, MdOutlineAccountCircle } from "react-icons/md";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { SlLogin, SlLogout  } from "react-icons/sl";
import { IoHome } from "react-icons/io5";
import { IoLibrary } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";

import { RiLoginBoxLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
// -----

export default function Navbar_UL() {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLUListElement | null>(null);

    const links = [
        { label: "Home", href: "/", icon: <IoHome /> },
        { label: "Livros", href: "/bibliotheca", icon: <IoLibrary /> },
        { label: "Login", href: "/login", icon: <RiLoginBoxLine /> },
        { label: "Perfil", href: "/perfil", icon: <MdAccountBox /> },
        { label: "Sobre", href: "/sobre", icon: <FaCircleInfo  /> },
    ]

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
            <ul className="sm:flex gap-x-3 text-lg hidden">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`cursor-pointer transition hover:text-[#e6c46c] ${
                                pathname === link.href ? 'text-[#e6c46c]' : ''
                            }`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Botão do menu mobile */}
            <button
                className="p-2 cursor-pointer text-lg rounded-full outline-2 sm:hidden"
                onClick={() => setShowMenu(!showMenu)}
            >
                {showMenu ? <GiZeusSword /> : <IoMenuSharp />}
            </button>

            {/* Menu mobile com animação */}
            {showMenu && (
                <ul
                    ref={menuRef}
                    className="flex bg-[#b03a2e] absolute mt-3 right-0 flex-col py-0 sm:hidden rounded-lg outline-2 outline-[#f6f1e7] shadow-md 
                    motion-opacity-in-0"
                >
                    {links.map((link) => (
                        <li key={link.href} className='flex justify-start'>
                            <Link
                                href={link.href}
                                className={`cursor-pointer transition hover:text-[#e6c46c] flex gap-x-3 items-center px-7 py-3 text-lg ${
                                    pathname === link.href ? 'text-[#e6c46c]' : ''
                                }`}
                                onClick={() => setShowMenu(false)} 
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
