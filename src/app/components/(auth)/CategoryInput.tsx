'use client'

import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

interface CategoryInputProps {
    profile_id: string,
    category: string,
    setCategory: (val: string) => void
}

export default function CategoryInput({ profile_id, category, setCategory }: CategoryInputProps) {
    const [categoriesArray, setCategoriesArray] = useState<{ category: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [debounceCategory] = useDebounce(category, 300);

    // Buscar categorias
    useEffect(() => {
        const fetchCategory = async () => {
            if (!debounceCategory) {
                setCategoriesArray([]);
                return;
            }

            const { data } = await supabase
                .from("books")
                .select("category")
                .ilike("category", `%${debounceCategory}%`);

            if (!data) return;
            setCategoriesArray(data);
            setShowDropdown(true);
        };

        fetchCategory();
    }, [debounceCategory, profile_id]);

    // Fecha o dropdown ao clicar fora
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
        <div className="relative w-full grow" ref={wrapperRef}>
            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setShowDropdown(true);
                }}
                className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-2 focus:outline-[#b03a2e] w-full"
            />

            {showDropdown && category && categoriesArray.length > 0 && (
                <div className="absolute top-12 bg-white w-full rounded outline outline-[#b03a2e] max-h-48 overflow-y-auto z-50 shadow-lg">
                    {categoriesArray.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setCategory(item.category);
                                setShowDropdown(false);
                            }}
                            className="cursor-pointer py-2 px-3 hover:bg-[#b03a2e] hover:text-white transition-colors"
                        >
                            {item.category}
                        </p>
                    ))}
                    
                </div>
            )}
        </div>
    );
}
