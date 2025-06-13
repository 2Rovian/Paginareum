import Link from 'next/link'
import { Cinzel } from 'next/font/google'
import Navbar_UL from './Navbar_UL'

const cinzelFont = Cinzel({
    subsets: ['latin'],
    weight: '400'
})

export default function NavbarComp(){
    return(
        <header className="h-[80px] bg-[#b03a2e] text-[#f6f1e7] px-4 shadow ">
            <div className="size-full max-w-5xl mx-auto flex items-center justify-between ">
                <div className={`${cinzelFont.className} text-3xl cursor-pointer`}>Paginare</div>
                {/* <ul className={`flex gap-x-3 text-lg`}>
                    <li className='hover:text-[#e6c46c] cursor-pointer transition-hover'>Home</li>
                    <li className='hover:text-[#e6c46c] cursor-pointer transition-hover'>Livros</li>
                    <li className='hover:text-[#e6c46c] cursor-pointer transition-hover'>About</li>
                    
                </ul> */}
                <Navbar_UL />
            </div>
        </header>
    )
}