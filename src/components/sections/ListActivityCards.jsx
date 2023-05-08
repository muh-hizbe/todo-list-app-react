import { ActivityCard } from "../cards/ActivityCard"

export const ListActivityCards = ({ activities, onDelete }) => {    
    return (
        <>
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-5"
            >
                {activities?.map((item, idx) => (
                    <ActivityCard key={idx}
                        dataCy={`activity-item`}
                        data={item}
                        onDelete={onDelete}
                    />
                ))}
            </div>            
        </>
    )
}