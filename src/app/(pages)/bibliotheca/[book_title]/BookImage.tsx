"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase } from "@/app/utils/supabase/client"

export default function BookImage({ book_title }: { book_title: string }) {
    const [bookImg, setBookImg] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!book_title) {
            setLoading(false)
            return
        };

        const fetchBookCoverImg = async () => {
            const { data, error } = await supabase
                .from("books")
                .select("cover_img")
                .eq("title", book_title)
                .single()

            if (error) {
                setBookImg(null)
                setLoading(false)
                return
            }

            setLoading(false)
            setBookImg(data?.cover_img || null)
        }

        fetchBookCoverImg()
    }, [])

    if (loading) return (
        <div className='h-[500px] bg-[#b03a2e]'>
            <div className="flex h-full justify-center items-center">
                <div className="animate-spin rounded-full size-20 border-t-4 border-b-4 border-white"></div>
            </div>
        </div>
    )

    if (!bookImg && !loading) return (
        <div className="h-[500px] w-full flex flex-col items-center justify-center rounded-xl border-2 border-[#6b705c] bg-[#f6f1e7] text-center p-8">
            <div className="flex flex-col items-center">
                <div className="mb-4 text-[#b03a2e]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4a1 1 0 011-1h10.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V20a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 3v5a1 1 0 001 1h5"
                        />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-[#b03a2e]">Livro sem capa disponível</h2>
                <p className="mt-2 text-sm text-[#6b705c]">Parece que este livro não tem uma imagem de capa cadastrada.</p>
            </div>
        </div>
    )


    return (
        <img
            alt={`Capa do livro ${book_title}`}
            src={bookImg!}
            className="rounded-xl object-cover"
        />
    )
}
