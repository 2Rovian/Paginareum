import NavbarComp from "@/app/components/layout/(Navbar)/Navbar";

export default function SobrePage() {
    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <main className="bg-[#f6f1e7] border-2 border-[#b03a2e] my-10 px-6 py-10 rounded-lg shadow-sm ">
                    <section className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">
                            O que é <span className="text-[#b03a2e]">Paginareum</span>?
                        </h1>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-lg">
                            Paginareum é um projeto pessoal focado em organização de leituras. A plataforma permite que usuários cataloguem seus livros, controlem o progresso de leitura e visualizem estatísticas, tudo de forma prática e intuitiva.
                        </p>
                    </section>

                    <section className="text-center mb-12">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Objetivo</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            A proposta nasceu da necessidade de acompanhar melhor o que leio. Ao invés de depender de planilhas ou anotações manuais, criei um ambiente visual que facilita o acompanhamento de leituras, com status como <strong>“Não Lido”</strong>, <strong>“Em Progresso”</strong> e <strong>“Lido”</strong>.
                        </p>
                    </section>

                    <section className="text-center mb-12">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Tecnologias</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            Este projeto foi desenvolvido com{' '}
                            <span className="text-[#000000] hover:text-[#0070f3] transition-colors">
                                <a href="https://nextjs.org/">Next.js</a>
                            </span>
                            ,{' '}
                            <span className="text-[#06B6D4] hover:text-[#0e7490] transition-colors">
                                <a href="https://tailwindcss.com/">TailwindCSS</a>
                            </span>{' '}
                            ,{' '}
                            <span className="text-[#3ECF8E] hover:text-[#2d9c6f] transition-colors">
                                <a href="https://supabase.com/">Supabase</a>
                            </span>{' '}
                            e{' '}
                            <span className="text-[#61428f] hover:text-[#4a2d7a] transition-colors">
                                <a href="https://zustand-demo.pmnd.rs/">Zustand</a>
                            </span>{' '}
                            (autenticação, banco de dados, storage e gestão de estado), além de ícones e animações leves -{' '}
                            <span className="text-[#38BDF8] hover:text-[#0ea5e9] transition-colors">
                                <a href="https://rombo.co/tailwind/">tailwind-motion</a>
                            </span>
                            ,{' '}
                            <span className="text-[#E91E63] hover:text-[#c2185b] transition-colors">
                                <a href="https://react-icons.github.io/react-icons/">react-icons</a>
                            </span>{' '}
                            - para uma boa experiência de uso.
                        </p>
                    </section>

                    <section className="text-center">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Mais projetos</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            Se este projeto te agradou, considere ver outros projetos de minha autoria:
                            <a
                                href="https://github.com/2Rovian"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-[#b03a2e] hover:underline"
                            >
                                github.com/2Rovian
                            </a>
                        </p>
                    </section>
                </main>
            </div>
        </>
    );
}
