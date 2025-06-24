'use client'
import { supabase } from "@/app/utils/supabase/client"
import { useState, useEffect } from "react"

export default function ProfileComp(){
    const [session, setSession] = useState<any>(null);

    const fetchSession = async () => {
        const currentSession = await supabase.auth.getSession()
        setSession(currentSession.data)
        console.log(currentSession.data)
    }

    useEffect(() => {
        fetchSession()
    
    });

    return(
        <div>
            {/* <p>{session.session?.user?.identities?.email}</p> */}
            {/* <p>{session.user.email}</p> */}

        </div>
    )
}