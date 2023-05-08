import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { DeleteButton } from "../buttons/DeleteButton"

export const ActivityCard = ({ data, dataCy, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
        onDelete(data?.id)
    }

    const handleRouteDetail = (e) => {
        e.stopPropagation()
        navigate(`/detail/${data?.id}`)
    }

    return (
        <div
            className="rounded-[10px] h-[150px] md:h-[234px] p-[17px] md:p-[22px] bg-white shadow-lg mt-[37px] md:mt-[55px] flex flex-col justify-between"
            data-cy={dataCy}
        >
            <div
                className="cursor-pointer h-full"
                onClick={handleRouteDetail}
            >
                <h4
                    data-cy="activity-item-title"
                    className="font-bold text-secondary text-base md:text-lg leading-[21px] md:leading-[27px]"
                >
                    {data?.title}
                </h4>
            </div>

            <div
                className="flex items-center justify-between text-[#888888]"
            >
                <div data-cy="activity-item-date"
                    className="text-[10px] md:text-[14px] leading-[15px] md:leading-[21px]"
                >
                    {dayjs(data?.created_at).format('D MMMM YYYY')}
                </div>
                <DeleteButton
                    onDelete={handleDelete}
                    text={'Apakah anda yakin menghapus activity'}
                    itemName={data?.title}
                    dataCy='activity-item-delete-button'
                />
            </div>
        </div>
    )
}