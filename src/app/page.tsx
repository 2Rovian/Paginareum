import Link from 'next/link';
import NavbarComp from "./components/Navbar";
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

        <section className="mt-6 w-full mx-auto">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4 text-center">Por que Paginareum?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[#1a1a1a]">
            <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg text-center">
              <IoLibrary className="mx-auto text-6xl mb-2 text-[#e6c46c]" />
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Catálogo Pessoal</span>
              <p className="text-sm text-[#6b705c]">Adicione e organize seus livros em um só lugar com facilidade e clareza.</p>
            </li>

            {/* <li className="px-3 py-4 md:py-5 flex flex-col justify-center border border-[#b03a2e] rounded-lg text-center">
              <GiLaurels className="mx-auto text-6xl mb-2 text-[#e6c46c]" />
              <span className="font-bold mb-1 text-lg text-[#b03a2e]">Busca Inteligente</span>
              <p className="text-sm text-[#6b705c]">Encontre livros por título, autor ou categoria em segundos.</p>
            </li> */}

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

        <section className="mt-6 px-4 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-[#1a1a1a] mb-3">Autenticado ou não: como você prefere usar?</h2>
          <p className="text-[#6b705c] mb-3 text-sm">
            O Paginareum funciona tanto para visitantes quanto para usuários cadastrados.
          </p>
          <div className="mb-6">
            <Link href="/login">
              <button className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] px-5 py-2 rounded-lg cursor-pointer transition-hover">
                Crie sua conta gratuitamente
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="border border-[#b03a2e] rounded-lg p-5">
              <h3 className="text-lg font-bold text-[#b03a2e] mb-2">Visitante (Guest)</h3>
              <ul className="text-sm text-[#6b705c] space-y-1">
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Adicione e exclua livros</span>

                </li>
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Armazenamento no navegador via localStorage</span>
                </li>
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Perde os dados se mudar de navegador ou dispositivo</span>
                </li>
              </ul>
            </div>

            <div className="border border-[#b03a2e] rounded-lg p-5 ">
              <h3 className="text-lg font-bold text-[#b03a2e] mb-2">Usuário Autenticado</h3>
              <ul className="text-sm text-[#6b705c] space-y-1">
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Adicione e exclua livros</span>

                </li>
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Acesse seus livros de qualquer lugar</span>

                </li>
                <li className='flex items-start gap-x-2'>
                  <span className="text-[#b03a2e]">→</span>
                  <span>Marque seu progresso literário</span>

                </li>
              </ul>
            </div>
          </div>

          {/* <div className="mt-6">
            <Link href="/login">
              <button className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] font-semibold px-5 py-2 rounded-lg cursor-pointer transition-hover">
                Crie sua conta gratuitamente
              </button>
            </Link>
          </div> */}
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

// Mistura o clássico com o moderno, remetendo ao saber antigo, mas com usabilidade atual.
// Cores sugeridas:
// Bege claro (#f6f1e7) — cor de papiro.
// Vermelho Pompeia (#b03a2e) — símbolo de elegância e poder.
// Dourado queimado (#c79c60) — detalhes de destaque.
// Cinza-escuro ou preto fosco (#1a1a1a) — para contraste e leitura.
// Verde oliva ou louro (#6b705c) — toques vegetais, lembrando coroas romanas.