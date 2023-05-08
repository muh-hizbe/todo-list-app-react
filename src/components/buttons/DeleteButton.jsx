import { HiOutlineTrash } from "react-icons/hi"
import { CiWarning } from "react-icons/ci"
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export const DeleteButton = ({ onDelete, text, itemName }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = (e) => {
        if (!loading) {
            setLoading(() => true)
            e.stopPropagation()
            e.preventDefault()
            onDelete()
                .then(resp => {
                    setOpen(() => false)
                    setLoading(() => false)
                })
        }
    }

    useEffect(() => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 0)
    }, [open])

    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen} key={'confirm'}>
                <Dialog.Trigger asChild data-cy="activity-item-delete-button">
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-red-500"
                    >
                        <HiOutlineTrash />
                    </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" />
                    <Dialog.Content
                        data-cy="modal-delete"
                        className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[10px] bg-white p-[43px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    >
                        <div className="flex items-center justify-center">
                            <div className="text-center flex flex-col items-center justify-center">
                                <CiWarning className="text-[#ED4C5C] h-[62.98px] w-[62.98px]" />
                                <div className="mt-[51.5px] mb-[59.5px]">
                                    <p
                                        data-cy="modal-delete-title"
                                        className="text-lg leading-[27px] text-center text-secondary"
                                    >
                                        {text} <strong>“{itemName}”?</strong>
                                    </p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <button
                                        className="rounded-[45px] w-[150px] h-[54px] bg-main text-[#4A4A4A] text-lg leading-[27px] font-semibold"
                                        data-cy="modal-delete-cancel-button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            setOpen(false)
                                        }}
                                    >
                                        Batal
                                    </button>

                                    <button
                                        className="rounded-[45px] w-[150px] h-[54px] bg-[#ED4C5C] text-white text-lg leading-[27px] font-semibold"
                                        onClick={handleDelete}
                                        // data-cy="modal-delete-confirm-button"
                                        data-cy="activity-item-delete-button"                                    
                                    >
                                        {loading ?
                                            <ImSpinner2
                                                className="animate-spin w-5 h-5 mx-auto"
                                            />
                                            :
                                            <>
                                                Hapus
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}