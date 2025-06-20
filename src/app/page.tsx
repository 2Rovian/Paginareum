import Link from 'next/link';
import NavbarComp from "./components/Navbar";
import { GiLaurels } from "react-icons/gi";
import { GiScrollQuill } from "react-icons/gi";
import { GiGreekTemple } from "react-icons/gi";

export default function Home() {
  return (
    <>
      <NavbarComp />
      <div className="max-w-5xl lg:px-0 mx-auto px-4">
        <main className="bg-[#f6f1e7] mt-10 flex flex-col items-center justify-center text-center px-4 pb-4">
          <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">Bem-vindo ao <span className="text-[#b03a2e]">Paginare</span></h1>
          <p className="text-[#6b705c] max-w-lg mb-6">
            Organize seus livros e leia do seu jeito. O Paginare oferece uma biblioteca pessoal com ajuste de fonte, modo escuro e recursos que tornam sua leitura mais acessível.

          </p>
          <div className="flex gap-4">
            <button className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] px-4 py-2 rounded-lg cursor-pointer transition-hover">
              Adicionar Livro
            </button>
            <Link href={'/bibliotheca'} className='rounded-lg'>
              <button className="border border-[#6b705c] hover:border-[#b03a2e] text-[#6b705c] px-4 py-2 rounded-lg hover:text-[#b03a2e]  cursor-pointer transition-hover">
                Ver Bibliotheca
              </button>
            </Link>
          </div>
        </main>

        <section className="my-6 w-full mx-auto">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4 text-center">Por que Paginare?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#1a1a1a]">
            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg  text-center">
              <GiLaurels className="mx-auto text-6xl mb-2 text-[#e6c46c]"/>
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Organização</span>
              <p className="text-sm text-[#6b705c]">Grupos, subgrupos e livros no lugar certo.</p>
            </li>
            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg  text-center">
              <GiScrollQuill className="mx-auto text-6xl mb-2 text-[#e6c46c]"/>
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Acessibilidade</span>
              <p className="text-sm text-[#6b705c]">Ajuste de fonte, modo escuro e leitura adaptada.</p>
            </li>
            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg  text-center">
              <GiGreekTemple className="mx-auto text-6xl mb-2 text-[#e6c46c]"/>
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Mobilidade</span>
              <p className="text-sm text-[#6b705c]">Leia onde quiser, quando quiser.</p>
            </li>
          </ul>
        </section>
      </div>

    </>
  );
}

// Mistura o clássico com o moderno, remetendo ao saber antigo, mas com usabilidade atual.
// Cores sugeridas:
// Bege claro (#f6f1e7) — cor de papiro.
// Vermelho Pompeia (#b03a2e) — símbolo de elegância e poder.
// Dourado queimado (#c79c60) — detalhes de destaque.
// Cinza-escuro ou preto fosco (#1a1a1a) — para contraste e leitura.
// Verde oliva ou louro (#6b705c) — toques vegetais, lembrando coroas romanas.