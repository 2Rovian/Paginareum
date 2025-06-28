// export default function LivroArticle() {
//     return (
//         <>
//             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {livros.map((livro) => (
//                     <div
//                         key={livro.id}
//                         className="border bg-white shadow border-[#b03a2e] rounded-lg p-2 flex flex-col justify-between items-center h-full"
//                     >
//                         <img
//                             src={livro.imgURL || '/default-cover-smaller.png'}
//                             alt={`Capa do livro ${livro.title}`}
//                             loading="lazy"
//                             className="h-80 border-[#b03a2e] object-cover w-full rounded mb-3"
//                         />

//                         <div className="flex flex-col flex-1 w-full justify-between">
//                             <p className="text-[#1a1a1a] text-lg font-semibold mb-2 text-start">{livro.title}</p>

//                             <div className="flex justify-between items-center w-full mt-auto">
//                                 <button
//                                     className="bg-[#b03a2e] text-[#f6f1e7] hover:text-[#e6c46c] cursor-pointer transition hover px-4 py-2 rounded-md"
//                                     onClick={() => copiarParaClipboard(livro.filePath)}
//                                 >
//                                     Ler agora
//                                 </button>
//                                 <span className="text-[#6b705c] text-md italic">{livro.pages} páginas</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </>
//     )
// }