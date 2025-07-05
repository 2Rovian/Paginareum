'use client'
import { supabase } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";

// icons
import { FiUser, FiMail, FiCalendar, FiBook, FiCamera, FiUpload } from "react-icons/fi";
import { GiBookshelf, GiWhiteBook } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { MdAutoStories } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-hot-toast";
// -----

export default function ProfileComp() {
    const [session, setSession] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [uploading, setUploading] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            setSession(sessionData.session);
            const userID = sessionData.session?.user?.id;

            if (userID) {
                const { data: userData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('profile_id', userID)
                    .single();

                setUserData(userData);

                // Busca avatar do usuário
                // const { data: { publicUrl } } = supabase
                //     .storage
                //     .from('avatar-img')
                //     .getPublicUrl(`${userID}/avatar.png`);

                // setAvatarUrl(publicUrl);
            }

            const { data: booksData } = await supabase.from("books")
                .select("read_status")
                .eq("profile_id", userID)

            if (booksData) {
                setbooksCount(booksData.length)

                booksData.forEach((book) => {
                    increaseReadStats(book.read_status)
                })

            }

            setLoading(false);
        };


        fetchData();
    }, []);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setUploading(true);
        const file = event.target.files?.[0];
        if (!file || !session?.user?.id) return;

        const fileExt = file.name.split('.').pop();
        const filePath = `${session.user.id}/avatar-${Date.now()}.${fileExt}`;

        //  Remove imagem anterior (se houver)
        if (userData?.avatar_url) {
            // Extrai o caminho do arquivo antigo a partir da URL pública
            const oldPath = userData.avatar_url.split("/storage/v1/object/public/avatar-img/")[1];
            if (oldPath) {
                await supabase.storage
                    .from("avatar-img")
                    .remove([oldPath]);
            }
        }

        // Upload para o storage do Supabase
        const { error: uploadError } = await supabase.storage
            .from('avatar-img')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            console.error("Erro ao adicionar avatar: ", uploadError)
            toast.error("Erro ao adicionar avatar")
            setUploading(false);
            return
        };

        // Atualiza URL do avatar
        const { data: { publicUrl } } = supabase
            .storage
            .from('avatar-img')
            .getPublicUrl(filePath);

        // Atualiza perfil do usuário
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('profile_id', session.user.id);

        if (updateError) {
            console.error("Erro ao atualizar foto de usuário: ", updateError)
            toast.error("Erro ao atualizar foto de usuário")
            setUploading(false);
            return
        };

        // Atualiza UI sem recarregar
        setUserData((prev: any) => ({
            ...prev,
            avatar_url: `${publicUrl}?${Date.now()}`
        }));

        toast.success("Avatar adicionado")
        setUploading(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full size-16 border-t-3 border-b-3 border-[#b03a2e]"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seção de Foto e Informações Pessoais */}
            <div className="p-5 rounded-lg shadow-sm border border-[#b03a2e]">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                        {userData?.avatar_url ? (
                            <img
                                src={userData?.avatar_url}
                                alt="Foto do perfil"
                                className="size-32 rounded-full object-cover border-3 border-[#b03a2e]/80 shadow-md"
                            />
                        ) : (
                            <FaUserCircle className="text-[#b03a2e] text-8xl" />
                        )}

                        <label
                            htmlFor="avatar-upload"
                            className="absolute hover:outline-2 bottom-0 right-0 bg-[#b03a2e] text-white p-2 rounded-full cursor-pointer hover:bg-[#a93226] transition-all group-hover:opacity-100 opacity-90"
                            title="Alterar foto"
                        >
                            {uploading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <FiCamera className="text-lg" />
                            )}
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*, .gif"
                            onChange={handleUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </div>

                    <h2 className="text-2xl font-serif text-[#1a1a1a] mt-3">
                        {userData?.username || 'Usuário'}
                    </h2>
                    <p className="text-[#6b705c] text-sm">
                        Membro desde {new Date(session?.user?.created_at).toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div className="space-y-3 border-t border-[#b03a2e]/20 pt-4">
                    <div className="flex items-center gap-3">
                        <FiMail className="text-[#b03a2e] flex-shrink-0" />
                        <div>
                            <p className="text-sm text-[#6b705c]">Email</p>
                            <p className="font-medium">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção de Estatísticas */}
            <div className="p-5 rounded-lg shadow-sm border border-[#b03a2e]">
                <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <GiBookshelf className="text-[#b03a2e]" />
                    Sua Bibliotheca
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                        <FaBook className="mx-auto text-[#b03a2e] text-xl mb-2" />
                        <p className="text-sm text-[#6b705c]">Total</p>
                        <p className="font-bold text-xl">{booksCount}</p>
                    </div>

                    <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                        <GiWhiteBook className="mx-auto text-[#b03a2e] text-xl mb-2" />
                        <p className="text-sm text-[#6b705c]">Não Lidos</p>
                        <p className="font-bold text-xl">{readStats.unread}</p>
                    </div>

                    <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                        <MdAutoStories className="mx-auto text-[#b03a2e] text-xl mb-2" />
                        <p className="text-sm text-[#6b705c]">Em Progresso</p>
                        <p className="font-bold text-xl">{readStats.in_progress}</p>
                    </div>

                    <div className="bg-[#f6f1e7] p-3 rounded-lg text-center transition-all">
                        <FaCheck className="mx-auto text-[#b03a2e] text-xl mb-2" />
                        <p className="text-sm text-[#6b705c]">Lidos</p>
                        <p className="font-bold text-xl">{readStats.read}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
