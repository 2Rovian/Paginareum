import NavbarComp from "@/app/components/Navbar";
import LoginComp from "./LoginComp";

export default function LoginPage() {
    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto lg:px-0 px-4">
                <main className="bg-[#f6f1e7] mt-10 pb-4 flex flex-col justify-center text-center mb-4">
                    {/* <h1 className="text-4xl mb-4 font-serif text-[#1a1a1a]">
                        Conecte-se ao <span className="text-[#b03a2e]">Paginareum</span>


                    </h1> */}

                    <LoginComp />
                </main>
            </div>
        </>

    )
}