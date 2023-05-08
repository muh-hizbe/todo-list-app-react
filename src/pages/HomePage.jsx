import { MainLayout } from "../components/layouts/MainLayout"
import { useEffect, useState } from "react";
import { EmptyState } from "../components/svg/EmptyState";
import { AddButton } from "../components/buttons/AddButton";
import axios from "axios";
import { ListActivityCards } from "../components/sections/ListActivityCards";
import { LoadingSection } from "../components/sections/LoadingSection";

export const HomePage = () => {
    const [loadingButton, setLoadingButton] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])

    const fetchActivities = () => {
        setLoading(() => true)
        fetch("https://todo.api.devcode.gethired.id/activity-groups?email=muh.hizbe@gmail.com")
            .then(resp => resp.json())
            .then(result => {
                setActivities(result?.data)
                setLoading(() => false)
            })
    }

    const handleAddActivity = () => {
        if (!loadingButton) {
            setLoadingButton(() => true)
            const payload = {
                title: "New Activity",
                email: "muh.hizbe@gmail.com"
            }
    
            axios.post("https://todo.api.devcode.gethired.id/activity-groups", payload)
                .then(() => {
                    fetchActivities()
                })
                .catch((err) => console.log("galga", err))
                .finally(() => {
                    setLoadingButton(() => false)
                })            
        }
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    return (
        <MainLayout>
            <main className="container mx-auto py-7 md:py-[43px] px-5 md:px-0">
                <div className="flex items-center justify-between">
                    <h1 data-cy="activity-title"
                        className="text-secondary text-base md:text-4xl md:leading-[54px] font-bold"
                    >
                        Activity
                    </h1>
                    <AddButton loading={loadingButton} onClick={handleAddActivity} dataCy="activity-add-button" />
                </div>

                {(activities?.length === 0 && !loading) ?
                    <div className="py-[65px]" onClick={handleAddActivity}>
                        <EmptyState />
                    </div>
                    :
                    <>
                        {!loading ?
                            <ListActivityCards activities={activities} mutate={fetchActivities} />
                            :
                            <LoadingSection />
                        }
                    </>
                }
            </main>
        </MainLayout>
    )
}