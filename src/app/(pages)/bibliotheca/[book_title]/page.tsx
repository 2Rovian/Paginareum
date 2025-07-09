import { BsCalendar2DateFill } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import NavbarComp from "@/app/components/layout/(Navbar)/Navbar";
import BookImage from "./BookImage";
import LerAgoraBtn from "@/app/(pages)/bibliotheca/BibliothecaReadBtn";

// Cores da paleta
// const colors = {
// papiro: '#f6f1e7',
// pompeiaRed: '#b03a2e',
// nobleGold: '#e6c46c',
// darkGray: '#1a1a1a',
// oliveGreen: '#6b705c'
// };

export default async function BookDetails({
    params,
}: {
    params: { book_title: string };
}) {
    const { book_title } = await params;
    const decodedTitle = decodeURIComponent(book_title);

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${decodedTitle}&maxResults=1`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        return (
            <>
                <NavbarComp />
                <div className="max-w-7xl mx-auto px-4 xl:px-0 pb-20 flex flex-col items-center justify-center text-center mt-32">
                    <svg
                        className="w-20 h-20 text-[#b03a2e]/80 mb-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-1">
                        Nenhum resultado encontrado
                    </h2>
                    <p className="text-[#6b705c] text-sm max-w-md">
                        Não encontramos nenhuma informação para o livro&nbsp;
                        <span className="text-[#b03a2e] italic">"{decodedTitle}"</span>.
                    </p>
                </div>
            </>
        );


    }

    const bookData = data.items[0].volumeInfo;

    return (
        <>
            <NavbarComp />
            <div className="max-w-7xl mx-auto px-4 xl:px-0 pb-12" >
                <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-5">
                    <div className="w-full h-fit flex items-center md:items-start flex-col gap-4">
                        <div className='rounded-xl overflow-hidden shadow-md w-full h-fit '>
                            <BookImage book_title={decodedTitle} />
                        </div>

                        {bookData.infoLink && (
                            <div className="hidden md:block px-1">
                                <h3 className="text-sm font-semibold">Mais informações</h3>
                                <Link
                                    href={bookData.infoLink}
                                    target="_blank"
                                >
                                    <span className="hover:underline text-[#b03a2e]">Ver no Google Books</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Informações do livro */}
                    <div className="md:col-span-2 flex flex-col gap-4 ">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-bold" >{bookData.title}</h1>
                            {/* <p>{decodedTitle}</p> */}
                            <LerAgoraBtn book_title={decodedTitle} />
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6b705c] mt-0">
                            {/* Data de publicação */}
                            {bookData.publishedDate && (
                                <span className="flex items-center gap-x-1">
                                    <BsCalendar2DateFill />
                                    {(() => {
                                        const [year, month, day] = bookData.publishedDate.split("-");
                                        if (!year || !month || !day) return bookData.publishedDate;
                                        return `${day}/${month}/${year}`;
                                    })()}
                                </span>
                            )}

                            {/* Páginas */}
                            {bookData.pageCount && (
                                <span className="flex items-center gap-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h10v2H4z" />
                                    </svg>
                                    {bookData.pageCount} pages
                                </span>
                            )}

                            {/* Idioma */}
                            {bookData.language && (
                                <span className="flex items-center gap-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3l4.5 6h-9L12 3zm0 18l-4.5-6h9L12 21z" />
                                    </svg>
                                    {bookData.language.toUpperCase()}
                                </span>
                            )}

                            {/* Editora */}
                            {bookData.publisher && (
                                <span className="flex items-center gap-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M5 4h14v2H5zM5 10h14v2H5zM5 16h14v2H5z" />
                                    </svg>
                                    {bookData.publisher}
                                </span>
                            )}

                            {/* Autor */}
                            {bookData.authors && (
                                <div>
                                    {/* <h3 className="text-sm font-semibold" >Authors</h3> */}
                                    <div className="flex flex-wrap gap-2">
                                        {bookData.authors.map((author: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full text-xs bg-[#b03a2e]/90 text-[#f6f1e7]"

                                            >
                                                {author}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                        {bookData.subtitle && (
                            <h2 className="text-xl italic text-[#1a1a1a]" >{bookData.subtitle}</h2>
                        )}

                        <p className="text-lg leading-relaxed mt-2" >
                            {bookData.description || "Sem descrição disponível."}
                        </p>

                        {bookData.infoLink && (
                            <div className='md:hidden'>
                                <h3 className="text-sm font-semibold" >More Info</h3>
                                <Link
                                    href={bookData.infoLink}
                                    target="_blank"

                                >
                                    <span className="hover:underline text-[#b03a2e]">View on Google Books</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>

    );
}