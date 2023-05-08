import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { DeleteButton } from "../buttons/DeleteButton"
import axios from "axios"

export const ActivityCard = ({ data, mutate }) => {
    const navigate = useNavigate()

    const handleDelete = async () => {
        await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${data?.id}`)
            .then(resp => {
                mutate()
            })
    }

    const handleRouteDetail = (e) => {
        e.stopPropagation()
        navigate(`/detail/${data?.id}`)
    }

    return (
        <div
            className="rounded-[10px] h-[150px] md:h-[234px] p-[17px] md:p-[22px] bg-white shadow-lg mt-[37px] md:mt-[55px] cursor-pointer flex flex-col justify-between"
            onClick={handleRouteDetail}
        >
            <h4
                data-cy="activity-item-title"
                className="font-bold text-secondary text-base md:text-lg leading-[21px] md:leading-[27px]"
            >
                {data?.title}
            </h4>

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
                    withNotif={true}
                />
            </div>
        </div>
    )
}