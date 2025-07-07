import Link from 'next/link'
import { Cinzel } from 'next/font/google'
import Navbar_UL from './NavbarUL'

const cinzelFont = Cinzel({
    subsets: ['latin'],
    weight: '400'
})

export default function NavbarComp(){
    return(
        <header className="h-[80px] bg-[#b03a2e] text-[#f6f1e7] px-4 shadow ">
            <div className="size-full max-w-7xl mx-auto flex items-center justify-between ">
                <div className={`${cinzelFont.className} text-3xl cursor-pointer`}>
                    <Link href={'/'}>Paginareum</Link>
                </div>
                
                <Navbar_UL />
            </div>
        </header>
    )
}