import { GoPlus } from "react-icons/go"
import { ImSpinner2 } from "react-icons/im"

export const AddButton = ({ loading, onClick, dataCy }) => {
    return (
        <button
            className="bg-primary text-white flex gap-1.5 items-center justify-center rounded-full font-semibold text-xs md:text-lg leading-[18px] md:leading-[27px] w-[100px] md:w-[159px] h-[37px] md:h-[54px]"
            data-cy={dataCy}
            onClick={onClick}
        >
            {loading ?
                <ImSpinner2
                    className="animate-spin w-5 h-5"
                />
                :
                <>
                    <GoPlus className="w-[7px] md:w-[14px] h-[7px] md:h-[14px]" />
                    Tambah
                </>
            }
        </button>
    )
}