import { useState } from "react"
import FilterItem from "./FilterItem"
import AddFilter from "./AddFilter"


interface FilterBoxInterface {
    filters:Array<filterProps>
    setFilters:(filters:Array<filterProps>) => void
}
const FilterBox:React.FC<FilterBoxInterface> = ({filters,setFilters}) => {
    // const [filters,setFilters] = useState<Array<filterProps>>([])
    const deleteFilter = (item:any) => {
        const filtered = filters.filter((val) => val!=item)
        setFilters([...filtered])
    }
    return (
        <>
            <div className="w-full flex flex-wrap gap-4 items-center justify-start">
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