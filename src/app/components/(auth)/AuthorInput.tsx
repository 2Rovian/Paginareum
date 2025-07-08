'use client'

import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

interface AuthorInputProps {
    profile_id: string;
    author_name: string;
    setAuthor_name: (val: string) => void;
}

export default function AuthorInput({ profile_id, author_name, setAuthor_name }: AuthorInputProps) {
    const [authorsArray, setAuthorsArray] = useState<{ author: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [debouncedAuthor] = useDebounce(author_name, 300);

    // Buscar autores únicos
    useEffect(() => {
        const fetchAuthors = async () => {
            if (!debouncedAuthor) {
                setAuthorsArray([]);
                return;
            }

            const { data } = await supabase
                .from("books")
                .select("author")
                .eq("profile_id", profile_id)
                .ilike("author", `%${debouncedAuthor}%`);

            if (!data) return;

            // Remove duplicados
            const uniqueAuthors = Array.from(new Set(data.map(item => item.author)))
                .filter(Boolean) // remove nulos ou strings vazias
                .map(author => ({ author }));

            setAuthorsArray(uniqueAuthors);
            setShowDropdown(true);
        };

        fetchAuthors();
    }, [debouncedAuthor, profile_id]);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                placeholder="Autor"
                value={author_name}
                onChange={(e) => {
                    setAuthor_name(e.target.value);
                    setShowDropdown(true);
                }}
                className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-2 focus:outline-[#b03a2e] w-full"
            />

            {showDropdown && author_name && authorsArray.length > 0 && (
                <div className="absolute top-12 bg-white w-full rounded outline outline-[#b03a2e] max-h-48 overflow-y-auto z-50 shadow-lg">
                    {authorsArray.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setAuthor_name(item.author);
                                setShowDropdown(false);
                            }}
                            className="cursor-pointer py-2 px-3 hover:bg-[#b03a2e] hover:text-white transition-colors"
                        >
                            {item.author}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
