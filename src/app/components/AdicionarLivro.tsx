'use client'
import { useState } from "react";
import { Livro } from "../types/livro";
import toast from "react-hot-toast";

export default function AdicionarLivros({ onAdd }: { onAdd?: () => void }) {
  const [title, setTitle] = useState("");
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [numPag, setNumPag] = useState("");
  // const [categoria, setCategoria] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleAdicionar = () => {
    if (!title.trim() || !filePath.trim()) {
      toast.error("Por favor, preencha as informações necessárias");
      return;
    }

    setLoading(true);

    try {
      const novoLivro: Livro = {
        id: Date.now().toString(),
        title: title.trim(),
        imgURL: imgURL.trim(),
        pages: numPag.trim(),
        // category: categoria.trim(),
        filePath: filePath.trim(),
      };

      // Leia do localStorage primeiro
      const livrosSalvos = localStorage.getItem("paginareLivros");
      const livros = livrosSalvos ? JSON.parse(livrosSalvos) : [];

      const novosLivros = [...livros, novoLivro];
      localStorage.setItem("paginareLivros", JSON.stringify(novosLivros));

      toast.success("Livro adicionado!");

      // Limpa os campos
      setTitle("");
      setNumPag("");
      // setCategoria("");
      setFilePath("");
      setImgURL("");

      if (onAdd) onAdd();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 mx-auto text-[#1a1a1a]">
      <input
        type="text"
        placeholder="Título do livro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="outline focus:outline-2 px-3 py-2 rounded transition-all duration-150"
      />
      <input
        type="text"
        placeholder="URL da imagem"
        value={imgURL}
        onChange={(e) => setImgURL(e.target.value)}
        className="outline focus:outline-2 px-3 py-2 rounded transition-all duration-150"
      />
      <input
        type="text"
        placeholder="Número de páginas"
        value={numPag}
        onChange={(e) => setNumPag(e.target.value)}
        className="outline focus:outline-2 px-3 py-2 rounded transition-all duration-150"
      />
      {/* <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="outline focus:outline-2 px-3 py-2 rounded transition-all duration-150"
      /> */}
      <input
        type="text"
        placeholder="Caminho completo (ex: file:///C:/Users/.../arquivo.pdf)"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        className="outline focus:outline-2 px-3 py-2 rounded transition-all duration-150"
      />
      <div className="flex items-center gap-x-2 justify-end mt-1">
        <button className='border-2 border-[#6b705c] text-[#6b705c] px-4 py-2 rounded-lg hover:text-[#b03a2e] hover:border-[#b03a2e] cursor-pointer transition hover'>
          Descartar
        </button>
        <button
          onClick={handleAdicionar}
          disabled={loading}
          className="border-2 border-[#b03a2e] bg-[#b03a2e] text-[#f6f1e7] px-4 py-2 rounded-lg hover:text-[#e6c46c] cursor-pointer transition hover "
        >
          {loading ? "Adicionando..." : "Adicionar Livro"}
        </button>
      </div>
    </div>
  );
}
