import { supabase } from "../utils/supabase/client";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { Book } from "../types/types";
import useSlugify from "./useSlugify";
import { handleAddBookProps } from "../types/types";

type setBooks = (val: Book[]) => void;
type setIsLoading = (val: boolean) => void;
type setShowDeleteBook = (val: boolean) => void;
type SearchType = "title" | "category" | "author";
type read_status_state = "unread" | "in_progress" | "read";

export default function useBooks(SearchBook: string = "") {
    const [debounceBook] = useDebounce(SearchBook, 400)
    const { slugify } = useSlugify()

    const fetchAllBooks = async (setBooks: setBooks, profile_id: string) => {
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .eq("profile_id", profile_id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao buscar livros:", error);
            toast.error("Erro ao carregar livros");
            return
        }

        setBooks(data || []);
    };

    const fetchByReadStatus = async (setBooks: setBooks, profile_id: string, setIsLoading: setIsLoading, read_status_state: read_status_state) => {
        setIsLoading(true)
        const { data: dataReadStatus } = await supabase
            .from("books")
            .select()
            .eq("profile_id", profile_id)
            .eq("read_status", read_status_state)
            .order("created_at", { ascending: false })

        setIsLoading(false)
        setBooks(dataReadStatus || [])
    }

    const fetchByBookName = async (setBooks: setBooks, profile_id: string, setIsLoading: setIsLoading, SearchType: SearchType = 'title') => {
        if (!debounceBook.trim()) {
            fetchAllBooks(setBooks, profile_id);
            return
        }
        setIsLoading(true)

        const { data } = await supabase
            .from("books")
            .select()
            .eq("profile_id", profile_id)
            .textSearch(SearchType, debounceBook.trim())
            .order("created_at", { ascending: false })

        setIsLoading(false)
        setBooks(data || []);
    }

    const handleMarkReadProgress = async (book_id: number, read_progress: number, refetchBooks?: () => void) => {
        const { error: ReadProgressError } = await supabase
            .from("books")
            .update({ read_progress: read_progress })
            .eq("book_id", book_id)

        if (ReadProgressError) {
            console.error("Erro ao marcar leitura: ", ReadProgressError)
            toast.error("Erro ao marcar leitura")
            return
        }

        refetchBooks?.()
        toast.success("Progresso salvo com sucesso")
    }

    const handleDeleteBook = async (book_id: number, setShowDeleteBook: setShowDeleteBook, refetchBooks?: () => void) => {

        // pega id do usuário e nome do livro
        const { data: bookData, error: fetchError } = await supabase
            .from("books")
            .select("profile_id, title")
            .eq("book_id", book_id)
            .single()

        // Se erro, retorna
        if (fetchError || !bookData) {
            toast.error("Erro ao buscar livro");
            console.error(fetchError);
            return;
        }

        const slugifiedTitle = slugify(bookData.title);
        const pdfPath = `${bookData.profile_id}/${slugifiedTitle}.pdf`;
        const imagePath = `${bookData.profile_id}/${slugifiedTitle}-img.png`;

        // deleta PDF no bucket
        const { error: bucketErrorPDF } = await supabase.storage
            .from("books-pdfs")
            .remove([pdfPath]);

        if (bucketErrorPDF) {
            toast.error("Erro ao deletar PDF do storage");
            console.error(bucketErrorPDF);
            return;
        }

        // deleta cover no bucket
        const { error: bucketErrorIMG } = await supabase.storage
            .from("books-covers")
            .remove([imagePath]);

        if (bucketErrorIMG) {
            toast.error("Erro ao deletar imagem do storage");
            console.error(bucketErrorIMG);
        }

        const { error } = await supabase
            .from("books")
            .delete()
            .eq("book_id", book_id)

        if (error) {
            console.error("Erro ao remover livro: ", error.message)
            toast.error("Erro ao remover livro")
            return
        }

        toast.success("Livro removido");
        setShowDeleteBook(false);
        refetchBooks?.()
    }

    const handleAddBook = async ({
        title, author_name, category, numPag, imgURL, setLoading, setCategory, setNumPag, setImgURL, setAuthor_name, setTitle, setPdfFile, profile_id, pdf_File
    }: handleAddBookProps) => {

        setLoading(true)

        let imageURL = "";
        let pdfURL = "";

        // se houver imagem, faz upload
        if (imgURL) {
            const fileExt = imgURL.name.split('.').pop();
            const slugifiedTitle = slugify(title);
            const fileName = `${slugifiedTitle}-img.${fileExt}`;
            const filePathStorage = `${profile_id}/${fileName}`;

            // Caso já exista, sobrescreve
            const { error: uploadError } = await supabase.storage
                .from('books-covers')
                .upload(filePathStorage, imgURL, {
                    upsert: true, // sobrescreve se já existir
                });

            if (uploadError) {
                toast.error("Erro ao enviar imagem");
                console.error(uploadError);
                setLoading(false);
                return;
            }

            const { data: urlData } = supabase
                .storage
                .from('books-covers')
                .getPublicUrl(filePathStorage);

            imageURL = urlData.publicUrl;
        }

        if (pdf_File) {
            const fileBaseName = slugify(title);
            const fileExt = pdf_File.name.split('.').pop();
            const fileName = `${fileBaseName}.${fileExt}`;
            const filePathStorage = `${profile_id}/${fileName}`;

            const { error: uploadPDF_Error } = await supabase.storage
                .from("books-pdfs")
                .upload(filePathStorage, pdf_File)

            if (uploadPDF_Error) {
                toast.error("Erro ao enviar pdf")
                console.error(uploadPDF_Error)
                setLoading(false)
                return
            }

            const { data: urlData } = supabase.storage
                .from("books-pdfs")
                .getPublicUrl(filePathStorage)

            pdfURL = urlData.publicUrl;
        }

        // joga os dados pra DB
        const { error } = await supabase
            .from('books')
            .insert({
                title: title,
                author: author_name,
                category: category,
                pages: numPag,
                urlPath: pdfURL,
                cover_img: imageURL,
                profile_id: profile_id
            })

        if (error) {
            console.error("Erro ao adicionar livro", error)
            toast.error("Erro ao adicionar livro")
            return
        }

        toast.success("Livro adicionado")

        setTitle("");
        setCategory("");
        setNumPag(null);
        setImgURL(null);
        setPdfFile(null);
        setAuthor_name("");
        // setFilePath("");

        setLoading(false)
    }

    return {
        fetchAllBooks,
        fetchByBookName,
        fetchByReadStatus,
        handleDeleteBook,
        debounceBook,
        handleMarkReadProgress,
        handleAddBook
    }

}

// funções: fetchAllBooks, handleDeleteBook, handleMarkasRead