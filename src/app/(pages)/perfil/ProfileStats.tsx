"use client"
import { MdAutoStories } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { GiBookshelf, GiWhiteBook } from "react-icons/gi";
import useBookStats from "@/app/hooks/useBookStats";

export default function ProfileStats() {

    const { booksCount, readStats } = useBookStats()

    return (
        <div className="p-5 rounded-lg border border-[#b03a2e]">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <GiBookshelf className="text-[#b03a2e]" />
                Sua Bibliotheca
            </h2>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                    <FaBook className="mx-auto text-[#b03a2e] text-xl mb-2" />
                    <p className="text-sm text-[#6b705c]">Total</p>
                    <p className="font-bold text-xl">{booksCount}</p>
                </div>

                <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                    <GiWhiteBook className="mx-auto text-[#b03a2e] text-xl mb-2" />
                    <p className="text-sm text-[#6b705c]">Não Lidos</p>
                    <p className="font-bold text-xl">{readStats.unread}</p>
                </div>

                <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                    <MdAutoStories className="mx-auto text-[#b03a2e] text-xl mb-2" />
                    <p className="text-sm text-[#6b705c]">Em Progresso</p>
                    <p className="font-bold text-xl">{readStats.in_progress}</p>
                </div>

                <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                    <FaCheck className="mx-auto text-[#b03a2e] text-xl mb-2" />
                    <p className="text-sm text-[#6b705c]">Lidos</p>
                    <p className="font-bold text-xl">{readStats.read}</p>
                </div>
            </div>
        </div>
    )
}