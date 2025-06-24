'use client'
import { useEffect, useState } from "react";
// import AdicionarLivros from "@/app/components/AdicionarLivro";
import NavbarComp from "../../components/Navbar";
import { GiScrollUnfurled, GiOpenBook } from "react-icons/gi";
import LoadingComp from "@/app/components/LoadingComp";
import { IoCloseCircleOutline } from "react-icons/io5";

import { Livro } from "../../types/livro";
import toast from "react-hot-toast";
import AdicionarLivroGuest from "@/app/components/(guest)/AdicionarLivroGuest";

export default function Biblioteca() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarAddLivro, setMostrarAddLivro] = useState<boolean>(false);

  useEffect(() => {
    const livrosSalvos = localStorage.getItem("PaginareumLivros");
    if (livrosSalvos) {
      setLivros(JSON.parse(livrosSalvos));
    }
    setLoading(false);
  }, []);

  async function copiarParaClipboard(filePath: string) {
    try {
      await navigator.clipboard.writeText(filePath);
      // alert("Link copiado! Cole no navegador para abrir o PDF.");
      toast.success('Link copiado!')
    } catch (err) {
      console.error("Erro ao copiar: ", err);
      toast.error("Não foi possível copiar o link");
    }
  }

  return (
    <>
      <NavbarComp />
      <div className="max-w-5xl mx-auto lg:px-0 px-4">
        <main className="bg-[#f6f1e7] mt-10 pb-4 ">
          <div className="text-center justify-center mb-8 flex flex-col gap-y-2">
            <h1 className="text-4xl font-serif text-[#1a1a1a] ">
              Sua <span className="text-[#b03a2e]">Bibliotheca</span>
            </h1>
            <button
              onClick={() => setMostrarAddLivro(!mostrarAddLivro)}
              className="bg-[#b03a2e] text-[#f6f1e7] px-8 py-2 rounded-lg hover:text-[#e6c46c] mx-auto cursor-pointer transition-hover"
            >
              Adicionar Livro
            </button>
          </div>

          {/* MODAL */}
          {mostrarAddLivro && (
            <div
              className="fixed inset-0 flex justify-center items-center "
              onClick={() => setMostrarAddLivro(false)}
            >

              {/* Fundo escuro + blur */}
              <div
                className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                onClick={() => setMostrarAddLivro(false)}
              ></div>

              <div
                className="bg-[#f6f1e7] p-3 rounded-lg shadow-lg relative z-[500] ring-1 ring-[#b03a2e]/30 w-[90%] max-w-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl text-[#1a1a1a] font-semibold ">Coloque as informações necessárias</h2>
                  <button
                    className="hover:text-[#e6c46c] cursor-pointer text-2xl text-[#b03a2e] transition-hover"
                    onClick={() => setMostrarAddLivro(false)}
                  >
                    <IoCloseCircleOutline />
                  </button>
                </div>

                <AdicionarLivroGuest

                />

              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingComp />
            </div>
          ) : livros.length === 0 ? (
            <div className="flex flex-col justify-center text-center gap-y-3 mt-0">
              <GiScrollUnfurled className="mx-auto text-8xl text-[#e6c46c]" />
              <p className="italic text-lg text-[#6b705c]">
                Parece que não há livros ainda.
              </p>
              
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {livros.map((livro) => (
                <div
                  key={livro.id}
                  className="border bg-white shadow border-[#b03a2e] rounded-lg p-2 flex flex-col justify-between items-center h-full"
                >
                  <img
                    src={livro.imgURL || '/default-cover-smaller.png'}
                    alt={`Capa do livro ${livro.title}`}
                    loading="lazy"
                    className="h-80 border-[#b03a2e] object-cover w-full rounded mb-3"
                  />

                  <div className="flex flex-col flex-1 w-full justify-between">
                    <p className="text-[#1a1a1a] text-lg font-semibold mb-2 text-start">{livro.title}</p>

                    <div className="flex justify-between items-center w-full mt-auto">
                      <button
                        className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] cursor-pointer transition hover px-4 py-2 rounded-md"
                        onClick={() => copiarParaClipboard(livro.filePath)}
                      >
                        Ler agora
                      </button>
                      <span className="text-[#6b705c] text-md italic">{livro.pages} páginas</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

          )}
        </main>
      </div>
    </>
  );
}
