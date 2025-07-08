'use client'
import { BookCardProps } from "../types/types";
import useBookReadStatus from "../hooks/useBookReadStatus";
import { useEffect, useRef, useState } from "react";

// icons
import { BsThreeDots } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiExpand, GiWhiteBook } from "react-icons/gi";
import { MdAutoStories } from "react-icons/md";
import Link from "next/link";
import DeleteBookModal from "./modals/DeleteBookModal";
import ExpandImgModal from "./modals/ExpandImgModal";
// -----

export default function BookCard({
    book_id, title,
    author, pages,
    category, urlPath,
    cover_img, read_status, showControls = false
}: BookCardProps) {

    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const { handleMarkAsRead, handleMarkAsReading, handleMarkAsUnread } = useBookReadStatus(setOpenDropdownId);
    const [expandedImg, setExpandedImg] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [showDeleteBook, setShowDeleteBook] = useState<boolean>(false);

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

    return (
        <article
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col border border-[#e0e0e0] group "
        >

            <div className="relative">
                <img
                    src={cover_img || '/default-cover-smaller.png'}
                    alt={`Capa do livro ${title}`}
                    className="h-72 w-full object-cover"
                    loading="lazy"
                />

                {showControls &&
                    <>
                        <div className={`absolute flex px-2 top-2 w-full
                                ${read_status == "read" || read_status == "in_progress" ? "justify-between items-center" : "justify-end "}`}>

                            {read_status == "read" && <div
                                className={` ${openDropdownId ? "opacity-100" : ""} py-1 text-sm text-[#b03a2e] rounded-full bg-white cursor-pointer flex items-center gap-x-2 px-2 outline  shadow-md `}
                            >
                                <FaCheck />
                                <span>Lido</span>
                            </div>}

                            {read_status == "in_progress" && <div
                                className={` ${openDropdownId ? "opacity-100" : ""} py-1 text-sm text-[#b03a2e] rounded-full bg-white cursor-pointer flex items-center gap-x-2 px-2 outline  shadow-md `}
                            >
                                <MdAutoStories />
                                <span>Em progresso</span>
                            </div>}

                            <button
                                onClick={() => toggleDropdown(book_id)}
                                className={`opacity-60 group-hover:opacity-100 ${openDropdownId ? "opacity-100" : ""} duration-300 ease-in-out p-1 text-xl rounded-full bg-white text-[#1a1a1a] cursor-pointer outline outline-[#797979] shadow-md hover:bg-[#fbfbfb]`}
                            >

                                <BsThreeDots />
                            </button>
                        </div>

                        {openDropdownId === book_id && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-2 top-12 z-10 bg-white border shadow-lg rounded-lg text-sm w-fit motion-opacity-in-0 overflow-hidden"
                            >
                                <ul className="flex flex-col text-[#1a1a1a]">

                                    <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                        onClick={() => { setExpandedImg(cover_img); setOpenDropdownId(null) }}
                                    >
                                        <span>
                                            <GiExpand />
                                        </span>
                                        <span>Expandir Imagem</span>
                                    </li>

                                    {read_status == "read" ?

                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                            onClick={() => handleMarkAsUnread(book_id)}
                                        >
                                            <span>
                                                <GiWhiteBook />

                                            </span>
                                            <span>Não lido</span>
                                        </li>
                                        :
                                        <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                            onClick={() => handleMarkAsRead(book_id)}
                                        >
                                            <span>
                                                <FaCheck />
                                            </span>
                                            <span>Lido</span>
                                        </li>
                                    }

                                    <li className="px-4 py-2 flex gap-x-2 items-center  cursor-pointer hover:text-[#b03a2e] duration-150 ease-in-out"
                                        onClick={() => handleMarkAsReading(book_id)}
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
                    </>
                }


                {pages && (
                    <span className="absolute opacity-80 group-hover:opacity-100 duration-300 ease-in-out right-2 rounded-full bottom-2 px-2 py-1 text-sm bg-white text-[#797979] outline">
                        {pages} páginas
                    </span>
                )}
            </div>

            {/* MODAL deletar livro*/}
            {showDeleteBook && (
                <DeleteBookModal
                    setShowDeleteBook={setShowDeleteBook}
                    book_id={book_id}
                />
            )}

            {/* MODAL expandir imagem*/}
            {expandedImg && (
                <ExpandImgModal
                    setExpandedImg={setExpandedImg}
                    expandedImg={expandedImg}
                    title={title}
                />
            )}

            <div className="flex flex-col p-3">
                <h3
                    className="text-lg font-semibold text-[#1a1a1a] mb-1 truncate"
                    title={title}
                >
                    {title}
                </h3>

                <p className="text-sm text-[#3e3e3e] font-medium mb-0">
                    por {author || "Autor desconhecido"}
                </p>
                
                <p className="text-sm text-[#6b705c] mb-0">
                    {category || 'Sem categoria'}
                </p>

                {showControls ?
                    <div className="flex items-center justify-between mt-2 text-sm">
                        <Link
                            href={`/bibliotheca/${(title)}`}
                            className="hover:bg-[#f6f1e7] text-[#6b705c] hover:text-[#b03a2e] px-4 py-2 outline-2 rounded-lg transition-colors"
                        >
                            Detalhes
                        </Link>

                        <a
                            href={urlPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#b03a2e] font-semibold hover:bg-[#a93226] text-[#f6f1e7] hover:text-white px-8 py-2 rounded-lg transition-colors duration-200 "
                        >
                            Ler agora
                        </a>
                    </div>

                    :

                    <div className="flex mt-2 ">
                        <Link
                            href={`/bibliotheca/${(title)}`}
                            className="bg-[#b03a2e] hover:bg-[#a93226] text-[#f6f1e7] hover:text-white w-full text-center py-2 rounded-md transition-colors border"
                        >
                            Detalhes
                        </Link>

                    </div>
                }

            </div>
        </article>
    )

}