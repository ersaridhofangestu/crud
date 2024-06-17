const Window = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-5">
            <img src="/security-guard.gif" alt="security" width={200} height={200} />
            <h1 className="font-bold text-3xl capitalize text-[#0000FF]">warning!</h1>
            <p className="opacity-70">Sorry, this page only supports desktop screens</p>
        </div>
    )
}

export default Window