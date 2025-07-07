import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/client";
import { Session } from "@supabase/supabase-js";

import { UserProfile } from "../types/types";


export default function useUseProfile() {
    const [session, setSession] = useState<Session | null>(null);
    const [UserData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [UserID, setUserID] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            setSession(sessionData.session);
            const userID = sessionData.session?.user?.id;

            if (userID) {
                const { data: UserData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('profile_id', userID)
                    .single();

                setUserID(userID)
                setUserData(UserData);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return { UserData, loading, session, UserID }
}