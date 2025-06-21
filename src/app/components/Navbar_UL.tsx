'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Navbar_UL() {
    const pathname = usePathname();

    const links = [
        { label: "Home", href: "/" },
        { label: "Livros", href: "/bibliotheca" },
        { label: "Login", href: "/login" },
        // { label: "Sobre", href: "/sobre" }
    ]

    return (
        <ul className={`flex gap-x-3 text-lg`}>
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
    )
}