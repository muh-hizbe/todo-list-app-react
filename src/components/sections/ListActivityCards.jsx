import { ActivityCard } from "../cards/ActivityCard"

export const ListActivityCards = ({ activities, mutate }) => {
    return (
        <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
            {activities?.map((item, idx) => (
                <ActivityCard key={idx}
                    data-cy={`activity-item`}
                    data={item}
                    mutate={mutate}
                />
            ))}
        </div>
    )
}