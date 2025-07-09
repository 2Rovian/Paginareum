'use client'
import useOAuthLogin from "@/app/hooks/useOAuthLogin";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function ProvidersComponent() {

    const { handleLoginWithProvider } = useOAuthLogin()

    return (
        <>
            <div className="flex items-center w-full mb-4">
                <div className="h-[2px] bg-[#6b705c] flex-1"></div>
                <span className="px-3 text-[#6b705c] text-sm">Ou entre com</span>
                <div className="h-[2px] bg-[#6b705c] flex-1"></div>
            </div>
            <section className="flex flex-col gap-y-2">
                <button
                    type='button'
                    className='flex outline outline-[#6b705c] text-[#1a1a1a] hover:text-[#b03a2e] rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:bg-[#f6f1e7] hover:outline-[#b03a2e] duration-300 ease-in-out'
                    onClick={() => handleLoginWithProvider("github")}
                >
                    <span className='text-2xl text-[#b03a2e]'>
                        <FaGithub />
                    </span>
                    <span className="font-semibold">Github</span>
                </button>

                <button
                    type='button'
                    className='flex outline outline-[#6b705c] text-[#1a1a1a] hover:text-[#b03a2e] rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:bg-[#f6f1e7] hover:outline-[#b03a2e] duration-300 ease-in-out'
                    onClick={() => handleLoginWithProvider("discord")}
                >
                    <span className='text-2xl text-[#b03a2e]'>
                        <FaDiscord />
                    </span>
                    <span className="font-semibold">Discord</span>
                </button>

            </section>
        </>
    )
}