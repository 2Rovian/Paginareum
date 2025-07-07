'use client'
import { useState, useEffect } from "react";
import NavbarComp from "../../components/layout/(Navbar)/Navbar";
import { IoCloseCircleOutline } from "react-icons/io5";

import { GiOpenBook, GiWhiteBook } from "react-icons/gi";

import AdicionarLivroGuest from "@/app/components/(guest)/AdicionarLivroGuest";
import { useAuthStore } from "@/app/stores/session-store";
import AdicionarLivroAuth from "@/app/components/(auth)/AdicionarLivroAuth";
import BibliotecaAuthComp from "./(auth)/BibliotecaAuthComp";
import BibliotecaGuestComp from "./(guest)/BibliotecaGuestComp";
import { FaCheck } from "react-icons/fa6";
import { MdAutoStories } from "react-icons/md";

export default function Biblioteca() {
  const [mostrarAddLivro, setMostrarAddLivro] = useState<boolean>(false);

  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const [searchType, setSearchType] = useState<"title" | "category" | "author">("title");

  const [searchTerm, setSearchTerm] = useState("");
  const [read_status_state, setRead_status_state] = useState<null | "unread" | "in_progress" | "read">(null);

  const [hydrated, setHydrated] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => setHydrated(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleToggleSearchType = () => {
    if (searchType === "title") {
      setSearchType("category")
      return
    }
    if (searchType === "category") {
      setSearchType("author")
      return
    }
    setSearchType("title")
  }

  return (
    <>
      <NavbarComp />
      <div className="max-w-7xl mx-auto xl:px-0 px-4">
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
                  onChange={(e) => {setSearchTerm(e.target.value); setRead_status_state(null)}}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  maxLength={300}
                  placeholder={`Buscar livro por ${searchType == "title" ? "título" : searchType == "category" ? "categoria" : "autor"}...`}
                  className="px-3 py-2 rounded bg-white  grow focus:outline-none"
                />
                <button
                  className={`py-3 focus:border-l-2 text-[#b03a2e] px-4 cursor-pointer duration-100 hover:text-[#f6f1e7] hover:border-l-[#b03a2e] hover:bg-[#b03a2e] ease-in-out ${inputFocused ? 'border-l-2 border-[#b03a2e]' : ''}`}
                  onClick={handleToggleSearchType}
                >
                  {/* <span>Buscar Livro</span> */}
                  {/* <IoSearch /> */}
                  <span>{searchType == "title" ? "Título" : searchType == "category" ? "Categoria" : "Autor"}</span>
                  {/* <span>{searchType == "title" ?"título":"categoria".replace(/^./, searchType[0].toUpperCase())}</span> */}
                </button>

              </div>

            </div>

            <div className="flex ">
              <ul className="flex w-fit items-center gap-x-1 bg-[#f0e6d6] p-1 rounded-lg shadow-inner">
                <li >
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'unread'
                      ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                      : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                      }`}
                    onClick={() => {
                      if(read_status_state == "unread"){
                        setRead_status_state(null)
                      } else {setRead_status_state("unread")}
                    }}
                    
                  >
                    <GiWhiteBook />
                    <span>Não lidos</span>
                  </button>
                </li>

                <li >
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'in_progress'
                      ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                      : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                      }`}
                    onClick={() => {
                      if(read_status_state == "in_progress"){
                        setRead_status_state(null)
                      } else {setRead_status_state("in_progress")}
                    }}
                  >
                    <MdAutoStories />
                    <span>Lendo</span>
                  </button>
                </li>
                <li >
                  <button
                    className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'read'
                      ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                      : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                      }`}
                    onClick={() => {
                      if(read_status_state == "read"){
                        setRead_status_state(null)
                      } else {setRead_status_state("read")}
                    }}
                  >
                    <FaCheck />
                    <span>Lidos</span>
                  </button>
                </li>
              </ul>
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

          {!hydrated ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="animate-spin rounded-full size-30 border-t-4 border-b-4 border-[#b03a2e]"></div>
            </div>
          ) : isAuthenticated ? (
            <BibliotecaAuthComp
              SearchBook={searchTerm}
              SearchType={searchType}
              read_status_state={read_status_state}
            />
          ) : (
            <BibliotecaGuestComp />
          )}

        </main>
      </div>
    </>
  );
}
