"use client"
import AdicionarLivroAuth from "@/app/components/(auth)/AdicionarLivroAuth";
import AdicionarLivroGuest from "@/app/components/(guest)/AdicionarLivroGuest";
import { IoCloseCircleOutline } from "react-icons/io5";

type setMostrarAddLivro = (val: boolean) => void

export default function BibliothecaModalAddBook({ setMostrarAddLivro, isAuthenticated  }: {setMostrarAddLivro: setMostrarAddLivro, isAuthenticated: boolean}) {
    return (
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
                className="relative z-50 bg-[#f6f1e7] w-[90%] max-w-2xl p-6 rounded-xl shadow-2xl ring-1 ring-[#b03a2e]/30"
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

                {isAuthenticated && <AdicionarLivroAuth />}

            </div>
        </div>
    )
}