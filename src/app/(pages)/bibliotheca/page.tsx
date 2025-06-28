'use client'
import { useState } from "react";
import NavbarComp from "../../components/Navbar";
import { IoCloseCircleOutline } from "react-icons/io5";
import AdicionarLivroGuest from "@/app/components/(guest)/AdicionarLivroGuest";
import { useAuthStore } from "@/app/stores/session-store";
import AdicionarLivroAuth from "@/app/components/(auth)/AdicionarLivroAuth";
import BibliotecaAuthComp from "./(auth)/BibliotecaAuthComp";
import BibliotecaGuestComp from "./(guest)/BibliotecaGuestComp";

export default function Biblioteca() {
  const [mostrarAddLivro, setMostrarAddLivro] = useState<boolean>(false);

  const { isAuthenticated } = useAuthStore();

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
              className="fixed inset-0 flex justify-center items-center z-[500]"
              onClick={() => setMostrarAddLivro(false)}
            >

              {/* Fundo escuro + blur */}
              <div
                className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                onClick={() => setMostrarAddLivro(false)}
              ></div>

              <div
                className="bg-[#f6f1e7] p-3 rounded-lg shadow-lg relative ring-1 ring-[#b03a2e]/30 w-[90%] max-w-xl "
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

          {isAuthenticated ? 
          <BibliotecaAuthComp /> : 
          <BibliotecaGuestComp />}

        </main>
      </div>
    </>
  );
}
