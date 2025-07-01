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
import { MdAutoStories } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

// -----
import { useDebounce } from 'use-debounce'
import { Book } from "@/app/types/types";

interface SearchBookProps{
    SearchBook?: string;
}

export default function BibliotecaAuthComp({ SearchBook = "" }: SearchBookProps) {
    const [books, setBooks] = useState<Book[]>([]);

    const [showDeleteBook, setShowDeleteBook] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [expandedImg, setExpandedImg] = useState<string | null>(null);

    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [debounceBook] = useDebounce(SearchBook, 1000)

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
    // ----------------------------

    // busca por livros dado o input
    useEffect(() => {
        const fetchByBookName = async () => {
            if (!debounceBook.trim()) {
                fetchAllBooks();
                return
            }
            setIsLoading(true)

            const { data } = await supabase
                .from("books")
                .select()
                .textSearch("title", debounceBook.trim())

            setIsLoading(false)
            setBooks(data || []);
        }

        fetchByBookName()
    }, [debounceBook]);
    // -------------------------------

    const fetchAllBooks = async () => {
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao buscar livros:", error);
            toast.error("Erro ao carregar livros");
            return
        }

        setBooks(data || []);
    };

    useEffect(() => {
        fetchAllBooks();
    }, []); // 

    const handleDeleteBook = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao remover livro: ", error.message)
            toast.error("Erro ao remover livro")
            return
        }

        toast.success("Livro removido");
        setShowDeleteBook(false);
        
    }

    const handleMarkAsRead = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "read" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como lido:", error.message);
            toast.error("Erro ao marcar livro como lido");
            return;
        }

        toast.success("Livro marcado como lido");
        setOpenDropdownId(null);

    }

    const handleMarkAsReading = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "in_progress" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como em progresso:", error.message);
            toast.error("Erro ao marcar livro como em progresso");
            return;
        }

        toast.success("Livro marcado como em progresso");
        setOpenDropdownId(null);
        
    }

    const handleMarkAsUnread = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "unread" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como não livro:", error.message);
            toast.error("Erro ao marcar livro como não livro");
            return;
        }

        toast.success("Livro marcado como não lido");
        setOpenDropdownId(null);
    }

    if(isLoading) return(
        <div className="col-span-full flex justify-center py-10">
            <div className="animate-spin rounded-full size-30 border-t-4 border-b-4 border-[#b03a2e]"></div>
        </div>
    )

    if (debounceBook.trim() && books.length === 0) return (
        <div className="text-center py-10 overflow-hidden">
            <p className="text-2xl text-[#b03a2e]">
                Não há livros de nome "{debounceBook}"
            </p>
        </div>
    )

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                {books.map((livro) => (
                    <article
                        key={livro.book_id}
                        className="bg-white rounded-xl shadow overflow-hidden flex flex-col border border-[#e0e0e0] group "
                    >

                        <div className="relative">
                            <img
                                src={livro.cover_img || '/default-cover-smaller.png'}
                                alt={`Capa do livro ${livro.title}`}
                                className="h-72 w-full object-cover"
                                loading="lazy"
                            />

                            <div className={`absolute flex px-2 top-2 w-full
                                ${livro.read_status == "read" || livro.read_status == "in_progress" ? "justify-between items-center" : "justify-end "}`}>

                                {livro.read_status == "read" && <div
                                    className={` ${openDropdownId ? "opacity-100" : ""} py-1 text-sm text-[#b03a2e] rounded-full bg-white cursor-pointer flex items-center gap-x-2 px-2 outline  shadow-md `}
                                >
                                    <FaCheck />
                                    <span>Lido</span>
                                </div>}

                                {livro.read_status == "in_progress" && <div
                                    className={` ${openDropdownId ? "opacity-100" : ""} py-1 text-sm text-[#b03a2e] rounded-full bg-white cursor-pointer flex items-center gap-x-2 px-2 outline  shadow-md `}
                                >
                                    <MdAutoStories />
                                    <span>Em progresso</span>
                                </div>}

                                {/* <div
                                    className={` ${openDropdownId ? "opacity-100" : ""} py-1 text-sm text-green-700 rounded-full bg-white cursor-pointer flex items-center gap-x-2 px-2 outline  shadow-md hover:bg-[#fbfbfb]`}
                                >
                                    <FaCheck />
                                    <span>Lido</span>
                                </div> */}

                                <button
                                    onClick={() => toggleDropdown(livro.book_id)}
                                    className={`opacity-60 group-hover:opacity-100 ${openDropdownId ? "opacity-100" : ""} duration-300 ease-in-out p-1 text-xl rounded-full bg-white text-[#1a1a1a] cursor-pointer outline outline-[#797979] shadow-md hover:bg-[#fbfbfb]`}
                                >

                                    <BsThreeDots />
                                </button>
                            </div>

                            {openDropdownId === livro.book_id && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-2 top-12 z-10 bg-white border shadow-lg rounded-lg text-sm w-fit motion-opacity-in-0 overflow-hidden"
                                >
                                    <ul className="flex flex-col text-[#1a1a1a]">

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                            onClick={() => { setExpandedImg(livro.cover_img); setOpenDropdownId(null) }}
                                        >
                                            <span>
                                                <GiExpand />
                                            </span>
                                            <span>Expandir Imagem</span>
                                        </li>

                                        {livro.read_status == "read" ?

                                            <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                                onClick={() => handleMarkAsUnread(livro.book_id)}
                                            >
                                                <span>
                                                    <MdOutlineClose />
                                                </span>
                                                <span>Não lido</span>
                                            </li>
                                            :
                                            // <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-green-600 duration-150 ease-in-out"
                                            //     onClick={() => handleMarkAsRead(livro.book_id)}
                                            // >
                                            //     <span>
                                            //         <MdOutlineClose />
                                            //     </span>
                                            //     <span>Não lido</span>
                                            // </li>
                                            <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                                onClick={() => handleMarkAsRead(livro.book_id)}
                                            >
                                                <span>
                                                    <FaCheck />
                                                </span>
                                                <span>Lido</span>
                                            </li>
                                        }

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                            onClick={() => handleMarkAsReading(livro.book_id)}
                                        >
                                            <span>
                                                <MdAutoStories />
                                            </span>
                                            <span>Em progresso</span>
                                        </li>


                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out
                                        "
                                            onClick={() => setShowDeleteBook(true)}
                                        >
                                            <span>
                                                <RiDeleteBin6Line />
                                            </span>
                                            <span>Remover livro </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* MODAL */}
                        {showDeleteBook && (
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
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm "
                                onClick={() => setExpandedImg(null)}
                            >

                                {/* Fundo escuro + blur */}
                                <div
                                    className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                                    onClick={() => setExpandedImg(null)}
                                ></div>

                                <div className="relative max-w-4xl w-[90%] max-h-[90vh] overflow-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={expandedImg}
                                        alt={`Imagem do livro "${livro.title}" `}
                                        className="w-full h-auto object-contain rounded-xl shadow-2xl border"
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