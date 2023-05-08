import * as Dialog from '@radix-ui/react-dialog';
import { RiErrorWarningLine } from "react-icons/ri"

export const NotifModal = ({open, setOpen}) => {
    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen} key={'notif'}>
                <Dialog.Portal>
                    {/* <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" /> */}
                    <Dialog.Content
                        asChild
                        data-cy="modal-information"
                        className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[10px] bg-white px-[30px] py-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    >
                        <div className="flex items-center justify-start">
                            <div className="text-left flex items-center justify-center gap-[13px]">
                                <RiErrorWarningLine
                                    className="text-[#00A790] h-[24px] w-[24px]"
                                    data-cy="modal-information-icon"
                                />
                                <div className="">
                                    <p
                                        data-cy="modal-information-title"
                                        className="text-lg leading-[27px] text-center text-secondary"
                                    >
                                        Activity berhasil dihapus
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}