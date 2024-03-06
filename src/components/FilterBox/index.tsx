import { useState } from "react"
import FilterItem from "./FilterItem"

const FilterBox = () => {
    const [filters] = useState([
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
            <div className="w-full flex gap-4 items-center justify-start">
                {filters.map((item) => {
                    return (
                        <FilterItem item={item}></FilterItem>
                    )
                })}
                <div className="bg-white cursor-pointer border w-auto flex items-center px-3 py-2 rounded-[10px] border-[#E2E8F0]">
                    <img src="./filter.svg" alt="" />
                    <div className="text-xs text-[#475569] font-normal ml-1 mr-1">Add Filter</div>
                </div>                
            </div>  
        </>
    )
}

export default FilterBox