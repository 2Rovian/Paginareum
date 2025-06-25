'use client'
import { FormEvent, useState } from "react"
import ProvidersComp from "./ProvidersComp";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";

import { supabase } from "@/app/utils/supabase/client";
import toast from "react-hot-toast";

import { useAuthStore } from "@/app/stores/session-store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginComp() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const { isAuthenticated } = useAuthStore();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

    // form inputs
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    // -----------

    const [ShowConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [ShowPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    function handleChange() {
        setIsLogin(!isLogin);
        setUsername(''); setPassword(''); setConfirmPassword('');
        setEmail('')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const cleanEmail = email.trim();
        const cleanUsername = username.trim();

        if (!isLogin) {
            if (password !== confirmPassword) {
                toast.error("As senhas não coincidem")
                setLoadingSubmit(false)
                return
            }
            if (cleanUsername.length < 6) {
                toast.error("O nome de usuário deve ter pelo menos 6 caracteres")
                return
            }
            if (!email.includes("@") || !email.includes(".")) {
                toast.error("Email inválido")
                setLoadingSubmit(false)
                return
            }
            if (password.length < 8) {
                toast.error("A senha deve ter pelo menos 8 caracteres")
                setLoadingSubmit(false)
                return
            }
        }

        setLoadingSubmit(true)
        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password
                });
                if (signInError) {
                    console.error("Error ao logar: ", signInError.message);
                    toast.error("Erro ao fazer login");
                } else {
                    toast.success("Login feito com sucesso");
                    setAuthenticated(true);
                    router.push('/')
                    
                }

            } else {
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: cleanEmail,
                    password
                });

                if (signUpError) {
                    console.error("Erro ao criar conta: ", signUpError.message);
                    toast.error("Erro ao cadastrar");
                    return;
                }

                // registo do usuário na tabela 'profiles'
                const { error: profileError } = await supabase.from("profiles")
                    .insert({
                        profile_id: signUpData.user?.id,
                        username: cleanUsername,
                    });

                if (profileError) {
                    console.error("Erro ao criar perfil: ", profileError.message);
                    toast.error("Erro ao criar perfil");
                    return;
                }
                await handleLogin(cleanEmail, password);
            }
        } finally {
            setLoadingSubmit(false);
        }

    }

    async function handleLogin(email: string, password: string) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
            console.error("Error ao logar: ", signInError?.message)
            toast.error("Erro ao fazer login :(")
            return
        }
        toast.success("Login feito com sucesso :)")
        setAuthenticated(true); // att globalState
        router.push('/')
    }

    if (isAuthenticated) return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-[#f6f1e7] border flex flex-col justify-center border-[#6b705c] rounded-xl shadow-md text-center">
            <MdAccountBox className="text-7xl mb-2 mx-auto text-[#b03a2e]" />
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
                Você já está conectado
            </h2>
            <p className="text-[#6b705c] mb-6">
                Acesse a página inicial para explorar os conteúdos disponíveis.
            </p>
            <Link
                href="/"
                className="inline-block bg-[#b03a2e] hover:bg-[#a93226] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
                Retornar à Home
            </Link>
        </div>

    )

    return (
        <>
            <h1 className="text-4xl mb-4 font-serif text-[#1a1a1a]">
                Conecte-se ao <span className="text-[#b03a2e]">Paginareum</span>


            </h1>

            <div className="mt-0 border border-[#6b705c] bg-[#f6f1e7] text-[#1a1a1a] flex flex-col p-6 w-full max-w-[500px] rounded-xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl text-[#b03a2e] font-bold">
                        {isLogin ? "Bem-vindo" : "Crie sua conta"}
                    </h2>
                    <p className="text-[#6b705c]">
                        {isLogin ? "Entre com seu usuário e senha." : "Cadastre-se gratuitamente."}
                    </p>
                </div>

                <form className="flex flex-col gap-y-2"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={email}
                        onChange={(e => setEmail(e.target.value))}
                        placeholder="Email"
                        className="focus:outline-2 outline-[#b03a2e] px-3 py-2 rounded bg-white ease-in-out duration-100 shadow"
                    />

                    {!isLogin && <input
                        type="text"
                        value={username}
                        onChange={(e => setUsername(e.target.value))}
                        placeholder={"Nome de usuário"}
                        className="focus:outline-2 outline-[#b03a2e] px-3 py-2 rounded bg-white ease-in-out duration-100 shadow"
                    />}

                    <div className="flex bg-white shadow items-center rounded ease-in-out duration-100 focus-within:outline-2 focus-within:outline-[#b03a2e]">
                        <input
                            type={ShowPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            className="px-3 py-2 rounded bg-white  grow focus:outline-none"
                        />
                        <span
                            className="p-2 text-[#1a1a1a] cursor-pointer"
                            onClick={() => setShowPassword(!ShowPassword)}
                        >
                            {ShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {!isLogin &&
                        <div className="flex bg-white shadow items-center rounded ease-in-out duration-100 focus-within:outline-2 focus-within:outline-[#b03a2e]">
                            <input
                                type={ShowConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirme a senha"
                                className="px-3 py-2 rounded bg-white grow focus:outline-none"
                            />
                            <span
                                className="p-2 text-[#1a1a1a] cursor-pointer"
                                onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}
                            >
                                {ShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                    }

                    {loadingSubmit ?
                        <div className="flex justify-center 
                    duration-300 ease-in-out text-white py-3 rounded-md font-bold bg-[#b03a2e] mt-4 cursor-pointer
                    ">
                            <div className="animate-spin rounded-full size-6 border-t-2 border-b-2 border-white"></div>
                        </div>
                        :
                        <button
                            type='submit'
                            className="duration-300 ease-in-out text-white py-3 rounded-md font-bold bg-[#b03a2e] hover:bg-[#a93226] mt-4 cursor-pointer"
                        >
                            {isLogin ? 'Entrar' : 'Cadastrar'}
                        </button>}

                </form>

                {isLogin && <div className="mt-5"><ProvidersComp /></div>}

                {isLogin &&
                    <p className="text-center text-[#6b705c] mt-5 text-sm">
                        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
                    </p>
                }
            </div>

            <p className="text-[#1a1a1a] mt-5 text-center">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                <span
                    className="font-semibold text-[#b03a2e] hover:underline cursor-pointer ml-1"
                    onClick={handleChange}
                >
                    {isLogin ? 'Cadastre-se' : 'Entre'}
                </span>.
            </p>
        </>
    )
}
