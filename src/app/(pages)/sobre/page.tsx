import NavbarComp from "@/app/components/layout/(Navbar)/Navbar";

export default function SobrePage() {
    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <main className="bg-[#f6f1e7] border-2 border-[#b03a2e] my-10 px-6 py-10 rounded-lg shadow-sm">
                    <section className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">
                            O que é <span className="text-[#b03a2e]">Paginareum</span>?
                        </h1>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-lg">
                            Paginareum é um projeto pessoal focado na organização de leituras. A plataforma permite que usuários cataloguem seus livros, acompanhem o progresso de leitura e visualizem estatísticas — tudo de forma prática e intuitiva.
                        </p>
                    </section>

                    <section className="text-center mb-12">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Objetivo</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            A ideia surgiu da necessidade de acompanhar melhor o que leio. Antes, usava um conglomerado de abas no navegador que, embora agrupadas, geravam certo incômodo. A partir disso, criei um ambiente visual que, além de catalogar os livros, facilita o acompanhamento das leituras, com status como <strong>“Não Lido”</strong>, <strong>“Em Progresso”</strong> e <strong>“Lido”</strong>.
                        </p>
                    </section>

                    <section className="text-center mb-12">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Tecnologias</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            Este projeto foi desenvolvido com{" "}
                            <a href="https://nextjs.org/" className="hover:text-[#000000] transition-colors">Next.js</a>,{" "}
                            <a href="https://tailwindcss.com/" className="hover:text-[#06B6D4] transition-colors">TailwindCSS</a>,{" "}
                            <a href="https://supabase.com/" className="hover:text-[#3ECF8E] transition-colors">Supabase</a>{" "}
                            e{" "}
                            <a href="https://zustand-demo.pmnd.rs/" className="hover:text-[#61428f] transition-colors">Zustand</a>{" "}
                            (para autenticação, banco de dados, armazenamento e gerenciamento de estado). Ícones e animações foram incluídos para aprimorar a experiência de uso, utilizando{" "}
                            <a href="https://rombo.co/tailwind/" className="hover:text-[#38BDF8] transition-colors">tailwind-motion</a>{" "}
                            e{" "}
                            <a href="https://react-icons.github.io/react-icons/" className="hover:text-[#E91E63] transition-colors">react-icons</a>. Por fim, a página de detalhes de livros faz buscas com dados da Google Books API.
                        </p>
                    </section>

                    <section className="text-center">
                        <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Mais projetos</h2>
                        <p className="text-[#6b705c] max-w-xl mx-auto text-md">
                            Se este projeto te interessou, considere explorar outros trabalhos meus em{" "}
                            <a
                                href="https://github.com/2Rovian"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b03a2e] hover:underline"
                            >
                                github.com/2Rovian
                            </a>.
                        </p>
                    </section>
                </main>
            </div>
        </>
    );
}
