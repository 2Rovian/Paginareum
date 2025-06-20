import NavbarComp from "@/app/components/Navbar";

export default function SobrePage() {
    return (
        <>
            <NavbarComp />
            <div className="max-w-5xl mx-auto lg:px-0 px-4">
                <main className="bg-[#f6f1e7] mt-10 pb-4 flex flex-col justify-center text-center">
                    <h1 className="text-4xl font-serif text-[#1a1a1a] text-center mb-6 ">
                        <span className="text-[#b03a2e]">Paginare</span> é:
                    </h1>

                    <p className='text-[#6b705c] max-w-lg mx-auto'>Um projeto pessoal sem fins lucrativos que resolve uma demanda de organização e melhor leitura de PDFs com base em um leitor novo :)</p>

                    <p className="text-[#6b705c] mx-auto mt-12 px-4 self-center ">
                        Se este projeto te agradou, conheça também outros projetos meus no GitHub: 
                        <span className="hover:underline ml-1 hover:text-[#b03a2e] transition-hover">
                            <a
                                href="https://github.com/2Rovian"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" "
                            >
                                github.com/2Rovian
                            </a>
                        </span>
                    </p>
                    {/* <p className="text-[#6b705c] mx-auto absolute bottom-[24px] px-4 self-center ">
                        Se este projeto te agradou, conheça também outros projetos meus no GitHub: 
                        <span className="hover:underline ml-1 hover:text-[#b03a2e] transition-hover">
                            <a
                                href="https://github.com/2Rovian"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" "
                            >
                                github.com/2Rovian
                            </a>
                        </span>
                    </p> */}


                </main>
            </div>
        </>
    );
}