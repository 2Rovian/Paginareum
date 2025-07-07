'use client'

import useToggleSearchType, { searchTypeProps, setSearchTypeProps } from "@/app/hooks/useToggleSearchType";
import { useState } from "react";

interface BibliothecaSearchBarProps {
    searchTerm: string,
    searchType: searchTypeProps,
    setSearchType: setSearchTypeProps,
    setSearchTerm: (val: string) => void,
    setRead_status_state: (val: null | "unread" | "in_progress" | "read") => void
}

export default function BibliothecaSearchBar({ searchTerm, searchType, setSearchType , setSearchTerm, setRead_status_state }: BibliothecaSearchBarProps) {
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const { handleToggleSearchType } = useToggleSearchType();

    return (
        <div className="mt-1 flex flex-col sm:flex-row items-center gap-y-2">
            <div className="flex w-full bg-white shadow items-center outline outline-[#e0e0e0] rounded ease-in-out duration-100 focus-within:outline-2 focus-within:outline-[#b03a2e] overflow-hidden">
                <input
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setRead_status_state(null) }}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    maxLength={300}
                    placeholder={`Buscar livro por ${searchType == "title" ? "título" : searchType == "category" ? "categoria" : "autor"}...`}
                    className="px-3 py-2 rounded bg-white  grow focus:outline-none"
                />
                <button
                    className={`py-3 focus:border-l-2 text-[#b03a2e] px-4 cursor-pointer duration-100 hover:text-[#f6f1e7] hover:border-l-[#b03a2e] hover:bg-[#b03a2e] ease-in-out ${inputFocused ? 'border-l-2 border-[#b03a2e]' : ''}`}
                    onClick={() => handleToggleSearchType(searchType, setSearchType)}
                >
                    <span>{searchType == "title" ? "Título" : searchType == "category" ? "Categoria" : "Autor"}</span>
                   
                </button>

            </div>
        </div>
    )
}