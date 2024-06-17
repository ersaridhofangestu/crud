import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Window from "./_Window.tsx"

const NotFound = () => {
    const [isWindow, setWindow] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setWindow(true)
        }
    }, [window])

    return (
        <>
            {
                isWindow ? (
                    <div className="w-screen h-screen flex items-center justify-center flex-col gap-5" >
                        <img src="/security-guard.gif" alt="security" width={200} height={200} />
                        <h1 className="font-bold text-3xl capitalize text-[#0000FF]">404 page not found</h1>
                        <p className="w-1/2 opacity-70">We're sorry, the page you requested cloud not be found please go back to the login pageSorry, the page you requested was not found, please return to the login page</p>
                        <Link to={"/"}
                            className="flex items-center justify-start gap-2 border border-[#0000FF] rounded-md py-1 px-2 capitalize text-[#0000FF] font-bold hover:bg-[#0000FF] hover:text-white group/login transition-colors duration-300 delay-100 ease-in-out"
                        >
                            login page
                        </Link>
                    </div >
                ) : (
                    <Window />
                )}

        </>
    )
}

export default NotFound