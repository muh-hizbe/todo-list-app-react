import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';
import { VscChevronDown } from 'react-icons/vsc';
import { forwardRef, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';

export const AddItemModal = ({ open, setOpen, mutate, activity }) => {
    const [priority, setPriority] = useState('very-high')
    const [title, setTitle] = useState('')
    const [isFilled, setIsFilled] = useState(false)
    const [openOptionPriority, setOpenOptionPriority] = useState(false)
    const [loading, setLoading] = useState(false)

    const resetField = () => {
        setPriority(() => 'very-high')
        setTitle(() => '')
    }

    const handleClose = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setOpen(false)
        resetField()
    }

    const handleSubmit = () => {
        if (!loading && isFilled) {
            setLoading(() => true)
            const payload = {
                activity_group_id: activity?.id,
                priority: priority,
                title: title
            }

            axios.post(`https://todo.api.devcode.gethired.id/todo-items`, payload)
                .then(() => {
                    setOpen(() => false)
                    resetField()
                    mutate()
                })
                .finally(() => setLoading(() => false))
        }
    }

    const SelectItem = forwardRef(({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={`'w-full text-base text-[#4A4A4A] rounded-[3px] flex items-center justify-between px-[17px] py-[14px] cursor-pointer hover:bg-primary/10 outline-none'
                    ${className}`}
                {...props}
                ref={forwardedRef}
                data-cy={`modal-add-priority-${props?.value}`}
            >
                <Select.ItemText>
                    {children}
                </Select.ItemText>
                <Select.ItemIndicator className="w-[25px] inline-flex items-center justify-center">
                    <BiCheck />
                </Select.ItemIndicator>
            </Select.Item>
        );
    });


    useEffect(() => {
        if (title && title !== '' && priority && priority !== '') {
            setIsFilled(() => true)
        } else {
            setIsFilled(() => false)
        }
    }, [title, priority])

    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen} key={'add-item-modal'}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" />
                    <Dialog.Content
                        data-cy="modal-add"
                        className="divide-y data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[830px] translate-x-[-50%] translate-y-[-50%] rounded-[10px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    >
                        <div className="flex items-center justify-between py-[24px] px-[30px]">
                            <Dialog.Title className="text-secondary m-0 text-lg leading-[27px] font-semibold">
                                Tambah List Item
                            </Dialog.Title>

                            <IoCloseOutline
                                className="cursor-pointer text-[#A4A4A4] w-6 h-6"
                                data-cy="modal-add-close-button"
                                onClick={handleClose}
                            />
                        </div>

                        <div className="flex flex-col gap-[26px] pt-[38px] pb-[23px] px-[30px]">
                            <div className="flex flex-col gap-[9px]">
                                <label
                                    className='uppercase text-secondary text-xs leading-[18px] font-semibold'
                                    htmlFor='name'
                                    data-cy="modal-add-name-title"
                                >
                                    NAMA LIST ITEM
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    className='w-full border rounded-[6px] px-[18px] py-[14px] text-secondary placeholder:text-[#A4A4A4] text-base focus:outline-none focus:border-primary'
                                    placeholder='Tambahkan nama list item'
                                    value={title}
                                    data-cy="modal-add-name-input"
                                    onChange={(e) => setTitle(() => e?.target?.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-[9px]">
                                <label
                                    className='uppercase text-secondary text-xs leading-[18px] font-semibold'
                                    htmlFor='priority'
                                    data-cy="modal-add-priority-title"
                                >
                                    PRIORITY
                                </label>
                                <div>
                                    <Select.Root
                                        key={'select-priority'}
                                        open={openOptionPriority}
                                        onOpenChange={setOpenOptionPriority}
                                        value={priority}
                                        onValueChange={setPriority}
                                    >
                                        <Select.Trigger
                                            className={`flex items-center justify-between w-[205px] border rounded-[6px] px-[18px] py-[14px] text-secondary placeholder:text-[#A4A4A4] text-base focus:outline-none focus:border-primary ${openOptionPriority ? 'bg-coby' : ''}`}
                                            aria-label="Priority"
                                            data-cy="modal-add-priority-dropdown"
                                        >
                                            {openOptionPriority ?
                                                <span>
                                                    Pilih priority
                                                </span>
                                                :
                                                <Select.Value placeholder="Pilih priority" data-cy="modal-add-priority-item" />
                                            }
                                            <Select.Icon className={`text-secondary transform ${openOptionPriority ? 'rotate-180' : ''}`}
                                                data-cy="tables:chevron-down"
                                            >
                                                <VscChevronDown />
                                            </Select.Icon>
                                        </Select.Trigger>

                                        <Select.Portal>
                                            <Select.Content
                                                className="overflow-hidden bg-white rounded-md border w-full"
                                                align='end'
                                                position='popper'
                                                side='top'
                                            >
                                                <Select.ScrollUpButton />
                                                <Select.Viewport className="divide-y w-[205px]">
                                                    <SelectItem value="very-high">
                                                        <div className='flex items-center gap-[19px]'>
                                                            <span
                                                                className={`bg-[#ED4C5C] h-[14px] w-[14px] rounded-full`}
                                                            />
                                                            Very High
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="high">
                                                        <div className='flex items-center gap-[19px]'>
                                                            <span
                                                                className={`bg-[#F8A541] h-[14px] w-[14px] rounded-full`}
                                                            />
                                                            High
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="medium">
                                                        <div className='flex items-center gap-[19px]'>
                                                            <span
                                                                className={`bg-[#00A790] h-[14px] w-[14px] rounded-full`}
                                                            />
                                                            Medium
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="low">
                                                        <div className='flex items-center gap-[19px]'>
                                                            <span
                                                                className={`bg-[#428BC1] h-[14px] w-[14px] rounded-full`}
                                                            />
                                                            Low
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="very-low">
                                                        <div className='flex items-center gap-[19px]'>
                                                            <span
                                                                className={`bg-[#8942C1] h-[14px] w-[14px] rounded-full`}
                                                            />
                                                            Very Low
                                                        </div>
                                                    </SelectItem>
                                                </Select.Viewport>
                                                <Select.ScrollDownButton />
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end px-10 pt-[15px] pb-[19px]">
                            <button
                                className={`rounded-[45px] w-[150px] h-[54px] bg-primary text-white text-lg leading-[27px] font-semibold ${!isFilled ? '!bg-primary/50 cursor-not-allowed' : ''}`}
                                disabled={isFilled ? false : true}
                                onClick={handleSubmit}
                                data-cy="modal-add-save-button"
                            >
                                {loading ?
                                    <ImSpinner2
                                        className="animate-spin w-5 h-5 mx-auto"
                                    />
                                    :
                                    <>
                                        Simpan
                                    </>
                                }
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}