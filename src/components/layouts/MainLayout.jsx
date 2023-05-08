import { Navbar } from "./Navbar"

export const MainLayout = ({ children }) => {
    return (
        <div className="bg-main min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}