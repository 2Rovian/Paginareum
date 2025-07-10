import { supabase } from "../utils/supabase/client";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { Book } from "../types/types";
import useSlugify from "./useSlugify";

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

        // deleta no bucket
        const { error: bucketError } = await supabase.storage
            .from("books-pdfs")
            .remove([pdfPath]);

        if (bucketError) {
            toast.error("Erro ao deletar PDF do storage");
            console.error(bucketError);
            return;
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

    return { fetchAllBooks, fetchByBookName, fetchByReadStatus, handleDeleteBook, debounceBook }
}

// funções: fetchAllBooks, handleDeleteBook, handleMarkasRead