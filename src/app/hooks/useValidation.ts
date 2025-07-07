import toast from "react-hot-toast"

export default function useValidation() {
    const handleValidation = (
        cleanUsername: string,
        cleanEmail: string,
        password: string,
        confirmPassword: string
    ) => {
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem")
            return
        }
        if (cleanUsername.length < 6) {
            toast.error("O nome de usuário deve ter pelo menos 6 caracteres")
            return
        }
        if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
            toast.error("Email inválido")
            return
        }
        if (password.length < 8) {
            toast.error("A senha deve ter pelo menos 8 caracteres")
            return
        }
    }

    return { handleValidation }
}