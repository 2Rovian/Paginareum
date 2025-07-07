import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client"
import useUseProfile from "./useUserProfile";

export default function useBookStats() {
    const [booksCount, setbooksCount] = useState(0);
    const [readStats, setReadStats] = useState({
        unread: 0,
        in_progress: 0,
        read: 0,
    });

    const increaseReadStats = (read_status: string) => {
        if (read_status == "unread") {
            setReadStats(prevData => ({
                ...prevData,
                unread: prevData.unread + 1,
            }));

        } else if (read_status == "in_progress") {
            setReadStats(prevData => ({
                ...prevData,
                in_progress: prevData.in_progress + 1,
            }));

        } else {
            setReadStats(prevData => ({
                ...prevData,
                read: prevData.read + 1,
            }));

        }
    }
    
    const { UserID } = useUseProfile();

    useEffect(() => {
        const fetchUserStats = async () => {
            const { data: booksData } = await supabase.from("books")
                .select("read_status")
                .eq("profile_id", UserID)

            if (booksData) {
                setbooksCount(booksData.length)

                booksData.forEach((book) => {
                    increaseReadStats(book.read_status)
                })

            }
        }

        fetchUserStats()
    }, [UserID]);

    return { booksCount, readStats }
}

// busca estatística dos livros
// const { data: booksData } = await supabase.from("books")
//     .select("read_status")
//     .eq("profile_id", userID)

// if (booksData) {
//     setbooksCount(booksData.length)

//     booksData.forEach((book) => {
//         increaseReadStats(book.read_status)
//     })

// }
// -----------------------------