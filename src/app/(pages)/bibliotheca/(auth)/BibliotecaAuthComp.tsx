'use client'

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/utils/supabase/client"
import toast from "react-hot-toast"

// icons
import { BsThreeDots } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiExpand } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
// -----

import { Book } from "@/app/types/types";

export default function BibliotecaAuthComp() {
    const [books, setBooks] = useState<Book[]>([]);

    const [showDeleteBook, setShowDeleteBook] = useState<boolean>(false);
    // const [showExpandedIMG, setShowExpandIMG] = useState<boolean>(false);
    const [expandedImg, setExpandedImg] = useState<string | null>(null);

    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(prev => (prev === id ? null : id));
    };

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const fetchBooks = async () => {
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Erro ao buscar livros", error.message)
            toast.error("Erro ao buscar livros")
            return;
        }

        setBooks(data);
    }

    useEffect(() => {
        fetchBooks()

    }, []);

    const handleDeleteBook = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq("book_id", id)
        
        if(error){
            console.error("Erro ao remover livro: ", error.message)
            toast.error("Erro ao remover livro")
            return
        }

        toast.success("Livro removido");
        setShowDeleteBook(false);
    }

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map((livro) => (
                    <article
                        key={livro.book_id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-[#e0e0e0] group "
                    >

                        <div className="relative">
                            <img
                                src={livro.cover_img || '/default-cover-smaller.png'}
                                alt={`Capa do livro ${livro.title}`}
                                className="h-72 w-full object-cover"
                                loading="lazy"
                            />

                            <button
                                onClick={() => toggleDropdown(livro.book_id)}
                                className={`absolute opacity-20 group-hover:opacity-100 ${openDropdownId ? "opacity-100" : ""} duration-300 ease-in-out top-2 right-2 p-1 text-2xl rounded-full bg-white text-[#1a1a1a] cursor-pointer  outline outline-[#797979] shadow-md hover:bg-[#fbfbfb]`}
                            >
                                <BsThreeDots />
                            </button>

                            {openDropdownId === livro.book_id && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-2 top-12 z-10 bg-white border shadow-lg rounded-lg text-sm w-fit motion-opacity-in-0 overflow-hidden"
                                >
                                    <ul className="flex flex-col text-[#1a1a1a]">

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-black duration-150 ease-in-out"
                                            onClick={() => {setExpandedImg(livro.cover_img);setOpenDropdownId(null)}}
                                        >
                                            <span>
                                                <GiExpand />
                                            </span>
                                            <span>Expandir Imagem</span>
                                        </li>

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-green-600 duration-150 ease-in-out"

                                        >
                                            <span>
                                                <FaCheck />
                                            </span>
                                            <span>Marcar como lido</span>
                                        </li>

                                        {/* <GiExpand /> */}

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out
                                        "
                                            onClick={() => setShowDeleteBook(true)}
                                        >
                                            <span>
                                                <RiDeleteBin6Line />
                                            </span>
                                            <span>Remover livro</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* MODAL */}
                        {showDeleteBook && (
                            <div
                                className="fixed inset-0 flex justify-center items-center z-50"
                                onClick={() => setShowDeleteBook(false)}
                            >
                                {/* Fundo escuro com blur */}
                                <div
                                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                    onClick={() => setShowDeleteBook(false)}
                                ></div>

                                {/* Modal */}
                                <div
                                    className="bg-white p-3 rounded-xl shadow-2xl z-50 max-w-md w-[90%] relative border border-[#b03a2e]/30"
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
                                            onClick={() => handleDeleteBook(livro.book_id)}
                                            className="px-5 py-2 rounded-md bg-[#b03a2e] cursor-pointer text-white hover:bg-[#a93226] transition"
                                        >
                                            Remover livro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* MODAL */}
                        {expandedImg && (
                            <div
                                className="fixed inset-0 flex justify-center items-center "
                                onClick={() => setExpandedImg(null)}
                            >

                                {/* Fundo escuro + blur */}
                                <div
                                    className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                                    onClick={() => setExpandedImg(null)}
                                ></div>

                                <div className="z-50 relative"
                                onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={expandedImg}
                                        alt={`Imagem do livro "${livro.title}" `}
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-xl border"
                                    />
                                    <span className="absolute top-4 right-4 cursor-pointer opacity-40 hover:opacity-100 duration-150 ease-in-out text-4xl"
                                    onClick={() => setExpandedImg(null)}
                                    >
                                        <IoCloseCircleOutline />
                                    </span>
                                </div>

                            </div>
                        )}

                        <div className="flex flex-col flex-1 p-3">
                            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-1 line-clamp-2 "
                                title={livro.title}
                            >
                                {livro.title}
                            </h3>

                            <p className="text-sm text-[#3e3e3e] font-medium mb-0">
                                por {livro.author || "Autor desconhecido"}
                            </p>

                            <p className="text-sm text-[#6b705c] mb-0">
                                {livro.category || 'Sem categoria'}
                            </p>

                            <div className="flex items-center justify-between mt-auto text-sm">
                                <span className=" text-[#6b705c]">
                                    {livro.pages} páginas
                                </span>

                                <a
                                    href={livro.urlPath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:bg-[#b03a2e] text-[#b03a2e] hover:text-[#f6f1e7] px-8 py-2 rounded-lg outline-2 outline-[#a93226] font-semibold transition-colors duration-200 "
                                >
                                    Ler agora
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

        </>
    )
}