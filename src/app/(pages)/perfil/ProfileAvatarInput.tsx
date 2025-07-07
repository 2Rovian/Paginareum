import useUserProfile from "@/app/hooks/useUserProfile";
import { supabase } from "@/app/utils/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfileAvatarInput() {
    const [uploading, setUploading] = useState(false);
    const { UserData, session } = useUserProfile()

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setUploading(true);
        const file = event.target.files?.[0];
        if (!file || !session?.user?.id) return;

        const fileExt = file.name.split('.').pop();
        const filePath = `${session.user.id}/avatar-${Date.now()}.${fileExt}`;

        //  Remove imagem anterior (se houver)
        if (UserData?.avatar_url) {
            // Extrai o caminho do arquivo antigo a partir da URL pública
            const oldPath = UserData.avatar_url.split("/storage/v1/object/public/avatar-img/")[1];
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
        // setUserData((prev: any) => ({
        //     ...prev,
        //     avatar_url: `${publicUrl}?${Date.now()}`
        // }));

        toast.success("Avatar adicionado")
        setUploading(false);
    };

    return (
        <input
            id="avatar-upload"
            type="file"
            accept="image/*, .gif"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
        />
    )
}