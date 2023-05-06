import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    const activity = fetch("https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io").then(resp => resp.json());
    return { activity };
}

export const DetailActivityPage = () => {
    const { activity } = useLoaderData()

    return (
        <div>DetailActivityPage</div>
    )
}