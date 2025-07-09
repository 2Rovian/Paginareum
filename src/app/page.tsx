import Link from 'next/link';
import NavbarComp from "./components/layout/(Navbar)/Navbar";
import { GiScrollQuill, GiGreekTemple } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";


export default function Home() {
  return (
    <>
      <NavbarComp />
      <div className="max-w-7xl lg:px-0 mx-auto px-4">
        <main className="bg-[#f6f1e7] mt-10 flex flex-col items-center justify-center text-center px-4 pb-4">
          <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">Bem-vindo ao <span className="text-[#b03a2e]">Paginareum</span></h1>
          <p className="text-[#6b705c] max-w-lg mb-6">
            Organize seus livros e acesse sua biblioteca pessoal de qualquer lugar. Com visual agradável e navegação intuitiva, o Paginareum foi feito para leitores modernos com gosto clássico.


          </p>
          <div className="">
            <Link href={'/bibliotheca'} className='rounded-lg'>
              <button className="border border-[#6b705c] hover:border-[#b03a2e] text-[#6b705c] px-8 py-2 rounded-lg hover:text-[#b03a2e]  cursor-pointer transition-hover">
                Ver Bibliotheca
              </button>
            </Link>
          </div>
        </main>

        <section className="mt-6 w-full mx-auto">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4 text-center">Por que Paginareum?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[#1a1a1a]">
            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg text-center">
              <IoLibrary className="mx-auto text-6xl mb-2 text-[#e6c46c]" />
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Catálogo Pessoal</span>
              <p className="text-sm text-[#6b705c]">Adicione e organize seus livros em um só lugar com facilidade e clareza.</p>
            </li>

            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg text-center">
              <GiScrollQuill className="mx-auto text-6xl mb-2 text-[#e6c46c]" />
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Status de Leitura</span>
              <p className="text-sm text-[#6b705c]">Marque seus livros como lidos, em progresso ou ainda não lidos.</p>
            </li>

            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg text-center">
              <GiGreekTemple className="mx-auto text-6xl mb-2 text-[#e6c46c]" />
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Acesso Universal</span>
              <p className="text-sm text-[#6b705c]">Seu acervo pessoal disponível em qualquer lugar, a qualquer momento.</p>
            </li>

          </ul>

        </section>

        <section className="mt-6 px-4 flex flex-col justify-center items-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Comece sua jornada literária</h2>
          <p className="text-[#6b705c] mb-3 text-sm">
            Para salvar e gerenciar seus livros, é necessário ter uma conta. A boa notícia? É rápido, gratuito e sem complicações.
          </p>

          <div className="mb-6">
            <Link href="/login">
              <button className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] px-5 py-2 rounded-lg cursor-pointer transition-hover">
                Criar conta ou fazer login
              </button>
            </Link>
          </div>

          <div className="border border-[#b03a2e] rounded-lg p-5 w-fit mx-auto">
            <h3 className="text-lg text-center font-bold text-[#b03a2e] mb-2">Recursos disponíveis para usuários autenticados</h3>
            <ul className="text-sm text-[#6b705c] space-y-1">
              <li className='flex items-start gap-x-2'>
                <span className="text-[#b03a2e]">→</span>
                <span>Adicione e exclua livros da sua biblioteca pessoal</span>
              </li>
              <li className='flex items-start gap-x-2'>
                <span className="text-[#b03a2e]">→</span>
                <span>Acesse seus livros de qualquer dispositivo</span>
              </li>
              <li className='flex items-start gap-x-2'>
                <span className="text-[#b03a2e]">→</span>
                <span>Marque seu progresso de leitura (não lido, em progresso, lido)</span>
              </li>
            </ul>
          </div>
        </section>

      </div>
      <footer className="text-center py-6 text-sm text-[#6b705c] border-t border-[#b03a2e]/20 mt-10">
        <p className="text-sm">
          &copy; 2025 Paginareum - Feito por <span className="text-[#b03a2e] hover:underline"><a href="https://github.com/2Rovian" target='_blank'>Rovian</a></span>.
        </p>

      </footer>
    </>
  );
}
