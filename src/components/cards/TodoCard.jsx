import * as Checkbox from '@radix-ui/react-checkbox'
import axios from 'axios'
import { useState } from 'react'
import { HiCheck, HiOutlinePencil } from 'react-icons/hi'
import { DeleteButton } from '../buttons/DeleteButton'
import { EditItemModal } from '../modals/EditItemModal'

export const TodoCard = ({ data, mutate, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isActive, setIsActive] = useState(data?.is_active === 0 ? true : false)

    const handleUpdateStatusTodo = (val) => {
        setIsActive(() => val)
        const payload = {
            is_active: val ? 0 : 1,
            priority: data?.priority
        }

        axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${data?.id}`, payload)
            .catch((err) => console.log("galga", err))
    }

    const handleDelete = async () => {
        onDelete(data?.id)        
    }

    return (
        <div
            className="rounded-[10px] shadow-lg bg-white flex items-center justify-between px-[28px] py-[26px] w-full"
        >
            <EditItemModal open={isEdit} setOpen={setIsEdit} mutate={mutate} data={data} />

            <div className='flex items-center'>
                <Checkbox.Root
                    className="flex h-[25px] w-[25px] appearance-none items-center justify-center border bg-white"
                    onCheckedChange={handleUpdateStatusTodo}
                    checked={isActive}
                    id="c1"
                    data-cy="todo-item-checkbox"
                >
                    <Checkbox.Indicator className="bg-primary h-[25px] w-[25px] flex items-center justify-center">
                        <HiCheck className='text-white' />
                    </Checkbox.Indicator>
                </Checkbox.Root>

                <span
                    data-cy="todo-item-priority-indicator"
                    className={`${data?.priority === 'very-high' ? 'bg-[#ED4C5C]' :
                        data?.priority === 'high' ? 'bg-[#F8A541]' :
                            data?.priority === 'medium' ? 'bg-[#00A790]' :
                                data?.priority === 'low' ? 'bg-[#428BC1]' :
                                    data?.priority === 'very-low' ? 'bg-[#8942C1]' : ''
                        } h-[9px] w-[9px] rounded-full ml-[22px]`}
                >
                </span>

                <span
                    data-cy="todo-item-title"
                    className={`ml-[16px] text-lg leading-[27px] ${!isActive ? 'text-secondary' : 'text-[#888888] line-through'}`}
                >
                    {data?.title}
                </span>

                <HiOutlinePencil
                    data-cy="todo-item-edit-button"
                    className="cursor-pointer ml-[20px] text-[#C4C4C4]"
                    onClick={() => {
                        setIsEdit(() => true)
                    }}
                />
            </div>

            <DeleteButton
                onDelete={handleDelete}
                text={'Apakah anda yakin menghapus item'}
                itemName={data?.title}
                dataCy="todo-item-delete-button"
            />
        </div>
    )
}