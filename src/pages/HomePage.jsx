import { useLoaderData } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout"
import { useEffect, useState } from "react";

export const HomePage = () => {
    const [activities, setActivities] = useState([])

    const fetchActivities = () => {
        return fetch("https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io").then(resp => resp.json());
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    return (
        <MainLayout>
            <div>
                <h1 data-cy="activity-title"
                    className="text-secondary text-4xl font-semibold"
                >
                    Activity
                </h1>
                <button
                    data-cy="activity-add-button"
                >
                    Tambah
                </button>
            </div>
        </MainLayout>
    )
}