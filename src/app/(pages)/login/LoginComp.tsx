'use client'
import { FormEvent, useState, useEffect } from "react"
import ProvidersComp from "./ProvidersComp";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useAuthStore } from "@/app/stores/session-store";
import { useRouter } from "next/navigation";
import useLogin from "@/app/hooks/useLogin";
import useRegister from "@/app/hooks/useRegister";

export default function LoginComp() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const { isAuthenticated } = useAuthStore();

    // form inputs
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    // -----------

    const [ShowConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [ShowPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    // RefacLayout
    const { handleLogin } = useLogin();
    const { handleRegister } = useRegister();
    // RefacLayout

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault()
        setLoadingSubmit(true)

        if(isLogin){
            await handleLogin(email.trim(), password)
        } else {
            await handleRegister(e, email, username, password, confirmPassword)
        }

        // isLogin ? handleLogin : handleRegister
        setLoadingSubmit(false)
    }

    function handleChange() {
        setIsLogin(!isLogin);
        setUsername(''); setPassword(''); setConfirmPassword('');
        setEmail('')
    }

    if (isAuthenticated) return (
        <div className="col-span-full flex justify-center py-10">
            <div className="animate-spin rounded-full size-44 border-t-4 border-b-4 border-[#b03a2e]"></div>
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
                        {isLogin ? "Entre com seu email e senha." : "Cadastre-se gratuitamente."}
                    </p>
                </div>

                <form className="flex flex-col gap-y-2"
                    onSubmit={handleSubmitForm}
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

                <div className="mt-5"><ProvidersComp /></div>

                
                    <p className="text-center text-[#6b705c] mt-5 text-sm">
                        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
                    </p>
                
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
