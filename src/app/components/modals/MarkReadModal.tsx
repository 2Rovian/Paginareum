'use client'

import useBooks from "@/app/hooks/useBooks"
import { useState } from "react";
import toast from "react-hot-toast";
import { GiFeather } from "react-icons/gi";

interface MarkReadProgressModal {
    setShowMarkReadProgress: (val: boolean) => void,
     refetchBooks?: () => void,
    book_id: number,
    pages: number
}

export default function MarkReadModal({ setShowMarkReadProgress, book_id, pages, refetchBooks }: MarkReadProgressModal) {
    const [read_progress, set_read_progress] = useState<number | null>(null);
    const { handleMarkReadProgress } = useBooks()

    const handleSaveReadProgress = () => {
        if (read_progress! <= 0 || read_progress! > pages || read_progress === null) {
            toast.error("Erro ao salvar progresso");
            return;
        }

        handleMarkReadProgress(book_id, read_progress, refetchBooks)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center "
            onClick={() => setShowMarkReadProgress(false)}
        >
            {/* Fundo escuro com blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowMarkReadProgress(false)}
            ></div>

            {/* Modal */}
            <div
                className="bg-[#f6f1e7] px-6 py-4 rounded-xl shadow-2xl max-w-md w-[90%] relative border border-[#b03a2e]/30"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Ícone de lixeira */}
                <div className="flex justify-center mb-4 mt-1 text-6xl text-[#b03a2e]">
                    <GiFeather />
                </div>

                <h2 className="text-center text-xl font-semibold text-[#1a1a1a] mb-2">
                    Quantas páginas você já leu?
                </h2>

                <div className="flex w-full justify-center">
                    <div className="flex items-center gap-x-3">
                        <div className="flex px-4 py-2 mx-auto rounded-full items-center outline-2 outline-[#b03a2e]">
                            <input placeholder="0" type="number" className=" appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none mr-2"
                                value={read_progress ?? ''}
                                onChange={(e) => {
                                    const n = Number(e.target.value);
                                    set_read_progress(Number.isNaN(n) ? 0 : n);
                                }}
                                min={0}
                                max={pages}
                            />
                            <span className="font-semibold text-[#b03a2e]"> / {pages}</span>
                        </div>
                        <button className="flex items-center bg-[#b03a2e] text-white gap-x-2 px-4 py-2 rounded-lg cursor-pointer"
                            onClick={handleSaveReadProgress}
                        >
                            <GiFeather />
                            <span
                            >
                                Marcar Leitura
                            </span>
                        </button>
                    </div>
                </div>

                {/* <button className="flex justify-center w-fit mx-auto px-5 py-2 cursor-pointer items-center text-white transition gap-x-2 mt-4 rounded-md bg-[#b03a2e] hover:bg-[#a93226]">
                    <GiFeather />
                    <span

                        className=""
                    >
                        Marcar Leitura
                    </span>
                </button> */}
            </div>
        </div>
    )
}