export const Navbar = () => {
    return (
        <header data-cy="header-background"
            className="bg-primary py-2.5 h-16 md:h-[105px] flex items-center px-5 md:px-0"
        >
            <h2
                data-cy="header-title"
                className="font-bold text-lg md:text-2xl text-white mx-auto container"
            >
                TO DO LIST APP
            </h2>
        </header>
    )
}