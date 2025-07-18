'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiImage, FiFileText } from "react-icons/fi";

import { supabase } from "@/app/utils/supabase/client";
import CategoryInput from "./CategoryInput";
import AuthorInput from "./AuthorInput";
import useBooks from "@/app/hooks/useBooks";

export default function AdicionarLivroAuth() {
  const [title, setTitle] = useState("");
  // const [filePath, setFilePath] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [numPag, setNumPag] = useState<number | null>(null);
  const [author_name, setAuthor_name] = useState("");

  const [pdf_File, setPdfFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<File | null>(null);

  const [profile_id, setprofile_id] = useState<string>('');
  const { handleAddBook } = useBooks();

  useEffect(() => {
    const fetch_profile_id = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return toast.error("Usuário não autenticado")
      setprofile_id(user.id)
    }

    fetch_profile_id();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || numPag === null ||
      numPag <= 0 || !author_name.trim() || !imgURL) {
      toast.error("Preencha todos os campos corretamente");
      return;
    }

    handleAddBook({
      author_name,
      pdf_File,
      title,
      imgURL,
      numPag,
      profile_id,
      category,
      setCategory,
      setTitle,
      setAuthor_name,
      setImgURL,
      setLoading,
      setNumPag,
      setPdfFile
    })
  }

  const handleFileImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/png") {
      toast.error("Apenas arquivos PNG são permitidos");
      e.target.value = ""; // limpa o input
      return;
    }

    setImgURL(file);
  };

  const handleFilePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0])
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 mx-auto text-[#1a1a1a] bg-[#f6f1e7] p-0 rounded-xl ">

      <input
        type="text"
        placeholder="Título do livro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white px-3 py-2 rounded shadow transition-all duration-150 focus:outline-2 focus:outline-[#b03a2e]"
      />

      <AuthorInput
        profile_id={profile_id}
        author_name={author_name}
        setAuthor_name={setAuthor_name}
      />

      {/* Upload da Imagem */}
      <div className="flex flex-col gap-1">
        <label htmlFor="img-upload" className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-white rounded shadow hover:bg-gray-100 ease-in-out duration-150 hover:outline-2 outline-[#b03a2e] text-[#b03a2e]">
          <FiImage size={18} />
          Adicionar Capa do Livro
        </label>
        <input
          id="img-upload"
          type="file"
          accept="image/png"
          onChange={handleFileImgChange}
          className="hidden"
        />
        {imgURL && (
          <p className="text-sm text-[#6b705c] italic ml-1">Arquivo: {imgURL.name}</p>
        )}
      </div>

      {/* Upload do PDF */}
      <div className="flex flex-col gap-1">
        <label htmlFor="pdf-upload" className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-white rounded shadow hover:bg-gray-100 ease-in-out duration-150 hover:outline-2 outline-[#b03a2e] text-[#b03a2e]">
          <FiFileText size={18} />
          Adicionar Arquivo PDF
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFilePdfChange}
          className="hidden"
        />
        {pdf_File && (
          <p className="text-sm text-[#6b705c] italic ml-1">Arquivo: {pdf_File.name}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-x-2 gap-y-2 sm:items-center">
        <CategoryInput
          profile_id={profile_id}
          category={category}
          setCategory={setCategory}
        />

        <input
          type="number"
          placeholder="Número de páginas"
          value={numPag ?? ""}
          onChange={(e) => setNumPag(Number(e.target.value))}
          className="bg-white px-3 py-2 max-w-[180px] rounded shadow transition-all duration-150 focus:outline-2 focus:outline-[#b03a2e]"
          min={0}
        />
      </div>

      <div className="flex items-center gap-x-3 justify-end mt-2">
        <button
          type="button"
          className="border-2 border-[#6b705c] text-[#6b705c] px-4 py-2 rounded-lg hover:text-[#b03a2e] hover:border-[#b03a2e] cursor-pointer transition duration-200"
          onClick={() => {
            setTitle("");
            setNumPag(null);
            setImgURL(null);
            setPdfFile(null);
          }}
        >
          Descartar
        </button>
        <button
          disabled={loading}
          className="border-2 border-[#b03a2e] bg-[#b03a2e] text-[#f6f1e7] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#a93226] transition duration-200"
        >
          {loading ? "Adicionando..." : "Adicionar Livro"}
        </button>
      </div>
    </form>
  );
}