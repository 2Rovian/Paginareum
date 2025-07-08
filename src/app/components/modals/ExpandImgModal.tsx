'use client'
import { IoCloseCircleOutline } from "react-icons/io5";

interface ExpandImgModal{
    setExpandedImg: (val: string | null) => void,
    expandedImg: string,
    title: string,
}

export default function ExpandImgModal({setExpandedImg, expandedImg, title} : ExpandImgModal) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm "
            onClick={() => setExpandedImg(null)}
        >

            {/* Fundo escuro + blur */}
            <div
                className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-xs"
                onClick={() => setExpandedImg(null)}
            ></div>

            <div className="relative max-w-4xl w-[90%] max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={expandedImg}
                    alt={`Imagem do livro "${title}" `}
                    className="w-full h-auto object-contain rounded-xl shadow-2xl border"
                />
                <span className="absolute top-4 right-4 cursor-pointer opacity-40 hover:opacity-100 duration-150 ease-in-out text-4xl"
                    onClick={() => setExpandedImg(null)}
                >
                    <IoCloseCircleOutline />
                </span>
            </div>

        </div>
    )
}