import toast from "react-hot-toast";
import { supabase } from "../utils/supabase/client";

type setOpenDropdownId = (val: null | number) => void

export default function useBookReadStatus( setOpenDropdownId : setOpenDropdownId, refetchBooks?: () => void ) {
    const handleMarkAsRead = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "read" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como lido:", error.message);
            toast.error("Erro ao marcar livro como lido");
            return;
        }

        toast.success("Livro marcado como lido");
        setOpenDropdownId(null);
        refetchBooks?.();

    }

    const handleMarkAsReading = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "in_progress" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como em progresso:", error.message);
            toast.error("Erro ao marcar livro como em progresso");
            return;
        }

        toast.success("Livro marcado como em progresso");
        setOpenDropdownId(null);
        refetchBooks?.();

    }

    const handleMarkAsUnread = async (id: number) => {
        const { error } = await supabase
            .from("books")
            .update({ read_status: "unread" })
            .eq("book_id", id)

        if (error) {
            console.error("Erro ao marcar livro como não livro:", error.message);
            toast.error("Erro ao marcar livro como não livro");
            return;
        }

        toast.success("Livro marcado como não lido");
        setOpenDropdownId(null);
        refetchBooks?.();

    }

    return { handleMarkAsRead, handleMarkAsReading, handleMarkAsUnread }
}