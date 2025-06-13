import NavbarComp from "../../components/Navbar";
import Image from "next/image";
import { GiOpenBook, GiBookmarklet } from "react-icons/gi";
import { GiScrollUnfurled } from "react-icons/gi";

export default function Biblioteca() {
  return (
    <>
      <NavbarComp />
      <div className="max-w-5xl mx-auto lg:px-0 px-4">
        <main className="bg-[#f6f1e7] mt-6 p-4">
          <h1 className="text-4xl font-serif text-[#1a1a1a] text-center mb-6">
            Sua <span className="text-[#b03a2e]">Bibliotheca</span>
          </h1>

          {/* <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <p>Massa.</p>
          </section> */}
          <div className="flex flex-col justify-center text-center gap-y-3 mt-0">
            <GiScrollUnfurled className="mx-auto text-8xl text-[#e6c46c]"/>
            <p className="italic text-lg text-[#6b705c]">Parece que não há livros ainda.</p>
            <button className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] px-4 py-2 rounded-lg cursor-pointer transition-hover self-center">
              Adicionar Livro
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
