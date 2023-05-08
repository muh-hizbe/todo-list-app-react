import { ImSpinner2 } from "react-icons/im"

export const LoadingSection = () => {
    return (
        <div className="flex items-center justify-center gap-2 w-full h-full">
            <ImSpinner2
                className="animate-spin w-10 h-10"
            />
            Loading ...
        </div>
    )
}