'use client'
import { useState } from "react";
import { Livro } from "../../types/livro";
import toast from "react-hot-toast";

export default function AdicionarLivros({ onAdd }: { onAdd?: () => void }) {
  const [title, setTitle] = useState("");
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [numPag, setNumPag] = useState("");
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
        filePath: filePath.trim(),
      };

      const livrosSalvos = localStorage.getItem("paginareLivros");
      const livros = livrosSalvos ? JSON.parse(livrosSalvos) : [];
      const novosLivros = [...livros, novoLivro];
      localStorage.setItem("paginareLivros", JSON.stringify(novosLivros));

      toast.success("Livro adicionado!");

      setTitle("");
      setNumPag("");
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
    <div className="flex flex-col gap-y-2 mx-auto text-[#1a1a1a] bg-[#f6f1e7] p-0 rounded-xl">
      <input
        type="text"
        placeholder="Título do livro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-1 focus:outline-[#b03a2e]"
      />
      <input
        type="text"
        placeholder="URL da imagem"
        value={imgURL}
        onChange={(e) => setImgURL(e.target.value)}
        className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-1 focus:outline-[#b03a2e]"
      />
      <input
        type="text"
        placeholder="Número de páginas"
        value={numPag}
        onChange={(e) => setNumPag(e.target.value)}
        className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-1 focus:outline-[#b03a2e]"
      />
      <input
        type="text"
        placeholder="Caminho completo (ex: file:///C:/Users/.../arquivo.pdf)"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-1 focus:outline-[#b03a2e]"
      />

      <div className="flex items-center gap-x-3 justify-end mt-3">
        <button
          className="border-2 border-[#6b705c] text-[#6b705c] px-4 py-2 rounded-lg hover:text-[#b03a2e] hover:border-[#b03a2e] cursor-pointer transition duration-200"
          onClick={() => {
            setTitle("");
            setNumPag("");
            setFilePath("");
            setImgURL("");
          }}
        >
          Descartar
        </button>
        <button
          onClick={handleAdicionar}
          disabled={loading}
          className="border-2 border-[#b03a2e] bg-[#b03a2e] text-[#f6f1e7] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#a93226] transition duration-200"
        >
          {loading ? "Adicionando..." : "Adicionar Livro"}
        </button>
      </div>
    </div>
  );
}
