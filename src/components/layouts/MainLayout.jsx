import { Navbar } from "./Navbar"

export const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}