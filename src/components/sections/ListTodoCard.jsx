import { TodoCard } from "../cards/TodoCard"

export const ListTodoCard = ({ todos, mutate, onDelete }) => {
    return (
        <div
            className="grid grid-cols-1 gap-[9px] md:gap-2.5"
        >
            {todos?.map((item, idx) => (
                <TodoCard key={idx}
                    data-cy={`todo-item-${idx}`}
                    data={item}
                    mutate={mutate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}