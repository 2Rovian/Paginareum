import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ProvidersComponent() {
    return (
        <>
            <div className="flex items-center w-full mb-4">
                <div className="h-[2px] bg-[#6b705c] flex-1"></div>
                <span className="px-3 text-[#6b705c] text-sm">Or sign in with</span>
                <div className="h-[2px] bg-[#6b705c] flex-1"></div>
            </div>
            <section className="flex flex-col gap-y-2">

                <button
                    type='button'
                    className='flex outline outline-[#6b705c] text-[#1a1a1a] hover:text-[#b03a2e] rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:bg-[#f6f1e7] hover:outline-[#b03a2e] duration-300 ease-in-out'
                >
                    <span className='text-2xl text-[#b03a2e]'>
                        <FaGithub />
                    </span>
                    <span className="font-semibold">Github</span>
                </button>

                <form action=''>
                    <button
                        type='submit'
                        className='flex outline outline-[#6b705c] text-[#1a1a1a] hover:text-[#b03a2e] rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:bg-[#f6f1e7] hover:outline-[#b03a2e] duration-300 ease-in-out'
                    >
                        <span className='text-2xl text-[#b03a2e]'>
                            <FaGoogle />
                        </span>
                        <span className="font-semibold">Google</span>
                    </button>
                </form>

                <button
                    type='button'
                    className='flex outline outline-[#6b705c] text-[#1a1a1a] hover:text-[#b03a2e] rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:bg-[#f6f1e7] hover:outline-[#b03a2e] duration-300 ease-in-out'
                >
                    <span className='text-2xl text-[#b03a2e]'>
                        <FaXTwitter />
                    </span>
                    <span className="font-semibold">Twitter</span>
                </button>

            </section>
        </>
    )
}
