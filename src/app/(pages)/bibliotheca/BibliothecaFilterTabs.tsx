'use client'
import { FaCheck } from "react-icons/fa6";
import { MdAutoStories } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";

interface BibliothecaFilterTabsProps {
    read_status_state: null | "unread" | "in_progress" | "read",
    setRead_status_state: (val: null | "unread" | "in_progress" | "read") => void
}

export default function BibliothecaFilterTabs({ read_status_state, setRead_status_state }: BibliothecaFilterTabsProps) {

    return (
        <div className="flex ">
            <ul className="flex w-fit items-center gap-x-1 bg-[#f0e6d6] p-1 rounded-lg shadow-inner">
                <li >
                    <button
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'unread'
                            ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                            : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                            }`}
                        onClick={() => {
                            if (read_status_state == "unread") {
                                setRead_status_state(null)
                            } else { setRead_status_state("unread") }
                        }}

                    >
                        <GiWhiteBook />
                        <span>Não lidos</span>
                    </button>
                </li>

                <li >
                    <button
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'in_progress'
                            ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                            : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                            }`}
                        onClick={() => {
                            if (read_status_state == "in_progress") {
                                setRead_status_state(null)
                            } else { setRead_status_state("in_progress") }
                        }}
                    >
                        <MdAutoStories />
                        <span>Lendo</span>
                    </button>
                </li>
                <li >
                    <button
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 flex gap-x-1 cursor-pointer items-center ${read_status_state === 'read'
                            ? 'bg-[#b03a2e] text-[#f6f1e7] shadow-md'
                            : 'text-[#5a4a3a] hover:bg-[#e6d9c5]'
                            }`}
                        onClick={() => {
                            if (read_status_state == "read") {
                                setRead_status_state(null)
                            } else { setRead_status_state("read") }
                        }}
                    >
                        <FaCheck />
                        <span>Lidos</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}