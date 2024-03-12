import { useState } from "react"
import FilterItem from "./FilterItem"
import AddFilter from "./AddFilter"


interface FilterBoxInterface {
    filters:Array<filterProps>
    setFilters:(filters:Array<filterProps>) => void
    showCalender?:boolean
}
const FilterBox:React.FC<FilterBoxInterface> = ({filters,setFilters,showCalender}) => {
    // const [filters,setFilters] = useState<Array<filterProps>>([])
    const deleteFilter = (item:any) => {
        const filtered = filters.filter((val) => val!=item)
        setFilters([...filtered])
    }
    return (
        <>
            <div className="flex flex-wrap gap-4 items-center justify-start">
                {showCalender &&
                    <div className="flex flex-row gap-2 justify-between items-center px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer">  
                        <img src="/calendar.svg" className="w-5 h-5"/>
                        <p className="text-xs">Feb 26 - Mar 3</p>
                        <img src="/arrowBottom.svg" className="w-5 h-5 cursor-pointer"/>
                    </div>                
                }
                {filters.map((item) => {
                    return (
                        <FilterItem ondelete={deleteFilter} item={item}></FilterItem>
                    )
                })}
                <AddFilter filters={filters} setFilters={setFilters}></AddFilter>       
            </div>  
        </>
    )
}

export default FilterBox