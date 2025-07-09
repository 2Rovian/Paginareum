'use client'

import { useState, useEffect } from "react";
import { GiOpenBook } from "react-icons/gi";
import { useAuthStore } from "@/app/stores/session-store";

// components //
import BibliotecaAuthComp from "./(auth)/BibliotecaAuthComp";
import BibliotecaGuestComp from "./(guest)/BibliotecaGuestComp";
import BibliothecaSearchBar from "./BibliothecaSearchBar";
import BibliothecaFilterTabs from "./BibliothecaFilterTabs";
import BibliothecaModalAddBook from "./BibliothecaModalAddBook";
// components //

export default function BibliothecaComp() {
    const [mostrarAddLivro, setMostrarAddLivro] = useState<boolean>(false);
    const [searchType, setSearchType] = useState<"title" | "category" | "author">("title");
    const [searchTerm, setSearchTerm] = useState("");
    const [read_status_state, setRead_status_state] = useState<null | "unread" | "in_progress" | "read">(null);

    const [hydrated, setHydrated] = useState(false);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const timeout = setTimeout(() => setHydrated(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="max-w-7xl mx-auto xl:px-0 px-4">
            <main className="bg-[#f6f1e7] mt-5 pb-4 ">
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
                    <BibliothecaSearchBar
                        searchTerm={searchTerm}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        setSearchTerm={setSearchTerm}
                        setRead_status_state={setRead_status_state}
                    />
                    {/* Barra de Pesquisa */}

                    <BibliothecaFilterTabs
                        read_status_state={read_status_state}
                        setRead_status_state={setRead_status_state}
                    />

                </div>

                {/* MODAL */}
                {mostrarAddLivro && (
                    <BibliothecaModalAddBook 
                        setMostrarAddLivro={setMostrarAddLivro}
                        isAuthenticated={isAuthenticated}
                    />
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

    );
}
