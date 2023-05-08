import todoEmptyStateImage from '../../images/todo-empty-item.png'

export const TodoEmptyState = () => {
    return (
        <div
            data-cy="todo-empty-state"
            className="flex items-center"
        >
            <img
                src={todoEmptyStateImage}
                loading="lazy"
                className='mx-auto'
                alt="todo-empty-state"
            />
        </div>
    )
}