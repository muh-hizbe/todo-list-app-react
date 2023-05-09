import * as Checkbox from '@radix-ui/react-checkbox'
import axios from 'axios'
import { useEffect, useState } from 'react'
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

    // useEffect(() => {}, [data])

    return (
        <div
            className="rounded-[10px] shadow-lg bg-white flex items-center justify-between px-[28px] py-[26px] w-full"
        >
            <EditItemModal open={isEdit} setOpen={setIsEdit} mutate={mutate} data={data} />

            <div className='flex items-center'>
                {/* <input
                    className="flex items-center justify-center h-[25px] w-[25px] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:bg-transparent before:opacity-0 before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:after:z-[1] focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value={data?.is_active}
                    id="checkboxChecked"
                    onChange={(e) => handleUpdateStatusTodo(e?.target?.checked)}
                    checked={isActive}
                    key={data?.id}
                /> */}
                <Checkbox.Root
                    className="flex h-[25px] w-[25px] appearance-none items-center justify-center border bg-white"
                    onCheckedChange={handleUpdateStatusTodo}
                    checked={isActive}
                    id={data?.id}
                    key={`todo-item-checkbox-${data?.id}`}
                    data-cy="todo-item-checkbox"
                >
                    <Checkbox.Indicator asChild className="bg-primary h-[25px] w-[25px] flex items-center justify-center">
                        <HiCheck className='text-white' />
                    </Checkbox.Indicator>
                </Checkbox.Root>

                <span
                    data-cy="todo-item-priority-indicator"
                    className={`${data?.priority === 'very-high' ? 'bg-[#ED4C5C]' :
                        data?.priority === 'high' ? 'bg-[#F8A541]' :
                            data?.priority === 'normal' ? 'bg-[#00A790]' :
                                data?.priority === 'low' ? 'bg-[#428BC1]' :
                                    data?.priority === 'very-low' ? 'bg-[#8942C1]' : ''
                        } h-[9px] w-[9px] rounded-full ml-[22px]`}
                >
                </span>

                <span
                    data-cy="todo-item-title"
                    className={`ml-[16px] text-lg leading-[27px] ${!isActive ? 'text-secondary' : 'text-[#888888] line-through'}`}
                    onClick={() => {
                        setIsEdit(() => true)
                    }}
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