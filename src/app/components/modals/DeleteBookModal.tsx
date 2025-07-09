'use client'

import useBooks from "@/app/hooks/useBooks"
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteBookModal{
    setShowDeleteBook: (val: boolean) => void,
    book_id: number,
    refetchBooks?: () => void
}

export default function DeleteBookModal({ setShowDeleteBook, book_id, refetchBooks } : DeleteBookModal ) {

    const { handleDeleteBook } = useBooks()

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center "
            onClick={() => setShowDeleteBook(false)}
        >
            {/* Fundo escuro com blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowDeleteBook(false)}
            ></div>

            {/* Modal */}
            <div
                className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-[90%] relative border border-[#b03a2e]/30"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Ícone de lixeira */}
                <div className="flex justify-center mb-4 mt-1 text-8xl text-[#b03a2e]">
                    <RiDeleteBin6Line />
                </div>

                <h2 className="text-center text-xl font-semibold text-[#1a1a1a] mb-2">
                    Tem certeza que deseja deletar este livro?
                </h2>

                <p className="text-center text-sm text-[#6b705c] mb-5">
                    Essa ação é permanente e não poderá ser desfeita.
                </p>

                <div className="flex justify-end gap-x-2">
                    <button
                        onClick={() => setShowDeleteBook(false)}
                        className="px-5 py-2 rounded-md border border-[#6b705c] text-[#6b705c] hover:text-[#b03a2e] hover:border-[#b03a2e] cursor-pointer transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() => handleDeleteBook(book_id, setShowDeleteBook, refetchBooks)}
                        className="px-5 py-2 rounded-md bg-[#b03a2e] cursor-pointer text-white hover:bg-[#a93226] transition"
                    >
                        Remover livro
                    </button>
                </div>
            </div>
        </div>
    )
}