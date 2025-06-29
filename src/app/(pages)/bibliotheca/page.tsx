'use client'
import { useState, useEffect } from "react";
import NavbarComp from "../../components/Navbar";
import { IoCloseCircleOutline } from "react-icons/io5";

import { GiOpenBook } from "react-icons/gi";
import { GiBookmarklet } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";

import AdicionarLivroGuest from "@/app/components/(guest)/AdicionarLivroGuest";
import { useAuthStore } from "@/app/stores/session-store";
import AdicionarLivroAuth from "@/app/components/(auth)/AdicionarLivroAuth";
import BibliotecaAuthComp from "./(auth)/BibliotecaAuthComp";
import BibliotecaGuestComp from "./(guest)/BibliotecaGuestComp";
import { IoSearch } from "react-icons/io5";
import LoadingComp from "@/app/components/LoadingComp";

export default function Biblioteca() {
  const [mostrarAddLivro, setMostrarAddLivro] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const [hydrated, setHydrated] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => setHydrated(true), 200);
    return () => clearTimeout(timeout);
  }, []);


  // if (!hydrated) {
  //   return (
  //     <>
  //       <div className="flex justify-center items-center min-h-screen bg-[#f6f1e7]">
  //         <div className="animate-spin rounded-full size-10 border-t-4 border-b-4 border-[#b03a2e]"></div>
  //       </div>
  //     </>

  //   );
  // }

  return (
    <>
      <NavbarComp />
      <div className="max-w-5xl mx-auto lg:px-0 px-4">
        <main className="bg-[#f6f1e7] mt-10 pb-4 ">
          <div className="text-center justify-center mb-4 flex flex-col gap-y-2">
            <div className="flex  gap-y-1 flex-row items-center justify-between w-full">
              <h1 className="text-4xl font-serif text-[#1a1a1a] ">
                Sua <span className="text-[#b03a2e]">Bibliotheca</span>
              </h1>
              <button
                onClick={() => setMostrarAddLivro(!mostrarAddLivro)}
                className="bg-[#b03a2e] text-[#f6f1e7] text-xl px-5 py-2 rounded-lg sm:hidden hover:text-[#e6c46c] shadow cursor-pointer transition-hover"
              >
                <GiOpenBook />
              </button>
              <button
                onClick={() => setMostrarAddLivro(!mostrarAddLivro)}
                className="bg-[#b03a2e] hidden sm:flex text-[#f6f1e7] px-4 py-2 rounded-lg hover:text-[#e6c46c] shadow cursor-pointer transition-hover items-center gap-x-2"
              >
                <GiOpenBook />
                Adicionar Livro
              </button>
            </div>

            {/* Barra de Pesquisa */}
            <div className="mt-1 flex flex-col sm:flex-row items-center gap-y-2">
              <div className="flex w-full bg-white shadow items-center outline outline-[#e0e0e0] rounded ease-in-out duration-100 focus-within:outline-2 focus-within:outline-[#b03a2e] overflow-hidden">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Buscar livro por título ou categoria..."
                  className="px-3 py-2 rounded bg-white  grow focus:outline-none"
                />
                <button
                  className={`py-3 sm:hidden focus:border-l-2 text-[#b03a2e] px-4 cursor-pointer hover:text-[#e6c46c] duration-100 ease-in-out ${inputFocused ? 'border-l-2 border-[#b03a2e]' : ''}`}

                >
                  {/* <span>Buscar Livro</span> */}
                  <IoSearch />
                </button>
                <button
                  className={`py-3 hidden sm:flex focus:border-l-2 text-[#b03a2e] px-4 cursor-pointer hover:text-[#e6c46c] duration-100 ease-in-out ${inputFocused ? 'border-l-2 border-[#b03a2e]' : ''}`}

                >
                  <span>Buscar Livro</span>
                </button>
              </div>

            </div>
          </div>

          {/* MODAL */}
          {mostrarAddLivro && (
            <div
              className="fixed inset-0 z-[500] flex items-center justify-center"
              onClick={() => setMostrarAddLivro(false)}
            >

              {/* Fundo escuro + blur */}
              <div
                className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                onClick={() => setMostrarAddLivro(false)}
              ></div>

              <div
                className="relative z-50 bg-[#f6f1e7] w-[90%] max-w-xl p-6 rounded-xl shadow-2xl ring-1 ring-[#b03a2e]/30"
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

                {isAuthenticated ?
                  <AdicionarLivroAuth /> : <AdicionarLivroGuest />}

              </div>
            </div>
          )}

          {!hydrated ?
            <LoadingComp /> :
            isAuthenticated ?
              <BibliotecaAuthComp /> :
              <BibliotecaGuestComp />
          }

        </main>
      </div>
    </>
  );
}
