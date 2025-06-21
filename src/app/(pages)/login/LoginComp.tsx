'use client'
import { useState } from "react"
import ProvidersComp from "./ProvidersComp";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function LoginComp() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [ShowPassword, setShowPassword] = useState<boolean>(false);

    return (
        <>
            <div className="mt-0 border border-[#6b705c] bg-[#f6f1e7] text-[#1a1a1a] flex flex-col p-6 w-full max-w-[500px] rounded-xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl text-[#b03a2e] font-bold">
                        {isLogin ? "Bem-vindo" : "Crie sua conta"}
                    </h2>
                    <p className="text-[#6b705c]">
                        {isLogin ? "Entre com seu usuário e senha." : "Cadastre-se gratuitamente."}
                    </p>
                </div>

                <form className="flex flex-col gap-y-2">
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        className="focus:outline-1 focus:outline-[#b03a2e] px-3 py-2 rounded bg-white transition-all duration-150 shadow"
                    />

                    <div className="flex bg-white shadow items-center rounded transition-all duration-150 focus-within:outline focus-within:outline-[#b03a2e]">
                        <input
                            type={ShowPassword ? "text" : "password"}
                            placeholder="Senha"
                            className="px-3 py-2 rounded bg-white transition-all duration-150 grow focus:outline-none"
                        />
                        <span
                            className="p-2 text-[#1a1a1a] cursor-pointer"
                            onClick={() => setShowPassword(!ShowPassword)}
                        >
                            {ShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {!isLogin &&
                        <div className="flex bg-white shadow items-center rounded transition-all duration-150 focus-within:outline focus-within:outline-[#b03a2e]">
                            <input
                                type={ShowConfirmPassword ? "text" : "password"}
                                placeholder="Confirme a senha"
                                className="px-3 py-2 rounded bg-white transition-all duration-150 grow focus:outline-none"
                            />
                            <span
                                className="p-2 text-[#1a1a1a] cursor-pointer"
                                onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}
                            >
                                {ShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                    }

                    <button
                        type='submit'
                        className="duration-300 ease-in-out text-white py-3 rounded-md font-bold bg-[#b03a2e] hover:bg-[#a93226] mt-4 cursor-pointer"
                    >
                        {isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
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
                    onClick={() => { setIsLogin(!isLogin) }}
                >
                    {isLogin ? 'Cadastre-se' : 'Entre'}
                </span>.
            </p>
        </>
    )
}
