import { useState } from "react"
import FilterItem from "./FilterItem"
import AddFilter from "./AddFilter"

const FilterBox = () => {
    const [filters,setFilters] = useState([
        {
            item:'Risk Level',
            value:'High'
        },
        {
            item:'Risk Category',
            value:'COPD'
        },
        {
            item:'Blood Pressure',
            value:'Normal Rate'
        },
        {
            item:'Blood Pressure',
            value:'Normal Rate'
        }                        
    ])
    return (
        <>
            <div className="w-full flex flex-wrap gap-4 items-center justify-start">
                {filters.map((item) => {
                    return (
                        <FilterItem item={item}></FilterItem>
                    )
                })}
                <AddFilter filters={filters} setFilters={setFilters}></AddFilter>       
            </div>  
        </>
    )
}

export default FilterBox