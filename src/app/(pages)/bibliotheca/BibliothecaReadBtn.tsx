"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/app/utils/supabase/client"

export default function BibliothecaReadBtn({ book_title }: { book_title: string }) {
    const [url_path_state, setUrl_path_state] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!book_title){
            setIsLoading(false);
            return;
        };

        const fetchBookUrlPath = async () => {
            const { data, error } = await supabase
                .from("books")
                .select("urlPath")
                .eq("title", book_title)

            if (error) {
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            setUrl_path_state(data[0]?.urlPath || null)
        }

        fetchBookUrlPath()
    }, []);

    if (isLoading) return (
        <div className="flex rounded-lg justify-center py-2 px-8 bg-[#a93226] outline-2 outline-white">
            <div className="animate-spin rounded-full size-4 border-t-2 border-b-2 border-white"></div>
        </div>

    )

    if (!url_path_state) return;

    return (
        <a
            href={url_path_state}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b03a2e] hover:bg-[#a93226] text-[#f6f1e7] px-8 py-2 rounded-lg outline-2 outline-[#a93226] font-semibold transition-colors duration-200 "
        >
            Ler agora
        </a>
    )
}