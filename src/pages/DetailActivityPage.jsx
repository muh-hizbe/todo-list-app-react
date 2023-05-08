import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { AddButton } from "../components/buttons/AddButton";
import { TodoEmptyState } from "../components/svg/TodoEmptyState";
import { ListTodoCard } from "../components/sections/ListTodoCard";
import { useEffect, useRef, useState } from "react";
import { LoadingSection } from "../components/sections/LoadingSection";
import { FaChevronLeft } from "react-icons/fa"
import { HiOutlinePencil } from "react-icons/hi";
import { SortButton } from "../components/buttons/SortButton";
import { AddItemModal } from "../components/modals/AddItemModal";
import { NotifModal } from "../components/modals/NotifModal";

export async function activityLoader({ params }) {
    // const resp = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${params?.id}`)

    return { id: params?.id }
}

export const DetailActivityPage = () => {
    const { id } = useLoaderData()
    const navigate = useNavigate()
    const titleRef = useRef()
    const [activity, setActivity] = useState(null)
    const [activityTitle, setActivityTitle] = useState('')
    const [loading, setLoading] = useState(true)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [openNewItemModal, setOpenNewItemModal] = useState(false)
    const [sortedBy, setSortedBy] = useState('latest')
    const [todos, setTodos] = useState([])
    const [openToast, setOpenToast] = useState(false)

    const fetchTodos = async () => {
        setLoading(() => true)
        const result = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)

        setActivity(() => result?.data)
        setActivityTitle(() => result?.data?.title)
        setTodos(() => result?.data?.todo_items)
        setLoading(() => false)
    }

    const handleUpdateActivity = () => {
        const payload = {
            title: activityTitle,
        }

        axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, payload)
            .then(() => {
                fetchTodos()
            })
            .catch((err) => console.log("galga", err))
            .finally(() => setIsEditTitle(() => false))
    }

    const handleDeleteTodoItem = async (id) => {
        await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
            .then(() => {
                setOpenToast(() => true)
                fetchTodos()
            })
    }

    const handleSort = (type = 'latest') => {
        const newTodos = todos

        if (newTodos?.length > 0) {
            newTodos?.sort((a, b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()

                if (type === 'latest') {
                    return b.id - a.id
                }
                if (type === 'oldest') {
                    return a.id - b.id
                }
                if (type === 'az') {
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    if (titleA === titleB) {
                        return 0;
                    }
                }
                if (type === 'za') {
                    if (titleA > titleB) {
                        return -1;
                    }
                    if (titleA < titleB) {
                        return 1;
                    }
                    if (titleA === titleB) {
                        return 0;
                    }
                }

                // unfinished
                return b.is_active - a.is_active
            })

            setTodos(() => newTodos)
        }
    }

    useEffect(() => {
        if (isEditTitle) {
            titleRef?.current?.focus()
        }
    }, [isEditTitle])

    useEffect(() => {
        fetchTodos()
    }, [])

    useEffect(() => {
        if (todos?.length > 0) {
            handleSort()
        }
    }, [todos])

    useEffect(() => {
        handleSort()
    }, [sortedBy])

    return (
        <MainLayout>
            <main className="container mx-auto py-7 md:py-[43px] px-5 md:px-0" data-cy='activity-item'>
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="flex items-center justify-start w-full md:w-auto gap-[23px]">
                        <div className="flex items-center gap-[23px] w-full">
                            <FaChevronLeft
                                className="h-4 w-4 cursor-pointer"
                                data-cy="todo-back-button"
                                onClick={() => navigate('/')}
                            />
                            {!isEditTitle ?
                                <h1 data-cy="todo-title"
                                    className="text-secondary text-base md:text-4xl md:leading-[54px] font-bold"
                                    onClick={() => {
                                        setIsEditTitle(() => true)
                                    }}
                                >
                                    {activity?.title}
                                </h1>
                                :
                                <input
                                    ref={titleRef}
                                    className="text-secondary w-full bg-transparent focus:outline-none text-base md:text-4xl md:leading-[54px] font-bold border-b-2 border-secondary"
                                    value={activityTitle}
                                    onChange={(e) => setActivityTitle(e?.target?.value)}
                                    onBlur={handleUpdateActivity}
                                    data-cy="todo-title"
                                />
                            }
                        </div>

                        <HiOutlinePencil
                            data-cy="todo-title-edit-button"
                            className="cursor-pointer"
                            onClick={() => {
                                setIsEditTitle(() => true)
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-[18px] w-full md:w-auto">
                        <SortButton sortedBy={sortedBy} setSortedBy={setSortedBy} onSort={handleSort} />
                        <AddButton loading={false} onClick={() => setOpenNewItemModal(true)} dataCy={'todo-add-button'} />
                        <AddItemModal open={openNewItemModal} setOpen={setOpenNewItemModal} activity={activity} mutate={fetchTodos} />
                    </div>
                </div>

                <NotifModal open={openToast} setOpen={setOpenToast} text={'Item berhasil dihapus'} />

                {(todos?.length === 0 && !loading) ?
                    <div className="py-[65px]" onClick={() => setOpenNewItemModal(() => true)}>
                        <TodoEmptyState />
                    </div>
                    :
                    <div className="mt-[48px]">
                        {!loading ?
                            <ListTodoCard todos={todos} mutate={fetchTodos} onDelete={handleDeleteTodoItem} />
                            :
                            <LoadingSection />
                        }
                    </div>
                }
            </main>
        </MainLayout>
    )
}