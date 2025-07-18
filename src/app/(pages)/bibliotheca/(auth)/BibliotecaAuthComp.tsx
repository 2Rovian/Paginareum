'use client'
import { useState, useEffect } from "react";

// icons
import { GiWhiteBook } from "react-icons/gi";
// -----

import { Book } from "@/app/types/types";
import useBooks from "@/app/hooks/useBooks";
import BookCard from "@/app/components/BookCard";
import toast from "react-hot-toast";
import { supabase } from "@/app/utils/supabase/client";

interface SearchBookProps {
    SearchBook?: string;
    SearchType: "title" | "category" | "author";
    read_status_state: null | "unread" | "in_progress" | "read";
}

export default function BibliotecaAuthComp({ SearchBook = "", SearchType, read_status_state = null }: SearchBookProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { fetchAllBooks, fetchByBookName, fetchByReadStatus, debounceBook } = useBooks(SearchBook)
    const [profile_id, setprofile_id] = useState<string>('');

    const refetchBooks = () => {
        if (read_status_state !== null) {
            fetchByReadStatus(setBooks, profile_id, setIsLoading, read_status_state);
        } else if (SearchBook.trim()) {
            fetchByBookName(setBooks, profile_id, setIsLoading, SearchType);
        } else {
            fetchAllBooks(setBooks, profile_id);
        }
    };

    useEffect(() => {
        const fetchBooksWithProfile = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                toast.error("Usuário não autenticado");
                setIsLoading(false);
                return;
            }

            const user_id = user.id;
            setprofile_id(user_id); 

            if (read_status_state !== null) {
                await fetchByReadStatus(setBooks, user_id, setIsLoading,read_status_state);
            } else if (SearchBook.trim()) {
                await fetchByBookName(setBooks, user_id, setIsLoading, SearchType);
            } else {
                await fetchAllBooks(setBooks, user_id);
            }

            setIsLoading(false); 
        };

        fetchBooksWithProfile();
    }, [read_status_state, SearchType, debounceBook]);


    if (isLoading && profile_id) return (
        <div className="col-span-full flex justify-center py-10">
            <div className="animate-spin rounded-full size-30 border-t-4 border-b-4 border-[#b03a2e]"></div>
        </div>
    )
    // --------------

    if (debounceBook.trim() && books.length === 0) return (
        <div className="text-center py-10 overflow-hidden">
            <div className="max-w-md mx-auto">
                <GiWhiteBook className="text-5xl text-[#b03a2e] mx-auto mb-4" />
                <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">
                    &quot;O mistério de <span className="text-[#b03a2e]">{debounceBook}</span>&quot;
                </h3>
                <p className="text-[#5a4a3a]">
                    Parece que este livro ainda não está em sua biblioteca.
                    Seria uma obra perdida ou uma nova aventura por adicionar?
                </p>
            </div>
        </div>)

    if (books.length == 0 && read_status_state) return (
        <div className="text-center py-10 overflow-hidden">
            <p className="text-2xl text-[#b03a2e] font-serif italic">
                {read_status_state === "read"
                    ? "Sua estante de livros lidos está esperando por novas aventuras..."
                    : read_status_state === "in_progress"
                        ? "Nenhuma jornada literária em progresso no momento"
                        : "A terra virgem das páginas não exploradas aguarda sua curiosidade"}
            </p>
            <p className="text-[#5a4a3a] mt-2">
                {read_status_state === "read"
                    ? "Que tal adicionar suas próximas conquistas literárias?"
                    : "O primeiro passo começa com um livro aberto"}
            </p>
        </div>
    )

    if (!isLoading && books.length == 0) return (
        <div className="text-center py-10 overflow-hidden">
            <p className="text-2xl text-[#b03a2e] font-serif italic">Parece que você não adicionou nenhum livro</p>
            <p className="text-[#5a4a3a] mt-2">
                Que tal adicionar suas próximas conquistas literárias?
            </p>
        </div>
    )

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2">
                {books.map((livro) => (
                    <BookCard
                        key={livro.book_id}
                        book_id={livro.book_id}
                        read_status={livro.read_status}
                        author={livro.author}
                        title={livro.title}
                        pages={livro.pages}
                        urlPath={livro.urlPath}
                        cover_img={livro.cover_img}
                        category={livro.category}
                        showControls={true}
                        refetchBooks={refetchBooks}
                        read_progress={livro.read_progress}
                    />
                ))}
            </section>

        </>
    )
}