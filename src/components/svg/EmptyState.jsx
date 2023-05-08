import activityEmptyStateImage from '../../images/activity-empty-state.png'

export const EmptyState = () => {
    return (
        <div
            data-cy="activity-empty-state"
            className="flex items-center"
        >
            <img
                src={activityEmptyStateImage}
                loading="lazy"
                className='mx-auto'
                alt="activity-empty-state"
            />
        </div>
    )
}