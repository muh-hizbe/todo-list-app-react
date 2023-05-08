import { TbArrowsSort, TbSortAscending, TbSortAscendingLetters, TbSortDescending } from "react-icons/tb"
import { BiCheck } from "react-icons/bi"
import * as Menubar from '@radix-ui/react-menubar'
import { TbSortDescendingLetters } from "react-icons/tb"

export const SortButton = ({ sortedBy, setSortedBy }) => {

    const handleSort = (type) => {
        setSortedBy(type)
    }

    return (
        <div>
            <Menubar.Root className="flex rounded-full">
                <Menubar.Menu>
                    <Menubar.Trigger className="w-[54px] h-[54px] rounded-full border text-[#888888] focus:outline-none" data-cy="todo-sort-button">
                        <TbArrowsSort className="mx-auto w-[24px] h-[24px]" data-cy="tabler:arrow-sort" />
                    </Menubar.Trigger>

                    <Menubar.Portal>
                        <Menubar.Content
                            className="divide-y min-w-[220px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
                            align="start"
                            sideOffset={5}
                            alignOffset={-3}
                        >
                            <Menubar.Item
                                className="text-[#4A4A4A] py-[14px] px-[21px] font-normal text-base group text-[13px] leading-none flex items-center gap-[15px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:bg-primary/20 rounded-t-[6px]"
                                data-cy="sort-latest"
                                onClick={() => handleSort('latest')}
                            >
                                <div className="text-primary">
                                    <TbSortDescending />
                                </div>
                                Terbaru
                                {sortedBy === 'latest' ?
                                    <div className="ml-auto w-[18px] h-[18px]">
                                        <BiCheck />
                                    </div>
                                    : null
                                }
                            </Menubar.Item>
                            <Menubar.Item
                                className="text-[#4A4A4A] py-[14px] px-[21px] font-normal text-base group text-[13px] leading-none flex items-center gap-[15px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:bg-primary/20"
                                data-cy="sort-oldest"
                                onClick={() => handleSort('oldest')}
                            >
                                <div className="text-primary">
                                    <TbSortAscending />
                                </div>
                                Terlama
                                {sortedBy === 'oldest' ?
                                    <div className="ml-auto w-[18px] h-[18px]">
                                        <BiCheck />
                                    </div>
                                    : null
                                }
                            </Menubar.Item>
                            <Menubar.Item
                                className="text-[#4A4A4A] py-[14px] px-[21px] font-normal text-base group text-[13px] leading-none flex items-center gap-[15px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:bg-primary/20"
                                data-cy="sort-az"
                                onClick={() => handleSort('az')}
                            >
                                <div className="text-primary">
                                    <TbSortAscendingLetters />
                                </div>
                                A-Z
                                {sortedBy === 'az' ?
                                    <div className="ml-auto w-[18px] h-[18px]">
                                        <BiCheck />
                                    </div>
                                    : null
                                }
                            </Menubar.Item>
                            <Menubar.Item
                                className="text-[#4A4A4A] py-[14px] px-[21px] font-normal text-base group text-[13px] leading-none flex items-center gap-[15px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:bg-primary/20"
                                data-cy="sort-za"
                                onClick={() => handleSort('za')}
                            >
                                <div className="text-primary">
                                    <TbSortDescendingLetters />
                                </div>
                                Z-A
                                {sortedBy === 'za' ?
                                    <div className="ml-auto w-[18px] h-[18px]">
                                        <BiCheck />
                                    </div>
                                    : null
                                }
                            </Menubar.Item>
                            <Menubar.Item
                                className="text-[#4A4A4A] py-[14px] px-[21px] font-normal text-base group text-[13px] leading-none flex items-center gap-[15px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:bg-primary/20 rounded-b-[6px]"
                                data-cy="sort-unfinished"
                                onClick={() => handleSort('unfinished')}
                            >
                                <div className="text-primary">
                                    <TbArrowsSort />
                                </div>
                                Belum Selesai
                                {sortedBy === 'unfinished' ?
                                    <div className="ml-auto w-[18px] h-[18px]">
                                        <BiCheck />
                                    </div>
                                    : null
                                }
                            </Menubar.Item>
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
            </Menubar.Root>
        </div>
    )
}