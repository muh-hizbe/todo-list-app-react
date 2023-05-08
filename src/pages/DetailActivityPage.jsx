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

    const handleSort = () => {
        const newTodos = todos

        if (newTodos?.length > 0) {
            newTodos?.sort((a, b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()

                if (sortedBy === 'latest') {
                    return a.id - b.id
                }
                if (sortedBy === 'oldest') {
                    return b.id - a.id
                }
                if (sortedBy === 'az') {
                    if (titleA < titleB) {
                        return 1;
                    }
                    if (titleA > titleB) {
                        return -1;
                    }
                    return 0;
                }
                if (sortedBy === 'za') {
                    if (titleA > titleB) {
                        return 1;
                    }
                    if (titleA < titleB) {
                        return -1;
                    }
                    return 0;
                }

                // unfinished
                return a.is_active - b.is_active
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
                        <SortButton sortedBy={sortedBy} setSortedBy={setSortedBy} />
                        <AddButton loading={false} onClick={() => setOpenNewItemModal(true)} dataCy={'todo-add-button'} />
                        <AddItemModal open={openNewItemModal} setOpen={setOpenNewItemModal} activity={activity} mutate={fetchTodos} />
                    </div>
                </div>

                {(todos?.length === 0 && !loading) ?
                    <div className="py-[65px]" onClick={() => setOpenNewItemModal(() => true)}>
                        <TodoEmptyState />
                    </div>
                    :
                    <div className="mt-[48px]">
                        {!loading ?
                            <ListTodoCard todos={todos} mutate={fetchTodos} />
                            :
                            <LoadingSection />
                        }
                    </div>
                }
            </main>
        </MainLayout>
    )
}